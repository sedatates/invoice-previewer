import type { Template } from "../lib/types";

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
  loading: boolean;
}

// Template style icons/colors for visual distinction
const templateStyles: Record<string, { icon: string; color: string }> = {
  minimal: { icon: "○", color: "from-slate-400 to-slate-500" },
  modern: { icon: "◆", color: "from-blue-400 to-blue-600" },
  classic: { icon: "◇", color: "from-amber-400 to-amber-600" },
  professional: { icon: "■", color: "from-gray-400 to-gray-600" },
  creative: { icon: "★", color: "from-purple-400 to-purple-600" },
  elegant: { icon: "◈", color: "from-rose-400 to-rose-600" },
  bold: { icon: "▲", color: "from-red-400 to-red-600" },
  simple: { icon: "●", color: "from-green-400 to-green-600" },
  shadcn: { icon: "◉", color: "from-zinc-400 to-zinc-600" },
};

export function TemplateSelector({
  templates,
  selectedTemplate,
  onSelect,
  loading,
}: TemplateSelectorProps) {
  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Template
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-slate-700 rounded-lg h-20"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <label className="block text-sm font-medium text-slate-300 mb-3">
        Template
      </label>
      <div className="grid grid-cols-3 gap-2">
        {templates.map((template) => {
          const isSelected = template.id === selectedTemplate;
          const style = templateStyles[template.id] || {
            icon: "□",
            color: "from-slate-400 to-slate-500",
          };

          return (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`relative rounded-xl p-3 transition-all duration-200 ${
                isSelected
                  ? "bg-gradient-to-br " +
                    style.color +
                    " ring-2 ring-white/30 scale-[1.02]"
                  : "bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-slate-500"
              }`}
              title={template.label}>
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`text-2xl ${
                    isSelected ? "text-white" : "text-slate-400"
                  }`}>
                  {style.icon}
                </span>
                <span
                  className={`text-[11px] font-medium ${
                    isSelected ? "text-white" : "text-slate-300"
                  }`}>
                  {template.label}
                </span>
              </div>
              {isSelected && (
                <div className="absolute top-1 right-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
