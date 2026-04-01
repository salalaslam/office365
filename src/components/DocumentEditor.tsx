import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Underline } from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { Placeholder } from '@tiptap/extension-placeholder'
import type { JSONContent } from '@tiptap/react'
import { useCallback, useEffect, useRef } from 'react'
import { DocumentToolbar } from './DocumentToolbar'
import { createSnapshot } from '#/lib/version-history'

interface DocumentEditorProps {
  docId: string
  initialContent?: JSONContent
  onUpdate?: (content: JSONContent) => void
}

export function DocumentEditor({ docId, initialContent, onUpdate }: DocumentEditorProps) {
  const snapshotTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: { depth: 100 },
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Start writing...' }),
    ],
    content: initialContent,
    onUpdate: ({ editor: e }) => {
      onUpdate?.(e.getJSON())
    },
  })

  // Auto-snapshot every 30 seconds
  useEffect(() => {
    if (!editor) return

    snapshotTimer.current = setInterval(() => {
      createSnapshot(docId, editor.getJSON(), 'Auto-save')
    }, 30_000)

    return () => {
      if (snapshotTimer.current) clearInterval(snapshotTimer.current)
    }
  }, [editor, docId])

  const handleImageUpload = useCallback(() => {
    if (!editor) return
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = () => {
      const file = input.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result
        if (typeof result === 'string') {
          editor.chain().focus().setImage({ src: result }).run()
        }
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }, [editor])

  if (!editor) return null

  return (
    <div className="flex h-full flex-col">
      <DocumentToolbar editor={editor} onImageUpload={handleImageUpload} />
      <div className="flex-1 overflow-auto bg-gray-100 p-4 sm:p-8">
        <div className="tiptap-editor mx-auto max-w-[816px] rounded-lg border border-[var(--color-border)] bg-white shadow-sm">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
