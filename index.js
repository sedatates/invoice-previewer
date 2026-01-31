const express = require("express");
const puppeteer = require("puppeteer");
const Mustache = require("mustache");

const app = express();
const PORT = process.env.PORT || 3000;

// CDN Base URL
const CDN_BASE = "https://cdn.jsdelivr.net/gh/sedatates/invoice-previewer@main";

app.use(express.json({ limit: "10mb" }));

// Template cache
const templateCache = new Map();
let templateList = [];

// Fetch template list from CDN
async function fetchTemplateList() {
  try {
    const response = await fetch(`${CDN_BASE}/index.json`);
    if (!response.ok) throw new Error(`Failed to fetch index.json: ${response.status}`);
    const data = await response.json();
    templateList = data.templates || [];
    console.log(`Loaded ${templateList.length} templates from CDN:`, templateList.map(t => t.id).join(", "));
    return templateList;
  } catch (error) {
    console.error("Error fetching template list:", error.message);
    return [];
  }
}

// Fetch single template from CDN
async function fetchTemplate(templateId) {
  // Check cache first
  if (templateCache.has(templateId)) {
    return templateCache.get(templateId);
  }

  try {
    const url = `${CDN_BASE}/templates/${templateId}.html`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Template not found: ${templateId}`);
    }
    const html = await response.text();

    // Cache the template (expire after 5 minutes)
    templateCache.set(templateId, html);
    setTimeout(() => templateCache.delete(templateId), 5 * 60 * 1000);

    return html;
  } catch (error) {
    console.error(`Error fetching template ${templateId}:`, error.message);
    return null;
  }
}

// Browser instance
let browser = null;

async function getBrowser() {
  if (!browser) {
    console.log("Launching browser...");
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
      ],
    });
  }
  return browser;
}

// Health check
app.get("/", async (req, res) => {
  // Refresh template list if empty
  if (templateList.length === 0) {
    await fetchTemplateList();
  }

  res.json({
    status: "ok",
    service: "Invoice Renderer",
    version: "1.0.0",
    cdn: CDN_BASE,
    templates: templateList.map(t => t.id),
  });
});

// List available templates
app.get("/templates", async (req, res) => {
  // Refresh template list
  await fetchTemplateList();

  res.json({
    templates: templateList,
    cdn: CDN_BASE,
  });
});

// Refresh templates cache
app.post("/templates/refresh", async (req, res) => {
  templateCache.clear();
  await fetchTemplateList();
  res.json({
    success: true,
    templates: templateList.map(t => t.id),
  });
});

// Render PDF
app.post("/render", async (req, res) => {
  const startTime = Date.now();

  try {
    const { template = "minimal", data, options = {} } = req.body;

    if (!data) {
      return res.status(400).json({
        error: "Missing data object",
      });
    }

    // Fetch template from CDN
    const templateHtml = await fetchTemplate(template);
    if (!templateHtml) {
      // Refresh template list and return available
      await fetchTemplateList();
      return res.status(400).json({
        error: "Template not found",
        available: templateList.map(t => t.id),
      });
    }

    // Prepare template data
    const templateData = prepareInvoiceData(data);

    // Render HTML with Mustache
    const html = Mustache.render(templateHtml, templateData);

    // Generate PDF
    const browserInstance = await getBrowser();
    const page = await browserInstance.newPage();

    await page.setContent(html, {
      waitUntil: ["networkidle0", "domcontentloaded"],
    });

    const pdfOptions = {
      format: options.format || "A4",
      printBackground: true,
      margin: {
        top: options.marginTop || "10mm",
        right: options.marginRight || "10mm",
        bottom: options.marginBottom || "10mm",
        left: options.marginLeft || "10mm",
      },
    };

    const pdfBuffer = await page.pdf(pdfOptions);
    await page.close();

    const duration = Date.now() - startTime;
    console.log(`PDF generated in ${duration}ms - template: ${template}, size: ${pdfBuffer.length} bytes`);

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length,
      "Content-Disposition": `attachment; filename="invoice-${
        data.invoiceNumber || "document"
      }.pdf"`,
      "X-Render-Time": `${duration}ms`,
    });

    res.end(pdfBuffer);
  } catch (error) {
    console.error("Render error:", error);
    res.status(500).json({
      error: "Failed to render PDF",
      message: error.message,
    });
  }
});

// Render PDF as Base64 (for Postman preview)
app.post("/render/base64", async (req, res) => {
  const startTime = Date.now();

  try {
    const { template = "minimal", data, options = {} } = req.body;

    if (!data) {
      return res.status(400).json({
        error: "Missing data object",
      });
    }

    // Fetch template from CDN
    const templateHtml = await fetchTemplate(template);
    if (!templateHtml) {
      await fetchTemplateList();
      return res.status(400).json({
        error: "Template not found",
        available: templateList.map(t => t.id),
      });
    }

    const templateData = prepareInvoiceData(data);
    const html = Mustache.render(templateHtml, templateData);

    const browserInstance = await getBrowser();
    const page = await browserInstance.newPage();

    await page.setContent(html, {
      waitUntil: ["networkidle0", "domcontentloaded"],
    });

    const pdfOptions = {
      format: options.format || "A4",
      printBackground: true,
      margin: {
        top: options.marginTop || "10mm",
        right: options.marginRight || "10mm",
        bottom: options.marginBottom || "10mm",
        left: options.marginLeft || "10mm",
      },
    };

    const pdfBuffer = await page.pdf(pdfOptions);
    await page.close();

    const duration = Date.now() - startTime;
    const base64 = pdfBuffer.toString("base64");

    res.json({
      success: true,
      renderTime: `${duration}ms`,
      filename: `invoice-${data.invoiceNumber || "document"}.pdf`,
      contentType: "application/pdf",
      size: pdfBuffer.length,
      base64: base64,
      dataUri: `data:application/pdf;base64,${base64}`,
    });
  } catch (error) {
    console.error("Render error:", error);
    res.status(500).json({
      error: "Failed to render PDF",
      message: error.message,
    });
  }
});

// Render HTML (for preview)
app.post("/render/html", async (req, res) => {
  try {
    const { template = "minimal", data } = req.body;

    if (!data) {
      return res.status(400).json({
        error: "Missing data object",
      });
    }

    // Fetch template from CDN
    const templateHtml = await fetchTemplate(template);
    if (!templateHtml) {
      await fetchTemplateList();
      return res.status(400).json({
        error: "Template not found",
        available: templateList.map(t => t.id),
      });
    }

    const templateData = prepareInvoiceData(data);
    const html = Mustache.render(templateHtml, templateData);

    res.set("Content-Type", "text/html");
    res.send(html);
  } catch (error) {
    console.error("HTML render error:", error);
    res.status(500).json({
      error: "Failed to render HTML",
      message: error.message,
    });
  }
});

// Helper function to prepare invoice data
function prepareInvoiceData(data) {
  const {
    invoiceNumber = "",
    companyName = "",
    companyAddress = [],
    companyLogo = "",
    clientName = "",
    clientAddress = [],
    issuedOn = "",
    dueOn = "",
    items = [],
    taxRate = 0,
    currency = "$",
    notes = "",
  } = data;

  // Format company lines
  const companyLines = Array.isArray(companyAddress)
    ? companyAddress.join("<br>")
    : companyAddress;

  // Format client lines
  const clientLines =
    clientName +
    (Array.isArray(clientAddress) && clientAddress.length
      ? "<br>" + clientAddress.join("<br>")
      : "");

  // Calculate totals
  let subtotal = 0;
  const itemsRows = items
    .map((item) => {
      const qty = item.quantity || item.qty || 1;
      const rate = item.rate || item.price || 0;
      const amount = qty * rate;
      subtotal += amount;

      return `<tr class="border-b border-gray-200 hover:bg-gray-50">
      <td class="py-3 px-3">${escapeHtml(item.description || item.name || "")}</td>
      <td class="py-3 px-3 text-right">${qty}</td>
      <td class="py-3 px-3 text-right">${currency}${formatNumber(rate)}</td>
      <td class="py-3 px-3 text-right font-medium">${currency}${formatNumber(amount)}</td>
    </tr>`;
    })
    .join("");

  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  // Notes block (Tailwind styled)
  const notesBlock = notes
    ? `<div class="mt-8 bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
        <p class="text-[8px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Notes</p>
        <p class="text-[9px] text-gray-700 leading-relaxed whitespace-pre-line">${escapeHtml(notes)}</p>
      </div>`
    : "";

  return {
    invoiceNumber,
    companyName,
    companyLines,
    companyLogo,
    hasLogo: !!companyLogo,
    clientLines,
    issuedOn,
    dueOn,
    itemsRows,
    subtotalFormatted: `${currency}${formatNumber(subtotal)}`,
    taxRateLabel: taxRate,
    taxAmountFormatted: `${currency}${formatNumber(taxAmount)}`,
    totalFormatted: `${currency}${formatNumber(total)}`,
    notesBlock,
  };
}

function formatNumber(num) {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down...");
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});

// Initialize and start server
async function start() {
  // Pre-fetch template list
  await fetchTemplateList();

  app.listen(PORT, () => {
    console.log(`Invoice Renderer running on port ${PORT}`);
    console.log(`CDN: ${CDN_BASE}`);
  });
}

start();
