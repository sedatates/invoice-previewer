import type { InvoiceData } from "../lib/types";

interface ClientFormProps {
  invoice: InvoiceData;
  updateField: <K extends keyof InvoiceData>(
    field: K,
    value: InvoiceData[K]
  ) => void;
}

export function ClientForm({ invoice, updateField }: ClientFormProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
        <svg
          className="w-4 h-4 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Bill To
      </h3>
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Client Name
          </label>
          <input
            type="text"
            value={invoice.clientName}
            onChange={(e) => updateField("clientName", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Client Address
          </label>
          <textarea
            rows={2}
            value={invoice.clientAddress}
            onChange={(e) => updateField("clientAddress", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
            placeholder="456 Client Street&#10;New York, NY 10001"
          />
        </div>
      </div>
    </div>
  );
}
