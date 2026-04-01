import type { JSONContent } from '@tiptap/react'
import type { SlideData } from './presentation-templates'

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ─── DOCX Export ───
export async function exportToDocx(content: JSONContent, filename: string) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType } = await import('docx')

  const children: InstanceType<typeof Paragraph | typeof Table>[] = []

  function processNode(node: JSONContent) {
    if (!node.type) return

    switch (node.type) {
      case 'heading': {
        const level = node.attrs?.level ?? 1
        const headingMap: Record<number, typeof HeadingLevel[keyof typeof HeadingLevel]> = {
          1: HeadingLevel.HEADING_1,
          2: HeadingLevel.HEADING_2,
          3: HeadingLevel.HEADING_3,
        }
        children.push(
          new Paragraph({
            heading: headingMap[level] ?? HeadingLevel.HEADING_1,
            children: extractTextRuns(node, TextRun),
          }),
        )
        break
      }
      case 'paragraph': {
        children.push(
          new Paragraph({
            children: extractTextRuns(node, TextRun),
          }),
        )
        break
      }
      case 'bulletList': {
        node.content?.forEach((li) => {
          li.content?.forEach((p) => {
            children.push(
              new Paragraph({
                bullet: { level: 0 },
                children: extractTextRuns(p, TextRun),
              }),
            )
          })
        })
        break
      }
      case 'orderedList': {
        node.content?.forEach((li, idx) => {
          li.content?.forEach((p) => {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({ text: `${idx + 1}. ` }),
                  ...extractTextRuns(p, TextRun),
                ],
              }),
            )
          })
        })
        break
      }
      case 'blockquote': {
        node.content?.forEach((child) => {
          children.push(
            new Paragraph({
              indent: { left: 720 },
              children: extractTextRuns(child, TextRun),
            }),
          )
        })
        break
      }
      case 'horizontalRule': {
        children.push(
          new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC' } },
            children: [],
          }),
        )
        break
      }
      case 'table': {
        const rows = (node.content ?? []).map((rowNode) => {
          const cells = (rowNode.content ?? []).map((cellNode) => {
            const text = extractPlainText(cellNode)
            return new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text })] })],
              width: { size: 3000, type: WidthType.DXA },
            })
          })
          return new TableRow({ children: cells })
        })
        if (rows.length > 0) {
          children.push(new Table({ rows }))
        }
        break
      }
      default: {
        node.content?.forEach(processNode)
      }
    }
  }

  content.content?.forEach(processNode)

  const doc = new Document({
    sections: [
      {
        children: children.length > 0 ? children : [new Paragraph({ children: [new TextRun('')] })],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  triggerDownload(blob, `${filename}.docx`)
}

function extractTextRuns(node: JSONContent, TextRun: any): any[] {
  const runs: any[] = []
  if (node.content) {
    for (const child of node.content) {
      if (child.type === 'text') {
        const marks = child.marks ?? []
        runs.push(
          new TextRun({
            text: child.text ?? '',
            bold: marks.some((m: any) => m.type === 'bold'),
            italics: marks.some((m: any) => m.type === 'italic'),
            underline: marks.some((m: any) => m.type === 'underline') ? {} : undefined,
            strike: marks.some((m: any) => m.type === 'strike'),
          }),
        )
      }
    }
  }
  return runs.length > 0 ? runs : [new TextRun('')]
}

function extractPlainText(node: JSONContent): string {
  if (node.type === 'text') return node.text ?? ''
  return (node.content ?? []).map(extractPlainText).join('')
}

// ─── PPTX Export ───
export async function exportToPptx(slides: SlideData[], filename: string) {
  const PptxGenJS = (await import('pptxgenjs')).default
  const pres = new PptxGenJS()
  pres.layout = 'LAYOUT_WIDE'

  for (const slideData of slides) {
    const slide = pres.addSlide()

    // Background
    if (slideData.background?.startsWith('linear-gradient')) {
      // Extract first color from gradient for background
      const colorMatch = slideData.background.match(/#[0-9a-fA-F]{6}/)
      slide.background = { color: colorMatch ? colorMatch[0].replace('#', '') : '000000' }
    } else if (slideData.background) {
      slide.background = { color: slideData.background.replace('#', '') }
    }

    const textColor = slideData.textColor?.replace('#', '') ?? '000000'

    switch (slideData.layout) {
      case 'title':
        slide.addText(slideData.title, {
          x: 0.5, y: 1.5, w: '90%', h: 2,
          fontSize: 40, fontFace: 'Arial',
          color: textColor, bold: true,
          align: 'center', valign: 'bottom',
        })
        if (slideData.subtitle) {
          slide.addText(slideData.subtitle, {
            x: 0.5, y: 3.6, w: '90%', h: 1,
            fontSize: 20, fontFace: 'Arial',
            color: textColor, align: 'center', valign: 'top',
          })
        }
        break

      case 'title-content':
        slide.addText(slideData.title, {
          x: 0.5, y: 0.5, w: '90%', h: 1.2,
          fontSize: 32, fontFace: 'Arial',
          color: textColor, bold: true,
        })
        if (slideData.body) {
          slide.addText(slideData.body, {
            x: 0.5, y: 2, w: '90%', h: 3,
            fontSize: 18, fontFace: 'Arial',
            color: textColor, valign: 'top',
          })
        }
        break

      case 'bullets':
        slide.addText(slideData.title, {
          x: 0.5, y: 0.4, w: '90%', h: 1,
          fontSize: 30, fontFace: 'Arial',
          color: textColor, bold: true,
        })
        if (slideData.bullets?.length) {
          const bulletText = slideData.bullets.map((b) => ({
            text: b,
            options: { bullet: true, fontSize: 18, color: textColor, breakLine: true },
          }))
          slide.addText(bulletText as any, {
            x: 0.8, y: 1.6, w: '85%', h: 4,
            fontFace: 'Arial', valign: 'top',
            paraSpaceAfter: 8,
          })
        }
        break

      default:
        slide.addText(slideData.title, {
          x: 0.5, y: 0.5, w: '90%', h: 1,
          fontSize: 28, fontFace: 'Arial',
          color: textColor, bold: true,
        })
    }
  }

  const blob = (await pres.write({ outputType: 'blob' })) as Blob
  triggerDownload(blob, `${filename}.pptx`)
}

// ─── PDF Export (via print) ───
export function exportToPdf() {
  window.print()
}
