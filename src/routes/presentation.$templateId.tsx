import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useState, useCallback, lazy, Suspense } from 'react'
import { presentationTemplates } from '#/lib/presentation-templates'
import type { SlideData } from '#/lib/presentation-templates'
import { ArrowLeft, Download, Presentation } from 'lucide-react'

const SlideEditor = lazy(() => import('#/components/SlideEditor').then(m => ({ default: m.SlideEditor })))

export const Route = createFileRoute('/presentation/$templateId')({
  component: PresentationEditorPage,
})

function PresentationEditorPage() {
  const { templateId } = useParams({ from: '/presentation/$templateId' })
  const template = presentationTemplates.find((t) => t.id === templateId)

  const [slides, setSlides] = useState<SlideData[]>(template?.slides ?? [])
  const [transition] = useState(template?.transition ?? 'fade')
  const [exportMenuOpen, setExportMenuOpen] = useState(false)

  const handleExportPptx = useCallback(async () => {
    const { exportToPptx } = await import('#/lib/export')
    await exportToPptx(slides, template?.name ?? 'presentation')
    setExportMenuOpen(false)
  }, [slides, template])

  const handleExportPdf = useCallback(async () => {
    const { exportToPdf } = await import('#/lib/export')
    exportToPdf()
    setExportMenuOpen(false)
  }, [])

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg text-[var(--color-text-muted)]">Template not found</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Top bar */}
      <header className="flex items-center gap-3 border-b border-[var(--color-border)] bg-white px-4 py-2">
        <Link to="/" className="toolbar-btn" title="Back to home">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex items-center gap-2">
          <Presentation size={16} className="text-purple-600" />
          <span className="text-sm font-semibold text-[var(--color-text)]">{template.name}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <button
              className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700"
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
            >
              <Download size={14} /> Export
            </button>
            {exportMenuOpen && (
              <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-lg">
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  onClick={handleExportPptx}
                >
                  Download as PPTX
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  onClick={handleExportPdf}
                >
                  Print / Save as PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Suspense fallback={<div className="flex h-full items-center justify-center text-[var(--color-text-muted)]">Loading editor...</div>}>
          <SlideEditor
            slides={slides}
            transition={transition}
            onChange={setSlides}
          />
        </Suspense>
      </div>
    </div>
  )
}
