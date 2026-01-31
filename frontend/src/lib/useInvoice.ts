import { useState, useCallback } from "react";
import type { InvoiceData, LineItem } from "./types";

function generateInvoiceNumber(): string {
  return "INV-" + String(Math.floor(Math.random() * 9000) + 1000);
}

function getDefaultDates() {
  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + 30);

  return {
    issuedOn: today.toISOString().split("T")[0],
    dueOn: dueDate.toISOString().split("T")[0],
  };
}

const defaultItems: LineItem[] = [
  { description: "Web Development", quantity: 10, rate: 150 },
  { description: "UI/UX Design", quantity: 5, rate: 120 },
];

export function useInvoice() {
  const dates = getDefaultDates();

  const [invoice, setInvoice] = useState<InvoiceData>({
    invoiceNumber: generateInvoiceNumber(),
    companyName: "Acme Corporation",
    companyLogo: "",
    companyAddress: "123 Business Ave\nSan Francisco, CA 94102\nhello@acme.com",
    clientName: "John Smith",
    clientAddress: "456 Client Street\nNew York, NY 10001",
    issuedOn: dates.issuedOn,
    dueOn: dates.dueOn,
    items: defaultItems,
    taxRate: 10,
    currency: "$",
    notes: "Thank you for your business!\nPayment via bank transfer.",
  });

  const updateField = useCallback(
    <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
      setInvoice((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const addItem = useCallback(() => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, rate: 0 }],
    }));
  }, []);

  const removeItem = useCallback((index: number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }, []);

  const updateItem = useCallback(
    (index: number, field: keyof LineItem, value: string | number) => {
      setInvoice((prev) => ({
        ...prev,
        items: prev.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      }));
    },
    []
  );

  // Calculate totals
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );
  const taxAmount = subtotal * (invoice.taxRate / 100);
  const total = subtotal + taxAmount;

  return {
    invoice,
    updateField,
    addItem,
    removeItem,
    updateItem,
    subtotal,
    taxAmount,
    total,
  };
}
