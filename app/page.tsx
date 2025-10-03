'use client'

import { useState, useEffect } from 'react'
import CloudIcon from '@/components/CloudIcon'
import LoginScreen from '@/components/LoginScreen'
import AdContainer from '@/components/AdContainer'
import { Button } from '@/components/ui/stateful-button'
import { generateCode } from '@/lib/generateCode'
import { adConfig } from '@/lib/adConfig'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [isWatchingAd, setIsWatchingAd] = useState(false)
  const [adCountdown, setAdCountdown] = useState(5)
  const [isRetrieving, setIsRetrieving] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Check if user is already logged in
  useEffect(() => {
    const loginStatus = sessionStorage.getItem('isLoggedIn')
    if (loginStatus === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  // Ad countdown timer
  useEffect(() => {
    if (isWatchingAd && adCountdown > 0) {
      const timer = setTimeout(() => setAdCountdown(adCountdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (isWatchingAd && adCountdown === 0) {
      // Ad finished, start retrieving
      setIsWatchingAd(false)
      setIsRetrieving(true)
      
      // Simulate retrieving from servers (3-5 seconds)
      const retrievalTime = Math.floor(Math.random() * 3000) + 3000 // 3-6 seconds
      
      setTimeout(() => {
        setIsRetrieving(false)
        
        // 50% chance of error
        const shouldError = Math.random() < 0.5
        
        if (shouldError) {
          setShowError(true)
          setErrorMessage('No codes available at the moment. Please try again later.')
          setAdCountdown(5)
        } else {
          // Generate single code
          const code = generateCode()
          setGeneratedCode(code)
          setAdCountdown(5)
        }
      }, retrievalTime)
    }
  }, [isWatchingAd, adCountdown])

  const handleLogin = () => {
    sessionStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  const handleGetCodes = () => {
    // Reset states
    setShowError(false)
    setGeneratedCode('')
    setIsRetrieving(false)
    // Start ad watching
    setIsWatchingAd(true)
    setAdCountdown(5)
  }

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  // Show main content if logged in
  return (
    <div className="w-full max-w-xl">
      <div className="glass-card-enhanced rounded-3xl p-6 md:p-10 shadow-2xl">
        {/* Cloud Icon */}
        <div className="flex justify-center mb-4">
          <CloudIcon />
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
          Get Sora 2 Invite Codes
        </h2>

        {/* Show Retrieving State */}
        {isRetrieving ? (
          <div className="space-y-6">
            <div className="relative bg-transparent rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm">
                  <svg className="w-10 h-10 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Retrieving codes...</h3>
                  <p className="text-white/70 text-sm">Connecting to OpenAI servers</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
            <p className="text-center text-white/50 text-xs">⏳ Please wait while we fetch your code</p>
          </div>
        ) : showError ? (
          <div className="space-y-4">
            {/* Compact Professional Error Display */}
            <div className="bg-transparent border border-orange-400/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="space-y-3">
                {/* Header with Icon */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-transparent border border-orange-400/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">Codes Temporarily Unavailable</h3>
                    <p className="text-white/60 text-xs">Daily limit reached • Try again later</p>
                  </div>
                </div>
                
                {/* Compact Info */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Why section */}
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-white/80 text-xs font-medium">Rate Limited</p>
                        <p className="text-white/50 text-xs">OpenAI caps daily invites</p>
                      </div>
                    </div>
                    
                    {/* What to do */}
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-white/80 text-xs font-medium">Try Later</p>
                        <p className="text-white/50 text-xs">Try again in 5 minutes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              onClick={handleGetCodes}
              className="w-full py-3 rounded-2xl"
            >
              Try Again
            </Button>
          </div>
        ) : isWatchingAd ? (
          <div className="space-y-6">
            {/* Real Ad Container */}
            <AdContainer type="video" />
            
            {/* Countdown Timer */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <span className="text-3xl font-bold text-white">{adCountdown}</span>
              </div>
              <p className="text-white/60 text-xs mt-2">seconds remaining</p>
            </div>
            
            <p className="text-center text-white/50 text-xs">💡 Your code will appear automatically</p>
          </div>
        ) : generatedCode ? (
          <div className="space-y-5">
            {/* Single Code Display - Inspired by Sora Design */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-white/90 font-semibold mb-2">Your Sora 2 Invite Code</h3>
                <p className="text-white/60 text-xs">Use this code to join Sora</p>
              </div>
              
              {/* Code Display Card */}
              <div className="bg-transparent rounded-2xl p-6 border-2 border-white/20 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {generatedCode.split('').map((char, index) => (
                    <div
                      key={index}
                      className="w-12 h-14 md:w-14 md:h-16 bg-gray-800/80 rounded-xl flex items-center justify-center border border-white/10"
                    >
                      <span className="text-2xl md:text-3xl font-bold text-white font-mono">
                        {char}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Copy Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCode)
                    alert('Code copied to clipboard!')
                  }}
                  className="w-full py-3 px-6 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy code
                </button>
              </div>
            </div>

            {/* Banner Ad */}
            <AdContainer type="banner" />

            {/* Get New Code Button */}
            <Button
              onClick={handleGetCodes}
              className="w-full py-2.5 text-sm rounded-2xl"
            >
              Get Another Code
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              onClick={handleGetCodes}
              className="w-full py-4 text-lg rounded-2xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              Get Codes
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
