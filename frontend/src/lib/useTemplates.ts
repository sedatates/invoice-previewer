import { useState, useEffect, useCallback } from "react";
import { CDN_BASE } from "./constants";
import type { Template, TemplateIndex } from "./types";

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("minimal");
  const [templateCache, setTemplateCache] = useState<Record<string, string>>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch template list
  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await fetch(`${CDN_BASE}/index.json`);
        if (!response.ok) throw new Error("Failed to fetch templates");
        const data: TemplateIndex = await response.json();
        setTemplates(data.templates);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  // Fetch template HTML
  const fetchTemplate = useCallback(
    async (templateId: string): Promise<string> => {
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
    error,
  };
}
