// Google Sheets Integration for Invite Codes
// Sheet URL: https://docs.google.com/spreadsheets/d/1lnAuNhfWG_FLTy5MfX_FBEsKeIwv_dZSBrNuOzySW4g/edit?usp=sharing

const SHEET_ID = '1lnAuNhfWG_FLTy5MfX_FBEsKeIwv_dZSBrNuOzySW4g'
const SHEET_NAME = 'Sheet1' // Change if your sheet has a different name
const RANGE = 'A:A' // Column A contains the codes

export interface SheetResponse {
  success: boolean
  codes: string[]
  error?: string
}

/**
 * Fetches invite codes from Google Sheet
 * The sheet must be publicly accessible (Anyone with link can view)
 */
export async function fetchCodesFromSheet(): Promise<SheetResponse> {
  try {
    // Using the public CSV export endpoint (no API key needed if sheet is public)
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}&range=${RANGE}`
    
    const response = await fetch(csvUrl, {
      method: 'GET',
      cache: 'no-store', // Always fetch fresh data
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
    }

    const csvText = await response.text()
    
    // Parse CSV and extract codes
    const codes = csvText
      .split('\n')
      .map(line => line.replace(/^"|"$/g, '').trim()) // Remove quotes and whitespace
      .filter(code => code.length > 0) // Remove empty lines
      .filter(code => code.toLowerCase() !== 'code' && code.toLowerCase() !== 'codes') // Remove header if exists
    
    return {
      success: true,
      codes: codes
    }
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error)
    return {
      success: false,
      codes: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Gets a random code from the available codes
 */
export function getRandomCode(codes: string[]): string | null {
  if (codes.length === 0) return null
  const randomIndex = Math.floor(Math.random() * codes.length)
  return codes[randomIndex]
}

/**
 * Validates if a code looks like a valid Sora 2 invite code
 * Adjust this based on your code format
 */
export function isValidCodeFormat(code: string): boolean {
  // Basic validation: code should be alphanumeric and reasonable length
  if (!code || code.length < 4 || code.length > 20) return false
  
  // Check if it's mostly alphanumeric (allowing some special chars like - or _)
  const validPattern = /^[A-Z0-9\-_]+$/i
  return validPattern.test(code)
}
