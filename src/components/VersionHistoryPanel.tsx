import { useState, useEffect, useCallback } from 'react'
import type { VersionSnapshot } from '#/lib/version-history'
import { getSnapshots } from '#/lib/version-history'
import { Clock, X } from 'lucide-react'

interface VersionHistoryPanelProps {
  docId: string
  onRestore: (snapshot: VersionSnapshot) => void
  onClose: () => void
}

export function VersionHistoryPanel({ docId, onRestore, onClose }: VersionHistoryPanelProps) {
  const [snapshots, setSnapshots] = useState<VersionSnapshot[]>([])

  const refresh = useCallback(() => {
    setSnapshots(getSnapshots(docId).toReversed())
  }, [docId])

  useEffect(() => {
    refresh()
    const timer = setInterval(refresh, 5000)
    return () => clearInterval(timer)
  }, [refresh])

  return (
    <div className="flex h-full w-72 flex-col border-l border-[var(--color-border)] bg-white">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Clock size={16} />
          Version History
        </div>
        <button className="toolbar-btn" onClick={onClose}><X size={16} /></button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {snapshots.length === 0 ? (
          <div className="p-4 text-center text-sm text-[var(--color-text-muted)]">
            No snapshots yet. Changes are auto-saved every 30 seconds.
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-border)]">
            {snapshots.map((snapshot) => (
              <div key={snapshot.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">{snapshot.label}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {new Date(snapshot.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100"
                  onClick={() => onRestore(snapshot)}
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
