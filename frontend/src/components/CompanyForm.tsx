import type { InvoiceData } from "../lib/types";

interface CompanyFormProps {
  invoice: InvoiceData;
  updateField: <K extends keyof InvoiceData>(
    field: K,
    value: InvoiceData[K]
  ) => void;
}

export function CompanyForm({ invoice, updateField }: CompanyFormProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
        <svg
          className="w-4 h-4 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        Your Company
      </h3>
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Company Name
          </label>
          <input
            type="text"
            value={invoice.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
            placeholder="Acme Corporation"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Logo URL (optional)
          </label>
          <input
            type="text"
            value={invoice.companyLogo}
            onChange={(e) => updateField("companyLogo", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
            placeholder="https://example.com/logo.png"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Address</label>
          <textarea
            rows={2}
            value={invoice.companyAddress}
            onChange={(e) => updateField("companyAddress", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
            placeholder="123 Business Ave&#10;San Francisco, CA 94102"
          />
        </div>
      </div>
    </div>
  );
}
