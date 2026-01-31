# Invoice Renderer API

PDF invoice renderer service using Puppeteer. Deploy to Railway and generate PDF invoices via API.

## API Endpoints

### Health Check
```
GET /
```
Returns service status and available templates.

### List Templates
```
GET /templates
```
Returns all available invoice templates.

### Render PDF
```
POST /render
Content-Type: application/json
```

**Request Body:**
```json
{
  "template": "minimal",
  "data": {
    "invoiceNumber": "INV-1007",
    "companyName": "Acme Corp",
    "companyAddress": ["123 Main St", "Austin, TX 78745", "hello@acme.com"],
    "clientName": "John Doe",
    "clientAddress": ["456 Oak Ave", "New York, NY 10001"],
    "issuedOn": "2025-01-31",
    "dueOn": "2025-02-28",
    "items": [
      { "description": "Web Development", "quantity": 10, "rate": 150 },
      { "description": "Design Services", "quantity": 5, "rate": 100 }
    ],
    "taxRate": 8,
    "currency": "$",
    "notes": "Payment due within 30 days"
  },
  "options": {
    "format": "A4",
    "marginTop": "10mm",
    "marginBottom": "10mm"
  }
}
```

**Response:** PDF file (application/pdf)

### Render HTML (Preview)
```
POST /render/html
Content-Type: application/json
```
Same body as `/render`, returns HTML instead of PDF.

## Available Templates

| ID | Description |
|---|---|
| classic | Clean professional design with green accents |
| minimal | Simple minimalist layout |
| modern | Contemporary design |
| professional | Business-focused template |
| elegant | Refined sophisticated look |
| bold | Strong typography |
| creative | Unique artistic style |
| simple | Basic no-frills template |
| shadcn | Modern shadcn-inspired design |

## Local Development

```bash
npm install
npm run dev
```

Server runs on `http://localhost:3000`

## Deploy to Railway

1. Push to GitHub
2. Connect repo to Railway
3. Deploy automatically

Railway will use `railway.toml` for configuration.

## Example Usage

```bash
# Get PDF
curl -X POST https://your-app.railway.app/render \
  -H "Content-Type: application/json" \
  -d '{"template":"minimal","data":{"invoiceNumber":"INV-001","companyName":"Test","items":[{"description":"Service","quantity":1,"rate":100}]}}' \
  --output invoice.pdf

# Get HTML preview
curl -X POST https://your-app.railway.app/render/html \
  -H "Content-Type: application/json" \
  -d '{"template":"minimal","data":{"invoiceNumber":"INV-001","companyName":"Test","items":[{"description":"Service","quantity":1,"rate":100}]}}'
```

## License

MIT
