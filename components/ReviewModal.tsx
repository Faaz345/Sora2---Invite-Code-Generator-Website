'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/stateful-button'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (review: { stars: number; working: 'working' | 'not-working' | null; feedback: string }) => void
}

export default function ReviewModal({ isOpen, onClose, onSubmit }: ReviewModalProps) {
  const [rating, setRating] = useState<'working' | 'not-working' | null>(null)
  const [stars, setStars] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    // Send review data to parent component
    if (onSubmit) {
      onSubmit({ stars, working: rating, feedback })
    }
    
    console.log('Review submitted:', { stars, rating, feedback })
    
    setSubmitted(true)
    
    // Close modal after 2 seconds
    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setRating(null)
      setStars(0)
      setHoveredStar(0)
      setFeedback('')
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-transparent border border-white/20 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
        {!submitted ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                Did the code work?
              </h3>
              <p className="text-white/60 text-sm">
                Your feedback helps us improve code generation from OpenAI servers
              </p>
            </div>

            {/* Star Rating */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium text-center block">
                Rate your experience
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setStars(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-all duration-200 transform hover:scale-110"
                  >
                    <svg
                      className={`w-10 h-10 ${
                        star <= (hoveredStar || stars)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-white/20 fill-white/20'
                      } transition-colors duration-200`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                ))}
              </div>
              {stars > 0 && (
                <p className="text-center text-white/60 text-xs mt-2">
                  {stars === 5 && '⭐ Excellent!'}
                  {stars === 4 && '👍 Great!'}
                  {stars === 3 && '😊 Good!'}
                  {stars === 2 && '😐 Fair'}
                  {stars === 1 && '😞 Poor'}
                </p>
              )}
            </div>

            {/* Rating Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRating('working')}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                  rating === 'working'
                    ? 'border-green-500 bg-green-500/20'
                    : 'border-white/20 bg-white/5 hover:border-green-500/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-white font-semibold">Working</p>
                  <p className="text-white/50 text-xs mt-1">Code is valid</p>
                </div>
              </button>

              <button
                onClick={() => setRating('not-working')}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                  rating === 'not-working'
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-white/20 bg-white/5 hover:border-red-500/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">❌</div>
                  <p className="text-white font-semibold">Not Working</p>
                  <p className="text-white/50 text-xs mt-1">Code invalid</p>
                </div>
              </button>
            </div>

            {/* Feedback Text Area */}
            {rating && (
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">
                  Additional feedback (optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us more about your experience..."
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  rows={3}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-6 rounded-2xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-200"
              >
                Skip
              </button>
              
              <Button
                onClick={handleSubmit}
                disabled={!rating || stars === 0}
                className="flex-1 py-3 rounded-2xl"
              >
                Submit Review
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 mb-4">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Thank you for your feedback!
            </h3>
            <p className="text-white/60 text-sm">
              This helps us improve our code generation system
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
