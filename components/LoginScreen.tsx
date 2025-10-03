'use client'

import { useState, FormEvent } from 'react'

interface LoginScreenProps {
  onLogin: () => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const correctPassword = 'F1ZQ23'

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (password === correctPassword) {
      setError('')
      onLogin()
    } else {
      setError('Incorrect password')
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      setPassword('')
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className={`glass-card-enhanced rounded-3xl p-8 md:p-12 shadow-2xl ${isShaking ? 'shake' : ''}`}>
        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-violet-500 to-blue-500 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-white mb-3">
          Access Required
        </h2>
        <p className="text-center text-white/70 mb-8">
          Enter the password to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-violet-400/50 focus:border-violet-400 transition-all backdrop-blur-sm"
              placeholder="Enter password"
              autoFocus
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-3">
              <p className="text-red-200 text-sm text-center">
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Enter
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-white/50">
            🔒 Secure access only
          </p>
        </div>
      </div>
    </div>
  )
}
