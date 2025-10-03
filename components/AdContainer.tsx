'use client'

import { useEffect } from 'react'
import { adConfig } from '@/lib/adConfig'

interface AdContainerProps {
  type: 'interstitial' | 'banner' | 'video'
  onAdComplete?: () => void
}

export default function AdContainer({ type, onAdComplete }: AdContainerProps) {
  useEffect(() => {
    // Load ad scripts dynamically based on enabled networks
    loadAdScripts()
  }, [])

  const loadAdScripts = () => {
    // Google AdSense
    if (adConfig.googleAdSense.enabled) {
      const script = document.createElement('script')
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adConfig.googleAdSense.clientId}`
      script.async = true
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }

    // PropellerAds
    if (adConfig.propellerAds.enabled) {
      const script = document.createElement('script')
      script.innerHTML = `
        (function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('puffinads.com',${adConfig.propellerAds.zoneId},document.createElement('script'))
      `
      document.body.appendChild(script)
    }

    // Adsterra
    if (adConfig.adsterra.enabled && type === 'interstitial') {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.innerHTML = `
        atOptions = {
          'key' : '${adConfig.adsterra.publisherId}',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      `
      document.body.appendChild(script)

      const invokeScript = document.createElement('script')
      invokeScript.type = 'text/javascript'
      invokeScript.src = `//www.highperformanceformat.com/${adConfig.adsterra.publisherId}/invoke.js`
      document.body.appendChild(invokeScript)
    }
  }

  if (type === 'banner') {
    return (
      <div className="ad-banner-container my-4">
        {/* Google AdSense Banner */}
        {adConfig.googleAdSense.enabled && (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={adConfig.googleAdSense.clientId}
            data-ad-slot="XXXXXXXXX" // Replace with your ad slot
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
        
        {/* Placeholder when no ads enabled */}
        {!adConfig.googleAdSense.enabled && (
          <div className="bg-white/5 border border-white/20 rounded-xl p-4 text-center text-white/50 text-sm">
            Ad Space - Configure in lib/adConfig.ts
          </div>
        )}
      </div>
    )
  }

  if (type === 'video') {
    return (
      <div className="ad-video-container">
        <div id={`video-ad-${adConfig.videoAds.zoneId}`} className="min-h-[300px] rounded-xl overflow-hidden" />
      </div>
    )
  }

  // Interstitial placeholder
  return (
    <div className="ad-interstitial-container">
      {/* Interstitial ads are loaded via scripts */}
      <div id="interstitial-ad" />
    </div>
  )
}
