'use client'

export default function LeftLogo() {
  return (
    <div className="left-logo-container">
      <img 
        src="/left-logo.png" 
        alt="Left Logo" 
        className="h-10 md:h-12 w-auto"
        onError={(e) => {
          // Hide image if left-logo.png doesn't exist
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}
