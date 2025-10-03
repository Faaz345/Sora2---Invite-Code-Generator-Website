/**
 * Generates a random code for demo purposes (non-cryptographic)
 * @param length - Length of the code to generate
 * @param charset - Characters to use in the code (excludes ambiguous chars like I, O, 1, 0)
 * @returns Random code string
 */
export function generateCode(
  length: number = 6,
  charset: string = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
): string {
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    result += charset[randomIndex]
  }
  return result
}
