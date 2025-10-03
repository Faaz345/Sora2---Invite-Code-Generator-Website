'use client'

import { useEffect, useState } from 'react'
import { getStoredReviews, type StoredReview } from '@/lib/reviews'

interface Review {
  id: number | string
  name: string
  stars: number
  comment: string
  avatar: string
  verified: boolean
  isReal?: boolean // true if from stored reviews
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: 1,
    name: 'Sarah M.',
    stars: 5,
    comment: 'Got my code instantly! Works perfectly on Sora 2. Thank you!',
    avatar: '👩‍💻',
    verified: true
  },
  {
    id: 2,
    name: 'Michael K.',
    stars: 5,
    comment: 'Amazing service! Code worked on first try. Highly recommend!',
    avatar: '👨‍💼',
    verified: true
  },
  {
    id: 3,
    name: 'Jessica L.',
    stars: 4,
    comment: 'Great tool! Finally got access to Sora 2. Worth the wait.',
    avatar: '👩‍🎨',
    verified: true
  },
  {
    id: 4,
    name: 'David R.',
    stars: 5,
    comment: 'Legit codes! Been using Sora 2 for 2 days now. Thanks!',
    avatar: '👨‍🔬',
    verified: true
  },
  {
    id: 5,
    name: 'Emma S.',
    stars: 5,
    comment: 'This is incredible! Code activated immediately. 10/10',
    avatar: '👩‍🚀',
    verified: true
  },
  {
    id: 6,
    name: 'James T.',
    stars: 4,
    comment: 'Took a few tries but got a working code. Happy!',
    avatar: '👨‍🎓',
    verified: false
  },
  {
    id: 7,
    name: 'Olivia P.',
    stars: 5,
    comment: 'Best free code generator! Already creating videos on Sora 2.',
    avatar: '👩‍🏫',
    verified: true
  },
  {
    id: 8,
    name: 'Alex W.',
    stars: 5,
    comment: 'Finally! Got my invite code. Sora 2 is mind-blowing!',
    avatar: '👨‍💻',
    verified: true
  },
  {
    id: 9,
    name: 'Sophie B.',
    stars: 4,
    comment: 'Good experience. Code works great. Thanks for the service!',
    avatar: '👩‍🔬',
    verified: true
  },
  {
    id: 10,
    name: 'Ryan M.',
    stars: 5,
    comment: 'Awesome! Code verified instantly. Now enjoying Sora 2!',
    avatar: '👨‍🎨',
    verified: true
  }
]

// Random avatars for user reviews
const userAvatars = ['👤', '👥', '🧑', '👨', '👩', '🙂', '😊', '🌟', '⭐', '✨']

// Convert stored reviews to Review format
function convertStoredReview(stored: StoredReview): Review | null {
  // Only show reviews with feedback and 4+ stars
  if (!stored.feedback || stored.stars < 4) return null
  
  const hoursAgo = Math.floor((Date.now() - stored.createdAt) / (1000 * 60 * 60))
  if (hoursAgo > 48) return null // Only show reviews from last 48 hours
  
  return {
    id: stored.id,
    name: 'User',
    stars: stored.stars,
    comment: stored.feedback,
    avatar: userAvatars[Math.floor(Math.random() * userAvatars.length)],
    verified: false,
    isReal: true
  }
}

export default function FloatingReviews() {
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([])
  
  useEffect(() => {
    // Show 3 random reviews at a time
    const showRandomReviews = () => {
      // Get stored reviews and convert them
      const storedReviews = getStoredReviews()
        .map(convertStoredReview)
        .filter((r): r is Review => r !== null)
      
      // Mix stored reviews with mock reviews (prioritize stored if available)
      const allReviews = [...storedReviews, ...mockReviews]
      const shuffled = allReviews.sort(() => Math.random() - 0.5)
      setVisibleReviews(shuffled.slice(0, 3))
    }

    // Initial load
    showRandomReviews()

    // Rotate reviews every 8 seconds
    const interval = setInterval(showRandomReviews, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Reviews floating around */}
      {visibleReviews.map((review, index) => (
        <div
          key={`${review.id}-${index}`}
          className="absolute animate-float-review opacity-0"
          style={{
            top: `${10 + index * 30}%`,
            left: index % 2 === 0 ? '5%' : 'auto',
            right: index % 2 === 1 ? '5%' : 'auto',
            animationDelay: `${index * 0.5}s`,
            animationDuration: '8s'
          }}
        >
          <div className="glass-card-subtle rounded-2xl p-4 max-w-xs backdrop-blur-xl border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="text-3xl">{review.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-semibold text-sm">{review.name}</h4>
                  {review.isReal ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 font-medium border border-green-500/30">
                      REAL USER
                    </span>
                  ) : review.verified ? (
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : null}
                </div>
                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${
                        i < review.stars ? 'text-yellow-400 fill-yellow-400' : 'text-white/20 fill-white/20'
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            {/* Comment */}
            <p className="text-white/80 text-xs leading-relaxed">{review.comment}</p>
            {/* Time stamp */}
            <p className="text-white/40 text-xs mt-2">
              {Math.floor(Math.random() * 24) + 1}h ago
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
