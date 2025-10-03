'use client'

export default function Logo() {
  return (
    <div className="logo-container">
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="h-16 md:h-20 w-auto"
        onError={(e) => {
          // Hide image if logo.png doesn't exist
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}
