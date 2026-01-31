import { r as reactExports, j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { m as mustache } from "../_libs/mustache.mjs";
function Header({ onDownload, isDownloading = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-slate-800 border-b border-slate-700 px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          className: "w-6 h-6 text-white",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Invoice Generator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs", children: "Create professional invoices" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onDownload,
        disabled: isDownloading,
        className: "px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium transition-all flex items-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              className: "w-4 h-4",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                }
              )
            }
          ),
          isDownloading ? "Generating..." : "Download PDF"
        ]
      }
    ) })
  ] }) });
}
const templateStyles = {
  minimal: { icon: "○", color: "from-slate-400 to-slate-500" },
  modern: { icon: "◆", color: "from-blue-400 to-blue-600" },
  classic: { icon: "◇", color: "from-amber-400 to-amber-600" },
  professional: { icon: "■", color: "from-gray-400 to-gray-600" },
  creative: { icon: "★", color: "from-purple-400 to-purple-600" },
  elegant: { icon: "◈", color: "from-rose-400 to-rose-600" },
  bold: { icon: "▲", color: "from-red-400 to-red-600" },
  simple: { icon: "●", color: "from-green-400 to-green-600" },
  shadcn: { icon: "◉", color: "from-zinc-400 to-zinc-600" }
};
function TemplateSelector({
  templates,
  selectedTemplate,
  onSelect,
  loading
}) {
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800 rounded-xl p-4 border border-slate-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-slate-300 mb-3", children: "Template" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "animate-pulse bg-slate-700 rounded-lg h-20"
        },
        i
      )) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800 rounded-xl p-4 border border-slate-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-slate-300 mb-3", children: "Template" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: templates.map((template) => {
      const isSelected = template.id === selectedTemplate;
      const style = templateStyles[template.id] || {
        icon: "□",
        color: "from-slate-400 to-slate-500"
      };
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => onSelect(template.id),
          className: `relative rounded-xl p-3 transition-all duration-200 ${isSelected ? "bg-gradient-to-br " + style.color + " ring-2 ring-white/30 scale-[1.02]" : "bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-slate-500"}`,
          title: template.label,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-2xl ${isSelected ? "text-white" : "text-slate-400"}`,
                  children: style.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[11px] font-medium ${isSelected ? "text-white" : "text-slate-300"}`,
                  children: template.label
                }
              )
            ] }),
            isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1 right-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                className: "w-4 h-4 text-white",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                    clipRule: "evenodd"
                  }
                )
              }
            ) })
          ]
        },
        template.id
      );
    }) })
  ] });
}
function CompanyForm({ invoice, updateField }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800 rounded-xl p-4 border border-slate-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-medium text-slate-300 mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          className: "w-4 h-4 text-blue-400",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            }
          )
        }
      ),
      "Your Company"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Company Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: invoice.companyName,
            onChange: (e) => updateField("companyName", e.target.value),
            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30",
            placeholder: "Acme Corporation"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Logo URL (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: invoice.companyLogo,
            onChange: (e) => updateField("companyLogo", e.target.value),
            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30",
            placeholder: "https://example.com/logo.png"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            rows: 2,
            value: invoice.companyAddress,
            onChange: (e) => updateField("companyAddress", e.target.value),
            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30",
            placeholder: "123 Business Ave\nSan Francisco, CA 94102"
          }
        )
      ] })
    ] })
  ] });
}
function ClientForm({ invoice, updateField }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800 rounded-xl p-4 border border-slate-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-medium text-slate-300 mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          className: "w-4 h-4 text-green-400",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            }
          )
        }
      ),
      "Bill To"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Client Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: invoice.clientName,
            onChange: (e) => updateField("clientName", e.target.value),
            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30",
            placeholder: "John Smith"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Client Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            rows: 2,
            value: invoice.clientAddress,
            onChange: (e) => updateField("clientAddress", e.target.value),
            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30",
            placeholder: "456 Client Street\nNew York, NY 10001"
          }
        )
      ] })
    ] })
  ] });
}
const CDN_BASE = "https://cdn.jsdelivr.net/gh/sedatates/invoice-previewer@main";
const API_BASE = "https://invoice-backend-production-c91b.up.railway.app";
const CURRENCIES = [
  { value: "$", label: "$ USD" },
  { value: "€", label: "€ EUR" },
  { value: "£", label: "£ GBP" },
  { value: "₺", label: "₺ TRY" }
];
function InvoiceDetailsForm({
  invoice,
  updateField
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800 rounded-xl p-4 border border-slate-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-medium text-slate-300 mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          className: "w-4 h-4 text-purple-400",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            }
          )
        }
      ),
      "Invoice Details"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Invoice Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: invoice.invoiceNumber,
            onChange: (e) => updateField("invoiceNumber", e.target.value),
            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30",
            placeholder: "INV-001"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Currency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: invoice.currency,
            onChange: (e) => updateField("currency", e.target.value),
            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30",
            children: CURRENCIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.value, children: c.label }, c.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Issue Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: invoice.issuedOn,
            onChange: (e) => updateField("issuedOn", e.target.value),
            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Due Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: invoice.dueOn,
            onChange: (e) => updateField("dueOn", e.target.value),
            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
          }
        )
      ] })
    ] })
  ] });
}
function LineItemsForm({
  items,
  addItem,
  removeItem,
  updateItem
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800 rounded-xl p-4 border border-slate-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-medium text-slate-300 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            className: "w-4 h-4 text-amber-400",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              }
            )
          }
        ),
        "Line Items"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: addItem,
          className: "text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                className: "w-3 h-3",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 4v16m8-8H4"
                  }
                )
              }
            ),
            "Add Item"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-700/50 rounded-lg p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: item.description,
            onChange: (e) => updateItem(index, "description", e.target.value),
            placeholder: "Description",
            className: "flex-1 bg-slate-600 border border-slate-500 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => removeItem(index),
            className: "ml-2 text-slate-400 hover:text-red-400 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                className: "w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  }
                )
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] text-slate-400", children: "Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: item.quantity,
              onChange: (e) => updateItem(
                index,
                "quantity",
                parseFloat(e.target.value) || 0
              ),
              min: "1",
              className: "w-full bg-slate-600 border border-slate-500 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] text-slate-400", children: "Rate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: item.rate,
              onChange: (e) => updateItem(index, "rate", parseFloat(e.target.value) || 0),
              min: "0",
              step: "0.01",
              className: "w-full bg-slate-600 border border-slate-500 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
            }
          )
        ] })
      ] })
    ] }, index)) })
  ] });
}
function TaxNotesForm({ invoice, updateField }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800 rounded-xl p-4 border border-slate-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-medium text-slate-300 mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          className: "w-4 h-4 text-rose-400",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            }
          )
        }
      ),
      "Tax & Notes"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Tax Rate (%)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: invoice.taxRate,
            onChange: (e) => updateField("taxRate", parseFloat(e.target.value) || 0),
            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30",
            placeholder: "10",
            min: "0",
            max: "100"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-slate-400 mb-1", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            rows: 3,
            value: invoice.notes,
            onChange: (e) => updateField("notes", e.target.value),
            className: "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30",
            placeholder: "Payment terms, bank details, etc."
          }
        )
      ] })
    ] })
  ] });
}
function InvoicePreview({
  invoice,
  templateHtml,
  total
}) {
  const iframeRef = reactExports.useRef(null);
  const preparedData = reactExports.useMemo(() => {
    const currency = invoice.currency || "$";
    let subtotal = 0;
    const itemsRows = invoice.items.map((item) => {
      const amount = item.quantity * item.rate;
      subtotal += amount;
      return `<tr class="border-b border-gray-200">
          <td class="py-2 px-2">${item.description}</td>
          <td class="py-2 px-2 text-right">${item.quantity}</td>
          <td class="py-2 px-2 text-right">${currency}${item.rate.toFixed(2)}</td>
          <td class="py-2 px-2 text-right">${currency}${amount.toFixed(2)}</td>
        </tr>`;
    }).join("");
    const taxRate = invoice.taxRate || 0;
    const taxAmount = subtotal * (taxRate / 100);
    const totalAmount = subtotal + taxAmount;
    const companyLines = invoice.companyAddress.split("\n").join("<br>");
    const clientLines = `<strong>${invoice.clientName}</strong><br>${invoice.clientAddress.split("\n").join("<br>")}`;
    const notesBlock = invoice.notes ? `<div class="mt-6 p-4 bg-gray-50 rounded text-[9px] text-gray-600">
            <p class="font-bold text-gray-500 uppercase text-[8px] mb-1">Notes</p>
            <p class="whitespace-pre-line">${invoice.notes}</p>
          </div>` : "";
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
      notesBlock
    };
  }, [invoice]);
  reactExports.useEffect(() => {
    if (!templateHtml || !iframeRef.current) return;
    const renderedHtml = mustache.render(templateHtml, preparedData);
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(renderedHtml);
      doc.close();
    }
  }, [templateHtml, preparedData]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-panel bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-700/50 px-4 py-3 border-b border-slate-700 flex items-center justify-between shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-slate-300", children: "Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-green-400", children: [
        invoice.currency,
        total.toFixed(2)
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto p-4 bg-slate-600/30 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-white rounded-lg shadow-2xl overflow-hidden",
        style: { width: 595, minHeight: 842 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            ref: iframeRef,
            className: "w-full",
            style: { height: 842, border: "none" }
          }
        )
      }
    ) })
  ] });
}
function generateInvoiceNumber() {
  return "INV-" + String(Math.floor(Math.random() * 9e3) + 1e3);
}
function getDefaultDates() {
  const today = /* @__PURE__ */ new Date();
  const dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + 30);
  return {
    issuedOn: today.toISOString().split("T")[0],
    dueOn: dueDate.toISOString().split("T")[0]
  };
}
const defaultItems = [
  { description: "Web Development", quantity: 10, rate: 150 },
  { description: "UI/UX Design", quantity: 5, rate: 120 }
];
function useInvoice() {
  const dates = getDefaultDates();
  const [invoice, setInvoice] = reactExports.useState({
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
    notes: "Thank you for your business!\nPayment via bank transfer."
  });
  const updateField = reactExports.useCallback(
    (field, value) => {
      setInvoice((prev) => ({ ...prev, [field]: value }));
    },
    []
  );
  const addItem = reactExports.useCallback(() => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, rate: 0 }]
    }));
  }, []);
  const removeItem = reactExports.useCallback((index) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  }, []);
  const updateItem = reactExports.useCallback(
    (index, field, value) => {
      setInvoice((prev) => ({
        ...prev,
        items: prev.items.map(
          (item, i) => i === index ? { ...item, [field]: value } : item
        )
      }));
    },
    []
  );
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
    total
  };
}
function useTemplates() {
  const [templates, setTemplates] = reactExports.useState([]);
  const [selectedTemplate, setSelectedTemplate] = reactExports.useState("minimal");
  const [templateCache, setTemplateCache] = reactExports.useState(
    {}
  );
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await fetch(`${CDN_BASE}/index.json`);
        if (!response.ok) throw new Error("Failed to fetch templates");
        const data = await response.json();
        setTemplates(data.templates);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);
  const fetchTemplate = reactExports.useCallback(
    async (templateId) => {
      if (templateCache[templateId]) {
        return templateCache[templateId];
      }
      const response = await fetch(`${CDN_BASE}/templates/${templateId}.html`);
      if (!response.ok)
        throw new Error(`Failed to fetch template: ${templateId}`);
      const html = await response.text();
      setTemplateCache((prev) => ({ ...prev, [templateId]: html }));
      return html;
    },
    [templateCache]
  );
  return {
    templates,
    selectedTemplate,
    setSelectedTemplate,
    fetchTemplate,
    loading,
    error
  };
}
function HomePage() {
  const {
    invoice,
    updateField,
    addItem,
    removeItem,
    updateItem,
    total
  } = useInvoice();
  const {
    templates,
    selectedTemplate,
    setSelectedTemplate,
    fetchTemplate,
    loading: templatesLoading
  } = useTemplates();
  const [templateHtml, setTemplateHtml] = reactExports.useState(null);
  const [appLoading, setAppLoading] = reactExports.useState(true);
  const [isDownloading, setIsDownloading] = reactExports.useState(false);
  const handleDownload = reactExports.useCallback(async () => {
    if (!selectedTemplate) return;
    const addressToLines = (value) => value.split("\n").map((line) => line.trim()).filter(Boolean);
    const payload = {
      template: selectedTemplate,
      data: {
        ...invoice,
        companyAddress: addressToLines(invoice.companyAddress),
        clientAddress: addressToLines(invoice.clientAddress),
        items: invoice.items.map((item) => ({
          ...item,
          quantity: Number(item.quantity) || 0,
          rate: Number(item.rate) || 0
        }))
      }
    };
    try {
      setIsDownloading(true);
      const response = await fetch(`${API_BASE}/render`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        const message = errorPayload?.error || errorPayload?.message || "Failed to generate PDF";
        throw new Error(message);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `invoice-${invoice.invoiceNumber || "document"}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed:", error);
      alert(error instanceof Error ? error.message : "Failed to generate PDF");
    } finally {
      setIsDownloading(false);
    }
  }, [invoice, selectedTemplate]);
  reactExports.useEffect(() => {
    async function loadTemplate() {
      try {
        const html = await fetchTemplate(selectedTemplate);
        setTemplateHtml(html);
      } catch (error) {
        console.error("Failed to fetch template:", error);
      }
    }
    if (selectedTemplate) {
      loadTemplate();
    }
  }, [selectedTemplate, fetchTemplate]);
  reactExports.useEffect(() => {
    if (!templatesLoading && templates.length > 0) {
      setAppLoading(false);
    }
  }, [templatesLoading, templates]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    appLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 mt-4", children: "Loading templates..." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { onDownload: handleDownload, isDownloading }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "max-w-7xl mx-auto p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "main-grid grid grid-cols-[400px_1fr] gap-6 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-panel space-y-4 pr-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateSelector, { templates, selectedTemplate, onSelect: setSelectedTemplate, loading: templatesLoading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyForm, { invoice, updateField }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClientForm, { invoice, updateField }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceDetailsForm, { invoice, updateField }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LineItemsForm, { items: invoice.items, addItem, removeItem, updateItem }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TaxNotesForm, { invoice, updateField })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InvoicePreview, { invoice, templateHtml, total })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        /* Sticky Preview Panel */
        .preview-panel {
          position: sticky;
          top: 24px;
          height: calc(100vh - 120px);
          align-self: flex-start;
        }

        /* Smooth scrollbar for editor */
        .editor-panel::-webkit-scrollbar {
          width: 6px;
        }
        .editor-panel::-webkit-scrollbar-track {
          background: transparent;
        }
        .editor-panel::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 3px;
        }
        .editor-panel::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }

        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr !important;
          }
          .preview-panel {
            position: relative;
            top: 0;
            height: auto;
          }
        }
      ` })
  ] });
}
export {
  HomePage as component
};
