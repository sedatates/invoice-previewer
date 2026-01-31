const express = require('express');
const puppeteer = require('puppeteer');
const Mustache = require('mustache');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Load templates
const templatesDir = path.join(__dirname, 'templates');
const templates = {};

function loadTemplates() {
  const files = fs.readdirSync(templatesDir);
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '');
      templates[name] = fs.readFileSync(path.join(templatesDir, file), 'utf-8');
    }
  });
  console.log(`Loaded templates: ${Object.keys(templates).join(', ')}`);
}

loadTemplates();

// Browser instance
let browser = null;

async function getBrowser() {
  if (!browser) {
    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process'
      ]
    });
  }
  return browser;
}

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Invoice Renderer',
    version: '1.0.0',
    templates: Object.keys(templates)
  });
});

// List available templates
app.get('/templates', (req, res) => {
  res.json({
    templates: Object.keys(templates).map(name => ({
      id: name,
      label: name.charAt(0).toUpperCase() + name.slice(1)
    }))
  });
});

// Render PDF
app.post('/render', async (req, res) => {
  const startTime = Date.now();

  try {
    const { template = 'minimal', data, options = {} } = req.body;

    if (!templates[template]) {
      return res.status(400).json({
        error: 'Template not found',
        available: Object.keys(templates)
      });
    }

    if (!data) {
      return res.status(400).json({
        error: 'Missing data object'
      });
    }

    // Prepare template data
    const templateData = prepareInvoiceData(data);

    // Render HTML with Mustache
    const html = Mustache.render(templates[template], templateData);

    // Generate PDF
    const browserInstance = await getBrowser();
    const page = await browserInstance.newPage();

    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });

    const pdfOptions = {
      format: options.format || 'A4',
      printBackground: true,
      margin: {
        top: options.marginTop || '10mm',
        right: options.marginRight || '10mm',
        bottom: options.marginBottom || '10mm',
        left: options.marginLeft || '10mm'
      }
    };

    const pdfBuffer = await page.pdf(pdfOptions);
    await page.close();

    const duration = Date.now() - startTime;
    console.log(`PDF generated in ${duration}ms - template: ${template}`);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="invoice-${data.invoiceNumber || 'document'}.pdf"`,
      'X-Render-Time': `${duration}ms`
    });

    res.send(pdfBuffer);

  } catch (error) {
    console.error('Render error:', error);
    res.status(500).json({
      error: 'Failed to render PDF',
      message: error.message
    });
  }
});

// Render HTML (for preview)
app.post('/render/html', (req, res) => {
  try {
    const { template = 'minimal', data } = req.body;

    if (!templates[template]) {
      return res.status(400).json({
        error: 'Template not found',
        available: Object.keys(templates)
      });
    }

    if (!data) {
      return res.status(400).json({
        error: 'Missing data object'
      });
    }

    const templateData = prepareInvoiceData(data);
    const html = Mustache.render(templates[template], templateData);

    res.set('Content-Type', 'text/html');
    res.send(html);

  } catch (error) {
    console.error('HTML render error:', error);
    res.status(500).json({
      error: 'Failed to render HTML',
      message: error.message
    });
  }
});

// Helper function to prepare invoice data
function prepareInvoiceData(data) {
  const {
    invoiceNumber = '',
    companyName = '',
    companyAddress = [],
    clientName = '',
    clientAddress = [],
    issuedOn = '',
    dueOn = '',
    items = [],
    taxRate = 0,
    currency = '$',
    notes = ''
  } = data;

  // Format company lines
  const companyLines = Array.isArray(companyAddress)
    ? companyAddress.join('<br>')
    : companyAddress;

  // Format client lines
  const clientLines = clientName + (Array.isArray(clientAddress) && clientAddress.length
    ? '<br>' + clientAddress.join('<br>')
    : '');

  // Calculate totals
  let subtotal = 0;
  const itemsRows = items.map(item => {
    const qty = item.quantity || item.qty || 1;
    const rate = item.rate || item.price || 0;
    const amount = qty * rate;
    subtotal += amount;

    return `<tr>
      <td>${escapeHtml(item.description || item.name || '')}</td>
      <td class="right">${qty}</td>
      <td class="right">${currency}${formatNumber(rate)}</td>
      <td class="right">${currency}${formatNumber(amount)}</td>
    </tr>`;
  }).join('');

  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  // Notes block
  const notesBlock = notes
    ? `<div class="notes">
        <div class="notes-title">Notes</div>
        <div class="notes-body">${escapeHtml(notes)}</div>
      </div>`
    : '';

  return {
    invoiceNumber,
    companyName,
    companyLines,
    clientLines,
    issuedOn,
    dueOn,
    itemsRows,
    subtotalFormatted: `${currency}${formatNumber(subtotal)}`,
    taxRateLabel: taxRate,
    taxAmountFormatted: `${currency}${formatNumber(taxAmount)}`,
    totalFormatted: `${currency}${formatNumber(total)}`,
    notesBlock
  };
}

function formatNumber(num) {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down...');
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Invoice Renderer running on port ${PORT}`);
  console.log(`Available templates: ${Object.keys(templates).join(', ')}`);
});
