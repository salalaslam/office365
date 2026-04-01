import type { Editor } from '@tiptap/react'
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote,
  AlignLeft, AlignCenter, AlignRight,
  ImageIcon, TableIcon, Minus,
  Undo2, Redo2,
} from 'lucide-react'

interface DocumentToolbarProps {
  editor: Editor
  onImageUpload: () => void
}

export function DocumentToolbar({ editor, onImageUpload }: DocumentToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-[var(--color-border)] bg-white px-2 py-1.5">
      {/* Undo / Redo */}
      <button
        className={`toolbar-btn`}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo2 size={16} />
      </button>
      <button
        className={`toolbar-btn`}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo2 size={16} />
      </button>

      <div className="toolbar-divider" />

      {/* Text formatting */}
      <button
        className={`toolbar-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        className={`toolbar-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        className={`toolbar-btn ${editor.isActive('underline') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        title="Underline"
      >
        <UnderlineIcon size={16} />
      </button>
      <button
        className={`toolbar-btn ${editor.isActive('strike') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </button>

      <div className="toolbar-divider" />

      {/* Headings */}
      <button
        className={`toolbar-btn ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </button>
      <button
        className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </button>
      <button
        className={`toolbar-btn ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </button>

      <div className="toolbar-divider" />

      {/* Lists */}
      <button
        className={`toolbar-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet List"
      >
        <List size={16} />
      </button>
      <button
        className={`toolbar-btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Ordered List"
      >
        <ListOrdered size={16} />
      </button>
      <button
        className={`toolbar-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Block Quote"
      >
        <Quote size={16} />
      </button>

      <div className="toolbar-divider" />

      {/* Text alignment */}
      <button
        className={`toolbar-btn ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </button>
      <button
        className={`toolbar-btn ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </button>
      <button
        className={`toolbar-btn ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        title="Align Right"
      >
        <AlignRight size={16} />
      </button>

      <div className="toolbar-divider" />

      {/* Insert */}
      <button
        className="toolbar-btn"
        onClick={onImageUpload}
        title="Insert Image"
      >
        <ImageIcon size={16} />
      </button>
      <button
        className="toolbar-btn"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        title="Insert Table"
      >
        <TableIcon size={16} />
      </button>
      <button
        className="toolbar-btn"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal Rule"
      >
        <Minus size={16} />
      </button>
    </div>
  )
}
