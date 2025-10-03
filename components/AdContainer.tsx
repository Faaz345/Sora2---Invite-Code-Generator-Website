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
        {adConfig.videoAds.enabled ? (
          <div id={`video-ad-${adConfig.videoAds.zoneId}`} className="min-h-[300px] rounded-xl overflow-hidden" />
        ) : (
          <div className="bg-gradient-to-br from-violet-600/30 to-blue-600/30 rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ad Loading...</h3>
                <p className="text-white/70 text-sm">Configure video ads in lib/adConfig.ts</p>
              </div>
            </div>
          </div>
        )}
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
