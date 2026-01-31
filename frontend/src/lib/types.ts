export interface LineItem {
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  companyName: string;
  companyLogo: string;
  companyAddress: string;
  clientName: string;
  clientAddress: string;
  issuedOn: string;
  dueOn: string;
  items: LineItem[];
  taxRate: number;
  currency: string;
  notes: string;
}

export interface Template {
  id: string;
  label: string;
}

export interface TemplateIndex {
  templates: Template[];
}
