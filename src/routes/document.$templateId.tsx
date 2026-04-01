import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useState, useCallback, lazy, Suspense } from 'react'
import { documentTemplates } from '#/lib/document-templates'
import type { JSONContent } from '@tiptap/react'
import { ArrowLeft, Download, Clock, FileText } from 'lucide-react'

const DocumentEditor = lazy(() => import('#/components/DocumentEditor').then(m => ({ default: m.DocumentEditor })))
const VersionHistoryPanel = lazy(() => import('#/components/VersionHistoryPanel').then(m => ({ default: m.VersionHistoryPanel })))

export const Route = createFileRoute('/document/$templateId')({
  component: DocumentEditorPage,
})

function DocumentEditorPage() {
  const { templateId } = useParams({ from: '/document/$templateId' })
  const template = documentTemplates.find((t) => t.id === templateId)

  const [content, setContent] = useState<JSONContent>(template?.content ?? { type: 'doc', content: [] })
  const [showHistory, setShowHistory] = useState(false)
  const [exportMenuOpen, setExportMenuOpen] = useState(false)

  const docId = `doc-${templateId}`

  const handleExportDocx = useCallback(async () => {
    const [{ createSnapshot }, { exportToDocx }] = await Promise.all([
      import('#/lib/version-history'),
      import('#/lib/export'),
    ])
    createSnapshot(docId, content, 'Before export')
    await exportToDocx(content, template?.name ?? 'document')
    setExportMenuOpen(false)
  }, [content, template, docId])

  const handleExportPdf = useCallback(async () => {
    const { exportToPdf } = await import('#/lib/export')
    exportToPdf()
    setExportMenuOpen(false)
  }, [])

  const handleRestore = useCallback((snapshot: { content: JSONContent }) => {
    setContent(snapshot.content)
    setShowHistory(false)
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
          <FileText size={16} className="text-blue-600" />
          <span className="text-sm font-semibold text-[var(--color-text)]">{template.name}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-text-muted)] hover:bg-gray-50"
            onClick={() => setShowHistory(!showHistory)}
          >
            <Clock size={14} /> History
          </button>
          <div className="relative">
            <button
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
            >
              <Download size={14} /> Export
            </button>
            {exportMenuOpen && (
              <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-lg">
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  onClick={handleExportDocx}
                >
                  Download as DOCX
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

      {/* Editor + optional history panel */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <Suspense fallback={<div className="flex h-full items-center justify-center text-[var(--color-text-muted)]">Loading editor...</div>}>
            <DocumentEditor
              key={JSON.stringify(content)}
              docId={docId}
              initialContent={content}
              onUpdate={setContent}
            />
          </Suspense>
        </div>
        {showHistory && (
          <Suspense fallback={null}>
            <VersionHistoryPanel
              docId={docId}
              onRestore={handleRestore}
              onClose={() => setShowHistory(false)}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}
