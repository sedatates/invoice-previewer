import { CURRENCIES } from "../lib/constants";
import type { InvoiceData } from "../lib/types";

interface InvoiceDetailsFormProps {
  invoice: InvoiceData;
  updateField: <K extends keyof InvoiceData>(
    field: K,
    value: InvoiceData[K]
  ) => void;
}

export function InvoiceDetailsForm({
  invoice,
  updateField,
}: InvoiceDetailsFormProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
        <svg
          className="w-4 h-4 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        Invoice Details
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Invoice Number
          </label>
          <input
            type="text"
            value={invoice.invoiceNumber}
            onChange={(e) => updateField("invoiceNumber", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
            placeholder="INV-001"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Currency</label>
          <select
            value={invoice.currency}
            onChange={(e) => updateField("currency", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30">
            {CURRENCIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Issue Date
          </label>
          <input
            type="date"
            value={invoice.issuedOn}
            onChange={(e) => updateField("issuedOn", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Due Date</label>
          <input
            type="date"
            value={invoice.dueOn}
            onChange={(e) => updateField("dueOn", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
      </div>
    </div>
  );
}
