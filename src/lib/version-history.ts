import type { JSONContent } from '@tiptap/react'

export interface VersionSnapshot {
  id: string
  timestamp: number
  label: string
  content: JSONContent
}

const STORAGE_PREFIX = 'docslide_history_'
const MAX_SNAPSHOTS = 50

export function createSnapshot(docId: string, content: JSONContent, label?: string): VersionSnapshot {
  const snapshot: VersionSnapshot = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now(),
    label: label ?? new Date().toLocaleString(),
    content,
  }

  const snapshots = getSnapshots(docId)
  snapshots.push(snapshot)

  // Keep only the most recent snapshots
  if (snapshots.length > MAX_SNAPSHOTS) {
    snapshots.splice(0, snapshots.length - MAX_SNAPSHOTS)
  }

  try {
    sessionStorage.setItem(STORAGE_PREFIX + docId, JSON.stringify(snapshots))
  } catch {
    // sessionStorage full — drop oldest half
    snapshots.splice(0, Math.floor(snapshots.length / 2))
    try {
      sessionStorage.setItem(STORAGE_PREFIX + docId, JSON.stringify(snapshots))
    } catch {
      // give up silently
    }
  }

  return snapshot
}

export function getSnapshots(docId: string): VersionSnapshot[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_PREFIX + docId)
    if (!raw) return []
    return JSON.parse(raw) as VersionSnapshot[]
  } catch {
    return []
  }
}

export function getSnapshot(docId: string, snapshotId: string): VersionSnapshot | undefined {
  return getSnapshots(docId).find((s) => s.id === snapshotId)
}

export function clearSnapshots(docId: string): void {
  sessionStorage.removeItem(STORAGE_PREFIX + docId)
}
