export type StoredReview = {
  id: string
  stars: number
  working: 'working' | 'not-working' | null
  feedback: string
  createdAt: number // epoch ms
}

const STORAGE_KEY = 'sora2_reviews'

export function getStoredReviews(): StoredReview[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredReview[]
    // Basic validation
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function addStoredReview(review: Omit<StoredReview, 'id' | 'createdAt'>) {
  if (typeof window === 'undefined') return
  const existing = getStoredReviews()
  const newReview: StoredReview = {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
    createdAt: Date.now(),
    ...review,
  }
  const updated = [newReview, ...existing].slice(0, 100) // cap to 100 to avoid bloat
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}
