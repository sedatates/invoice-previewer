import { useEffect, useRef, useMemo } from "react";
import Mustache from "mustache";
import type { InvoiceData } from "../lib/types";

interface InvoicePreviewProps {
  invoice: InvoiceData;
  templateHtml: string | null;
  total: number;
}

export function InvoicePreview({
  invoice,
  templateHtml,
  total,
}: InvoicePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const preparedData = useMemo(() => {
    const currency = invoice.currency || "$";

    let subtotal = 0;
    const itemsRows = invoice.items
      .map((item) => {
        const amount = item.quantity * item.rate;
        subtotal += amount;
        return `<tr class="border-b border-gray-200">
          <td class="py-2 px-2">${item.description}</td>
          <td class="py-2 px-2 text-right">${item.quantity}</td>
          <td class="py-2 px-2 text-right">${currency}${item.rate.toFixed(2)}</td>
          <td class="py-2 px-2 text-right">${currency}${amount.toFixed(2)}</td>
        </tr>`;
      })
      .join("");

    const taxRate = invoice.taxRate || 0;
    const taxAmount = subtotal * (taxRate / 100);
    const totalAmount = subtotal + taxAmount;

    const companyLines = invoice.companyAddress.split("\n").join("<br>");

    const clientLines = `<strong>${invoice.clientName}</strong><br>${invoice.clientAddress.split("\n").join("<br>")}`;

    const notesBlock = invoice.notes
      ? `<div class="mt-6 p-4 bg-gray-50 rounded text-[9px] text-gray-600">
            <p class="font-bold text-gray-500 uppercase text-[8px] mb-1">Notes</p>
            <p class="whitespace-pre-line">${invoice.notes}</p>
          </div>`
      : "";

    return {
      ...invoice,
      hasLogo: !!invoice.companyLogo,
      companyLines,
      clientLines,
      itemsRows,
      subtotalFormatted: `${currency}${subtotal.toFixed(2)}`,
      taxRateLabel: taxRate,
      taxAmountFormatted: `${currency}${taxAmount.toFixed(2)}`,
      totalFormatted: `${currency}${totalAmount.toFixed(2)}`,
      notesBlock,
    };
  }, [invoice]);

  useEffect(() => {
    if (!templateHtml || !iframeRef.current) return;

    const renderedHtml = Mustache.render(templateHtml, preparedData);
    const doc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow?.document;

    if (doc) {
      doc.open();
      doc.write(renderedHtml);
      doc.close();
    }
  }, [templateHtml, preparedData]);

  return (
    <div className="preview-panel bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col shadow-2xl">
      <div className="bg-slate-700/50 px-4 py-3 border-b border-slate-700 flex items-center justify-between shrink-0">
        <span className="text-sm font-medium text-slate-300">Preview</span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-green-400">
            {invoice.currency}
            {total.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 bg-slate-600/30 flex justify-center">
        <div
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{ width: 595, minHeight: 842 }}>
          <iframe
            ref={iframeRef}
            className="w-full"
            style={{ height: 842, border: "none" }}
          />
        </div>
      </div>
    </div>
  );
}
