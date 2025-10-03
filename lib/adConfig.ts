// Ad Network Configuration
// Replace these with your actual ad network IDs after signing up

export const adConfig = {
  // Google AdSense
  googleAdSense: {
    enabled: false,
    clientId: 'ca-pub-XXXXXXXXXXXXXXXXX', // Your AdSense publisher ID
  },

  // PropellerAds
  propellerAds: {
    enabled: false,
    zoneId: 'XXXXXXX', // Your PropellerAds zone ID
    interstitialId: 'XXXXXXX', // For interstitial ads
  },

  // Adsterra
  adsterra: {
    enabled: false,
    publisherId: 'XXXXXXX', // Your Adsterra publisher ID
    popunderId: 'XXXXXXX', // For popunder ads
  },

  // AdMaven / ExoClick (Video Ads)
  videoAds: {
    enabled: false,
    zoneId: 'XXXXXXX', // Your video ad zone ID
  },

  // A-Ads (Anonymous Ads)
  aAds: {
    enabled: false,
    zoneId: 'XXXXXXX', // Your A-Ads zone ID
  },
}

// Ad placement strategy
export const adStrategy = {
  // Show interstitial on "Get Codes" button click
  showInterstitialOnGetCodes: true,
  
  // Show popunder on first interaction
  showPopunderOnFirstClick: true,
  
  // Show banner ads in code display
  showBannerInResults: true,
  
  // Minimum time between ads (in seconds)
  adCooldown: 60,
}
