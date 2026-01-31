import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Header,
  TemplateSelector,
  CompanyForm,
  ClientForm,
  InvoiceDetailsForm,
  LineItemsForm,
  TaxNotesForm,
  InvoicePreview,
} from "../components";
import { useInvoice } from "../lib/useInvoice";
import { useTemplates } from "../lib/useTemplates";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { invoice, updateField, addItem, removeItem, updateItem, total } =
    useInvoice();

  const {
    templates,
    selectedTemplate,
    setSelectedTemplate,
    fetchTemplate,
    loading: templatesLoading,
  } = useTemplates();

  const [templateHtml, setTemplateHtml] = useState<string | null>(null);
  const [appLoading, setAppLoading] = useState(true);

  // Fetch selected template HTML
  useEffect(() => {
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

  // Hide loading overlay when templates are loaded
  useEffect(() => {
    if (!templatesLoading && templates.length > 0) {
      setAppLoading(false);
    }
  }, [templatesLoading, templates]);

  return (
    <>
      {/* Loading Overlay */}
      {appLoading && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto" />
            <p className="text-slate-400 mt-4">Loading templates...</p>
          </div>
        </div>
      )}

      <Header />

      <main className="max-w-7xl mx-auto p-6">
        <div className="main-grid grid grid-cols-[400px_1fr] gap-6 items-start">
          {/* Left Panel - Editor */}
          <div className="editor-panel space-y-4 pr-2">
            <TemplateSelector
              templates={templates}
              selectedTemplate={selectedTemplate}
              onSelect={setSelectedTemplate}
              loading={templatesLoading}
            />

            <CompanyForm invoice={invoice} updateField={updateField} />

            <ClientForm invoice={invoice} updateField={updateField} />

            <InvoiceDetailsForm invoice={invoice} updateField={updateField} />

            <LineItemsForm
              items={invoice.items}
              addItem={addItem}
              removeItem={removeItem}
              updateItem={updateItem}
            />

            <TaxNotesForm invoice={invoice} updateField={updateField} />
          </div>

          {/* Right Panel - Preview */}
          <InvoicePreview
            invoice={invoice}
            templateHtml={templateHtml}
            total={total}
          />
        </div>
      </main>

      <style>{`
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
      `}</style>
    </>
  );
}
