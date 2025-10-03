// Razorpay Integration for Instant Code Access

export interface RazorpayOptions {
  key: string
  amount: number // in paise (e.g., 9900 = ₹99)
  currency: string
  name: string
  description: string
  image?: string
  order_id?: string
  handler: (response: RazorpayResponse) => void
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: {
    color?: string
  }
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id?: string
  razorpay_signature?: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

/**
 * Initialize Razorpay payment
 * @param options Razorpay configuration options
 */
export function initRazorpay(options: RazorpayOptions) {
  if (typeof window === 'undefined') return

  const rzp = new window.Razorpay(options)
  rzp.open()

  rzp.on('payment.failed', function (response: any) {
    console.error('Payment failed:', response.error)
    alert('Payment failed. Please try again.')
  })
}

/**
 * Load Razorpay script
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false)
      return
    }

    if (window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

/**
 * Payment configuration
 */
export const PAYMENT_CONFIG = {
  // Razorpay Payment Button ID
  PAYMENT_BUTTON_ID: 'pl_RP2wNumCMbZD1t',
  
  // Razorpay Payment Link
  PAYMENT_LINK: 'https://rzp.io/rzp/6OPOzlvU',
  
  // Pricing
  INSTANT_CODE_PRICE: 2, // $2 for instant code
  
  // Payment details
  CURRENCY: 'USD',
  COMPANY_NAME: 'GetSora2',
  COMPANY_LOGO: '/icon.png',
  THEME_COLOR: '#8b5cf6', // Purple theme
}

/**
 * Convert amount to paise (Razorpay uses paise)
 */
export function convertToPaise(amount: number): number {
  return amount * 100
}
