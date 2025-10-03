'use client'

import { useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react'

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
}

const ALLOWED_CHARS = /^[A-Z0-9]$/

export default function OtpInput({ value, onChange, length = 6 }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const slots = Array.from({ length }, (_, i) => value[i] || '')

  useEffect(() => {
    // Focus first empty slot on mount
    const firstEmptyIndex = slots.findIndex(s => !s)
    if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
      inputRefs.current[firstEmptyIndex]?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Update inputs when value changes externally (e.g., from generate button)
    slots.forEach((char, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i]!.value = char
      }
    })
    // Focus last slot when all filled externally
    if (value.length === length) {
      inputRefs.current[length - 1]?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, length])

  const handleInput = (index: number, inputValue: string) => {
    const char = inputValue.toUpperCase().slice(-1)
    
    if (char && !ALLOWED_CHARS.test(char)) {
      return
    }

    const newValue = slots.map((s, i) => (i === index ? char : s)).join('')
    onChange(newValue)

    // Move to next input if char was entered
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const currentValue = slots[index]
      
      if (currentValue) {
        // Clear current slot
        const newValue = slots.map((s, i) => (i === index ? '' : s)).join('')
        onChange(newValue)
      } else if (index > 0) {
        // Move to previous slot and clear it
        const newValue = slots.map((s, i) => (i === index - 1 ? '' : s)).join('')
        onChange(newValue)
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
    } else if (e.key === 'Delete') {
      e.preventDefault()
      const newValue = slots.map((s, i) => (i === index ? '' : s)).join('')
      onChange(newValue)
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').toUpperCase().replace(/[^A-Z0-9]/g, '')
    
    if (pastedData.length > 0) {
      const newValue = pastedData.slice(0, length).padEnd(length, '').split('').map((char, i) => 
        ALLOWED_CHARS.test(char) ? char : slots[i] || ''
      ).join('').slice(0, length)
      
      onChange(newValue)
      
      // Focus appropriate slot
      const focusIndex = Math.min(newValue.length, length - 1)
      setTimeout(() => {
        inputRefs.current[focusIndex]?.focus()
      }, 0)
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  return (
    <div className="flex justify-center gap-2 md:gap-3">
      {slots.map((char, index) => (
        <input
          key={index}
          ref={el => { inputRefs.current[index] = el }}
          type="text"
          inputMode="text"
          maxLength={1}
          value={char}
          onChange={e => handleInput(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={handleFocus}
          className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold rounded-full bg-white/10 border-2 border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-4 focus:ring-violet-400/50 focus:border-violet-400 transition-all backdrop-blur-sm"
          aria-label={`Code digit ${index + 1}`}
        />
      ))}
    </div>
  )
}
