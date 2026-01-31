import type { InvoiceData } from "../lib/types";

interface TaxNotesFormProps {
  invoice: InvoiceData;
  updateField: <K extends keyof InvoiceData>(
    field: K,
    value: InvoiceData[K]
  ) => void;
}

export function TaxNotesForm({ invoice, updateField }: TaxNotesFormProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
        <svg
          className="w-4 h-4 text-rose-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        Tax & Notes
      </h3>
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Tax Rate (%)
          </label>
          <input
            type="number"
            value={invoice.taxRate}
            onChange={(e) =>
              updateField("taxRate", parseFloat(e.target.value) || 0)
            }
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
            placeholder="10"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Notes</label>
          <textarea
            rows={3}
            value={invoice.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
            placeholder="Payment terms, bank details, etc."
          />
        </div>
      </div>
    </div>
  );
}
