'use client'

import { useEffect } from 'react'
import { PAYMENT_CONFIG } from '@/lib/razorpay'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Load Razorpay payment button script
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js'
      script.setAttribute('data-payment_button_id', PAYMENT_CONFIG.PAYMENT_BUTTON_ID)
      script.async = true
      
      const form = document.getElementById('razorpay-payment-form')
      if (form) {
        form.innerHTML = ''
        form.appendChild(script)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">
            Get Instant Access
          </h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Benefits */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold">100% Success Rate</p>
              <p className="text-white/60 text-sm">Guaranteed working code</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold">Instant Delivery</p>
              <p className="text-white/60 text-sm">Get code immediately after payment</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold">Secure Payment</p>
              <p className="text-white/60 text-sm">UPI, Cards, Net Banking accepted</p>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-orange-500/10 border-2 border-orange-500/30 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-orange-300 font-bold text-sm mb-2">⚠️ IMPORTANT - Read Before Paying</h4>
              <div className="space-y-2 text-white/80 text-xs leading-relaxed">
                <p className="font-semibold">📋 Payment Process:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Check Discord first for code availability</li>
                  <li>Contact the user who sent you the video link</li>
                  <li>Complete payment below</li>
                  <li>Send payment screenshot to Discord</li>
                  <li>Receive your code immediately</li>
                </ol>
                <p className="mt-3 text-orange-200 font-semibold">⚡ Codes delivered manually via Discord after payment verification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Price Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">One-time payment</p>
              <p className="text-white font-bold text-3xl">${PAYMENT_CONFIG.INSTANT_CODE_PRICE}</p>
            </div>
            <div className="text-right">
              <p className="text-green-400 font-semibold text-sm">Special Offer</p>
              <p className="text-white/60 text-xs line-through">$5</p>
            </div>
          </div>
        </div>

        {/* Razorpay Payment Button */}
        <div className="mb-6">
          <form id="razorpay-payment-form" className="flex justify-center">
            {/* Razorpay button will be injected here */}
          </form>
        </div>

        {/* Alternative Payment Link */}
        <div className="text-center">
          <p className="text-white/40 text-xs mb-3">Or pay via link</p>
          <a
            href={PAYMENT_CONFIG.PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open Payment Link
          </a>
        </div>

        {/* Support Info */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-center text-white/50 text-xs">
            After payment, send screenshot to Discord for code delivery.<br />
            Contact the Discord user who shared this link with you.
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-white/40 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
            </svg>
            <span>Need help? Email: support@getsora2.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}
