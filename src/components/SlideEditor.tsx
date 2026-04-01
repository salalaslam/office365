import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { SlideData } from '#/lib/presentation-templates'
import {
  Plus, Trash2, ChevronLeft, ChevronRight, Play,
} from 'lucide-react'

interface SlideEditorProps {
  slides: SlideData[]
  transition: 'fade' | 'slide' | 'scale'
  onChange: (slides: SlideData[]) => void
}

const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
}

export function SlideEditor({ slides, transition, onChange }: SlideEditorProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPresenting, setIsPresenting] = useState(false)

  const currentSlide = slides[currentIndex]

  const updateSlide = useCallback(
    (index: number, updates: Partial<SlideData>) => {
      const updated = slides.map((s, i) => (i === index ? { ...s, ...updates } : s))
      onChange(updated)
    },
    [slides, onChange],
  )

  const addSlide = useCallback(() => {
    const newSlide: SlideData = {
      id: `slide-${Date.now()}`,
      layout: 'title-content',
      title: 'New Slide',
      body: 'Click to edit content',
      background: '#ffffff',
      textColor: '#1e293b',
    }
    const updated = [...slides, newSlide]
    onChange(updated)
    setCurrentIndex(updated.length - 1)
  }, [slides, onChange])

  const deleteSlide = useCallback(
    (index: number) => {
      if (slides.length <= 1) return
      const updated = slides.filter((_, i) => i !== index)
      onChange(updated)
      setCurrentIndex(Math.min(index, updated.length - 1))
    },
    [slides, onChange],
  )

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrentIndex((i) => Math.min(i + 1, slides.length - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Escape' && isPresenting) {
        setIsPresenting(false)
      }
    }
    if (isPresenting) {
      window.addEventListener('keydown', handleKey)
      return () => window.removeEventListener('keydown', handleKey)
    }
  }, [slides.length, isPresenting])

  // Fullscreen presentation
  if (isPresenting) {
    return (
      <div
        className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black"
        onClick={() => {
          if (currentIndex < slides.length - 1) {
            setCurrentIndex(currentIndex + 1)
          } else {
            setIsPresenting(false)
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            variants={transitionVariants[transition]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="flex h-full w-full items-center justify-center"
          >
            <SlideRenderer slide={currentSlide} fullscreen />
          </motion.div>
        </AnimatePresence>
        <button
          className="absolute right-4 top-4 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20"
          onClick={(e) => { e.stopPropagation(); setIsPresenting(false) }}
        >
          ESC to exit
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
          {currentIndex + 1} / {slides.length}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Top toolbar */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-white px-4 py-2">
        <button
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          onClick={() => { setIsPresenting(true); setCurrentIndex(0) }}
        >
          <Play size={14} /> Present
        </button>
        <div className="toolbar-divider" />
        <button className="toolbar-btn" title="Add Slide" onClick={addSlide}>
          <Plus size={16} />
        </button>
        <button
          className="toolbar-btn"
          title="Delete Slide"
          onClick={() => deleteSlide(currentIndex)}
          disabled={slides.length <= 1}
        >
          <Trash2 size={16} />
        </button>
        <div className="toolbar-divider" />
        <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
          <button
            className="toolbar-btn"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={16} />
          </button>
          <span>{currentIndex + 1} / {slides.length}</span>
          <button
            className="toolbar-btn"
            onClick={() => setCurrentIndex(Math.min(slides.length - 1, currentIndex + 1))}
            disabled={currentIndex === slides.length - 1}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Slide thumbnails */}
        <div className="w-48 flex-shrink-0 overflow-y-auto border-r border-[var(--color-border)] bg-gray-50 p-3">
          <div className="flex flex-col gap-2">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                className={`slide-thumbnail ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                <div
                  className="flex h-full w-full items-center justify-center p-2 text-[6px] leading-tight"
                  style={{ background: slide.background ?? '#fff', color: slide.textColor ?? '#000' }}
                >
                  <span className="truncate font-semibold">{slide.title}</span>
                </div>
              </button>
            ))}
            <button
              className="flex aspect-video items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-500"
              onClick={addSlide}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Main slide editing area */}
        <div className="flex-1 overflow-auto bg-gray-100 p-8">
          <div className="mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                variants={transitionVariants[transition]}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <SlideEditPanel
                  slide={currentSlide}
                  onUpdate={(updates) => updateSlide(currentIndex, updates)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Slide Renderer (for presentation mode) ───
function SlideRenderer({ slide, fullscreen }: { slide: SlideData; fullscreen?: boolean }) {
  const containerClass = fullscreen
    ? 'w-full h-full flex flex-col justify-center'
    : 'slide-canvas flex flex-col justify-center'

  return (
    <div
      className={containerClass}
      style={{ background: slide.background ?? '#ffffff', color: slide.textColor ?? '#1e293b' }}
    >
      <div className="px-[8%] py-[5%]">
        {slide.layout === 'title' && (
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className={`font-bold ${fullscreen ? 'text-6xl' : 'text-4xl'} mb-4`}>{slide.title}</h1>
            {slide.subtitle && (
              <p className={`opacity-80 ${fullscreen ? 'text-2xl' : 'text-lg'}`}>{slide.subtitle}</p>
            )}
          </div>
        )}

        {slide.layout === 'title-content' && (
          <div>
            <h2 className={`font-bold ${fullscreen ? 'text-5xl' : 'text-3xl'} mb-6`}>{slide.title}</h2>
            {slide.body && (
              <p className={`leading-relaxed ${fullscreen ? 'text-2xl' : 'text-base'}`}>{slide.body}</p>
            )}
          </div>
        )}

        {slide.layout === 'bullets' && (
          <div>
            <h2 className={`font-bold ${fullscreen ? 'text-5xl' : 'text-3xl'} mb-6`}>{slide.title}</h2>
            {slide.bullets && (
              <ul className={`space-y-3 pl-6 ${fullscreen ? 'text-2xl' : 'text-base'}`}>
                {slide.bullets.map((bullet, i) => (
                  <li key={i} className="list-disc">{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {slide.layout === 'blank' && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm opacity-40">Blank slide</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Slide Edit Panel (inline editing) ───
function SlideEditPanel({ slide, onUpdate }: { slide: SlideData; onUpdate: (updates: Partial<SlideData>) => void }) {
  return (
    <div>
      {/* The visual slide */}
      <div
        className="slide-canvas mb-6"
        style={{ background: slide.background ?? '#ffffff', color: slide.textColor ?? '#1e293b' }}
      >
        <div className="flex h-full flex-col justify-center px-[8%] py-[5%]">
          {slide.layout === 'title' && (
            <div className="flex flex-col items-center text-center">
              <input
                className="mb-3 w-full bg-transparent text-center text-4xl font-bold outline-none placeholder:opacity-40"
                value={slide.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Slide Title"
                style={{ color: 'inherit' }}
              />
              <input
                className="w-full bg-transparent text-center text-lg opacity-80 outline-none placeholder:opacity-40"
                value={slide.subtitle ?? ''}
                onChange={(e) => onUpdate({ subtitle: e.target.value })}
                placeholder="Subtitle"
                style={{ color: 'inherit' }}
              />
            </div>
          )}

          {slide.layout === 'title-content' && (
            <div>
              <input
                className="mb-4 w-full bg-transparent text-3xl font-bold outline-none placeholder:opacity-40"
                value={slide.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Slide Title"
                style={{ color: 'inherit' }}
              />
              <textarea
                className="w-full resize-none bg-transparent text-base leading-relaxed outline-none placeholder:opacity-40"
                value={slide.body ?? ''}
                onChange={(e) => onUpdate({ body: e.target.value })}
                placeholder="Content goes here..."
                rows={5}
                style={{ color: 'inherit' }}
              />
            </div>
          )}

          {slide.layout === 'bullets' && (
            <div>
              <input
                className="mb-4 w-full bg-transparent text-3xl font-bold outline-none placeholder:opacity-40"
                value={slide.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Slide Title"
                style={{ color: 'inherit' }}
              />
              <div className="space-y-2 pl-6">
                {(slide.bullets ?? []).map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: slide.textColor ?? '#1e293b' }} />
                    <input
                      className="w-full bg-transparent outline-none placeholder:opacity-40"
                      value={bullet}
                      onChange={(e) => {
                        const bullets = [...(slide.bullets ?? [])]
                        bullets[i] = e.target.value
                        onUpdate({ bullets })
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          const bullets = [...(slide.bullets ?? [])]
                          bullets.splice(i + 1, 0, '')
                          onUpdate({ bullets })
                        } else if (e.key === 'Backspace' && bullet === '' && (slide.bullets?.length ?? 0) > 1) {
                          e.preventDefault()
                          const bullets = [...(slide.bullets ?? [])]
                          bullets.splice(i, 1)
                          onUpdate({ bullets })
                        }
                      }}
                      placeholder="Bullet point"
                      style={{ color: 'inherit' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.layout === 'blank' && (
            <div className="flex h-full items-center justify-center">
              <input
                className="w-full bg-transparent text-center text-2xl font-bold outline-none placeholder:opacity-40"
                value={slide.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Click to add content"
                style={{ color: 'inherit' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Slide properties panel */}
      <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
        <h3 className="mb-3 text-sm font-semibold text-[var(--color-text)]">Slide Properties</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs text-[var(--color-text-muted)]">Layout</label>
            <select
              className="w-full rounded-md border border-[var(--color-border)] bg-white px-2 py-1.5 text-sm"
              value={slide.layout}
              onChange={(e) => {
                const layout = e.target.value as SlideData['layout']
                const updates: Partial<SlideData> = { layout }
                if (layout === 'bullets' && !slide.bullets) {
                  updates.bullets = ['First point', 'Second point', 'Third point']
                }
                onUpdate(updates)
              }}
            >
              <option value="title">Title</option>
              <option value="title-content">Title + Content</option>
              <option value="bullets">Bullet Points</option>
              <option value="blank">Blank</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--color-text-muted)]">Background</label>
            <div className="flex gap-1">
              <input
                type="color"
                className="h-8 w-8 cursor-pointer rounded border border-[var(--color-border)]"
                value={slide.background?.startsWith('#') ? slide.background : '#ffffff'}
                onChange={(e) => onUpdate({ background: e.target.value })}
              />
              <select
                className="flex-1 rounded-md border border-[var(--color-border)] bg-white px-2 py-1 text-xs"
                value={slide.background?.startsWith('linear') ? slide.background : 'custom'}
                onChange={(e) => {
                  if (e.target.value !== 'custom') onUpdate({ background: e.target.value })
                }}
              >
                <option value="custom">Solid</option>
                <option value="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">Purple</option>
                <option value="linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)">Dark Blue</option>
                <option value="linear-gradient(135deg, #059669 0%, #0d9488 100%)">Green</option>
                <option value="linear-gradient(135deg, #f97316 0%, #ef4444 100%)">Orange-Red</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-[var(--color-text-muted)]">Text Color</label>
            <input
              type="color"
              className="h-8 w-8 cursor-pointer rounded border border-[var(--color-border)]"
              value={slide.textColor ?? '#1e293b'}
              onChange={(e) => onUpdate({ textColor: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
