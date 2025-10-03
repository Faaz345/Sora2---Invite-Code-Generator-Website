'use client'

export default function BackgroundVideo() {
  return (
    <div className="background-video-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
        onError={(e) => {
          // Hide video if it fails to load
          e.currentTarget.style.display = 'none'
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
        <source src="/background.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
