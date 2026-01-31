import type { LineItem } from "../lib/types";

interface LineItemsFormProps {
  items: LineItem[];
  addItem: () => void;
  removeItem: (index: number) => void;
  updateItem: (
    index: number,
    field: keyof LineItem,
    value: string | number
  ) => void;
}

export function LineItemsForm({
  items,
  addItem,
  removeItem,
  updateItem,
}: LineItemsFormProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          Line Items
        </h3>
        <button
          onClick={addItem}
          className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Item
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="bg-slate-700/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={item.description}
                onChange={(e) =>
                  updateItem(index, "description", e.target.value)
                }
                placeholder="Description"
                className="flex-1 bg-slate-600 border border-slate-500 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => removeItem(index)}
                className="ml-2 text-slate-400 hover:text-red-400 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400">Quantity</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "quantity",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  min="1"
                  className="w-full bg-slate-600 border border-slate-500 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">Rate</label>
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) =>
                    updateItem(index, "rate", parseFloat(e.target.value) || 0)
                  }
                  min="0"
                  step="0.01"
                  className="w-full bg-slate-600 border border-slate-500 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
