# Invoice Templates CDN

Free invoice HTML templates served via jsDelivr CDN for easy integration into your applications.

## 📦 Usage

### Fetch Template List

```javascript
const CDN = 'https://cdn.jsdelivr.net/gh/sedatates/invoice-previewer@main';

// Get list of all available templates
const list = await fetch(`${CDN}/index.json`).then(r => r.json());
console.log(list);
// Output: { version: "1.0.0", templates: [...] }
```

### Fetch Specific Template

```javascript
// Fetch a specific template HTML
const html = await fetch(`${CDN}/templates/shadcn.html`).then(r => r.text());

// Render with your data (using Mustache or similar templating engine)
const rendered = Mustache.render(html, invoiceData);
```

### Using Versioned URLs

For production use, pin to a specific version:

```javascript
const CDN = 'https://cdn.jsdelivr.net/gh/sedatates/invoice-previewer@v1.0.0';
```

## 🎨 Available Templates

| ID | Label | Description |
|---|---|---|
| **classic** | Classic | Clean and professional design with green accents |
| **modern** | Modern | Contemporary blue gradient header design |

## 🔧 Template Placeholders

All templates use **Mustache-style placeholders**:

- `{{variable}}` - Escaped text (safe for user input)
- `{{{variable}}}` - Raw HTML (for pre-formatted content)

### Required Placeholders

| Placeholder | Type | Description | Example |
|-------------|------|-------------|---------|
| `{{invoiceNumber}}` | text | Invoice identifier | `"INV-1007"` |
| `{{companyName}}` | text | Company/business name | `"Acme Corp"` |
| `{{{companyLines}}}` | html | Company address, email, phone (HTML formatted) | `"123 Main St<br>email@example.com"` |
| `{{{clientLines}}}` | html | Client name, address, email (HTML formatted) | `"<strong>John Doe</strong><br>456 Oak Ave"` |
| `{{issuedOn}}` | text | Invoice issue date | `"2025-12-31"` |
| `{{dueOn}}` | text | Payment due date | `"2026-01-31"` |
| `{{{itemsRows}}}` | html | Table rows for line items | `"<tr><td>...</td></tr>"` |
| `{{subtotalFormatted}}` | text | Formatted subtotal amount | `"$1,000.00"` |
| `{{taxRateLabel}}` | text | Tax rate percentage | `"5.15"` |
| `{{taxAmountFormatted}}` | text | Formatted tax amount | `"$51.50"` |
| `{{totalFormatted}}` | text | Formatted total amount | `"$1,051.50"` |
| `{{{notesBlock}}}` | html | Optional notes section (HTML) | `"<div class=\"notes\">...</div>"` |

### Example Data Structure

```javascript
const invoiceData = {
  invoiceNumber: "INV-1007",
  companyName: "GreenField Lawn & Landscape",
  companyLines: "8421 Greenway Blvd<br>Austin, TX 78745<br>billing@greenfieldlawn.com<br>+1-512-555-0198",
  clientLines: "<strong>David Brooks</strong><br>4021 Maple St<br>dbrooks@gmail.com",
  issuedOn: "2025-12-31",
  dueOn: "2026-01-31",
  itemsRows: `
    <tr>
      <td><strong>Lawn Care</strong><br><span style="color:#71717a;font-size:9px">Monthly service</span></td>
      <td class="right">1 service</td>
      <td class="right">$150.00</td>
      <td class="right">$150.00</td>
    </tr>
  `,
  subtotalFormatted: "$1,000.00",
  taxRateLabel: "5.15",
  taxAmountFormatted: "$51.50",
  totalFormatted: "$1,051.50",
  notesBlock: '<div class="notes"><div class="notes-title">Notes</div><div class="notes-body">Payment accepted via ACH or card.</div></div>'
};
```

## 📋 Integration Example

```javascript
import Mustache from 'mustache';

// 1. Fetch template
const templateUrl = 'https://cdn.jsdelivr.net/gh/sedatates/invoice-previewer@v1.0.0/templates/modern.html';
const template = await fetch(templateUrl).then(r => r.text());

// 2. Prepare your invoice data
const invoiceData = prepareInvoiceData(rawData);

// 3. Render
const html = Mustache.render(template, invoiceData);

// 4. Use the rendered HTML (display, PDF generation, etc.)
document.getElementById('invoice').innerHTML = html;
```

## 🖨️ PDF Generation

These templates are designed for A4 paper size and work well with headless browsers:

```javascript
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(renderedHTML);
await page.pdf({
  path: 'invoice.pdf',
  format: 'A4',
  printBackground: true
});
await browser.close();
```

## 🚀 Quick Start

1. Choose a template from the list above
2. Fetch the template HTML from jsDelivr CDN
3. Prepare your invoice data with required placeholders
4. Render using Mustache or compatible templating engine
5. Display in browser or generate PDF

## 📄 License

MIT License - Free to use for personal and commercial projects.

## 🤝 Contributing

To add new templates or improve existing ones, please submit a pull request to the repository.

## 🔗 Related

- [Invoice Previewer Tool](index.html) - Live preview and test templates
- [jsDelivr CDN](https://www.jsdelivr.com/) - Fast and reliable CDN service
- [Mustache.js](https://github.com/janl/mustache.js) - Logic-less templating engine
