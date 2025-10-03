import { NextResponse } from 'next/server'
import { fetchCodesFromSheet, getRandomCode, isValidCodeFormat } from '@/lib/googleSheets'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    // Fetch codes from Google Sheet
    const sheetResponse = await fetchCodesFromSheet()
    
    if (!sheetResponse.success) {
      return NextResponse.json({
        success: false,
        code: null,
        error: 'Failed to fetch codes from sheet',
        message: 'OpenAI servers are currently overloaded. Please try again later.'
      })
    }

    // Filter valid codes
    const validCodes = sheetResponse.codes.filter(isValidCodeFormat)

    // Check if there are any codes available
    if (validCodes.length === 0) {
      return NextResponse.json({
        success: false,
        code: null,
        error: 'No codes available',
        message: 'OpenAI servers are currently overloaded. Please try again later.'
      })
    }

    // 10% success rate - 90% will get error even if codes exist
    const shouldSucceed = Math.random() < 0.1
    
    if (!shouldSucceed) {
      return NextResponse.json({
        success: false,
        code: null,
        error: 'Rate limited',
        message: 'No codes available at the moment. Please try again later.'
      })
    }

    // Get a random code from available codes
    const code = getRandomCode(validCodes)
    
    if (!code) {
      return NextResponse.json({
        success: false,
        code: null,
        error: 'Failed to select code',
        message: 'OpenAI servers are currently overloaded. Please try again later.'
      })
    }

    return NextResponse.json({
      success: true,
      code: code,
      message: 'Code retrieved successfully'
    })

  } catch (error) {
    console.error('Error in get-code API:', error)
    return NextResponse.json({
      success: false,
      code: null,
      error: 'Server error',
      message: 'OpenAI servers are currently overloaded. Please try again later.'
    }, { status: 500 })
  }
}
