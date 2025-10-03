import { NextResponse } from 'next/server'
import { fetchCodesFromSheet, getRandomCode, isValidCodeFormat } from '@/lib/googleSheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { payment_id, order_id, signature } = body

    // In production, verify payment signature with Razorpay
    // For now, we'll assume payment is successful if payment_id exists
    
    if (!payment_id) {
      return NextResponse.json({
        success: false,
        error: 'Invalid payment details'
      }, { status: 400 })
    }

    // Fetch codes from Google Sheet
    const sheetResponse = await fetchCodesFromSheet()
    
    if (!sheetResponse.success || sheetResponse.codes.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No codes available',
        message: 'We apologize, but codes are temporarily unavailable. Please contact support for a refund.'
      })
    }

    // Filter valid codes
    const validCodes = sheetResponse.codes.filter(isValidCodeFormat)

    if (validCodes.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No valid codes available',
        message: 'We apologize, but codes are temporarily unavailable. Please contact support for a refund.'
      })
    }

    // Get a random code (100% success for paid users)
    const code = getRandomCode(validCodes)
    
    if (!code) {
      return NextResponse.json({
        success: false,
        error: 'Failed to retrieve code',
        message: 'We apologize, but we could not retrieve a code. Please contact support for a refund.'
      })
    }

    // Log payment (in production, save to database)
    console.log('Payment verified:', {
      payment_id,
      order_id,
      code,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      code: code,
      payment_id: payment_id,
      message: 'Payment successful! Here is your instant Sora 2 invite code.'
    })

  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json({
      success: false,
      error: 'Server error',
      message: 'An error occurred while processing your payment. Please contact support.'
    }, { status: 500 })
  }
}
