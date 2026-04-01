import { createFileRoute, Link } from '@tanstack/react-router'
import { documentTemplates } from '#/lib/document-templates'
import { presentationTemplates } from '#/lib/presentation-templates'
import { FileText, Presentation } from 'lucide-react'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface-dim)]">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-white px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
            DS
          </div>
          <h1 className="text-lg font-bold text-[var(--color-text)]">DocSlide</h1>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700">
            POC
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[var(--color-text)]">
            Create Documents & Presentations
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Pick a template, customize it, and export to DOCX, PPTX, or PDF.
          </p>
        </div>

        {/* Document Templates */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <FileText size={20} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-[var(--color-text)]">Documents</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documentTemplates.map((template) => (
              <Link
                key={template.id}
                to="/document/$templateId"
                params={{ templateId: template.id }}
                className="group rounded-xl border border-[var(--color-border)] bg-white p-5 no-underline transition hover:border-blue-200 hover:shadow-md"
              >
                <div className="mb-3 text-3xl">{template.icon}</div>
                <h4 className="mb-1 text-sm font-semibold text-[var(--color-text)] group-hover:text-blue-600">
                  {template.name}
                </h4>
                <p className="text-xs text-[var(--color-text-muted)]">{template.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Presentation Templates */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Presentation size={20} className="text-purple-600" />
            <h3 className="text-lg font-semibold text-[var(--color-text)]">Presentations</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {presentationTemplates.map((template) => (
              <Link
                key={template.id}
                to="/presentation/$templateId"
                params={{ templateId: template.id }}
                className="group rounded-xl border border-[var(--color-border)] bg-white p-5 no-underline transition hover:border-purple-200 hover:shadow-md"
              >
                <div className="mb-3 text-3xl">{template.icon}</div>
                <h4 className="mb-1 text-sm font-semibold text-[var(--color-text)] group-hover:text-purple-600">
                  {template.name}
                </h4>
                <p className="text-xs text-[var(--color-text-muted)]">{template.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
