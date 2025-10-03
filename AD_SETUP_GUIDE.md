# 🎯 Ad Networks Setup Guide

Your site is now configured to support **multiple ad networks**. Follow these steps to monetize your site:

---

## 📋 Quick Start Checklist

- [ ] Sign up for ad networks (see options below)
- [ ] Get your ad codes/IDs
- [ ] Update `lib/adConfig.ts` with your IDs
- [ ] Enable networks by setting `enabled: true`
- [ ] Test on localhost before deploying

---

## 🌐 Recommended Ad Networks

### 1️⃣ **Google AdSense** (Primary - Best CPM)

**Sign Up:** https://adsense.google.com

**Requirements:**
- Original content
- Website with traffic
- Approval process (1-2 weeks)

**Setup Steps:**
1. Apply and get approved
2. Copy your Publisher ID (looks like `ca-pub-1234567890123456`)
3. In `lib/adConfig.ts`:
   ```typescript
   googleAdSense: {
     enabled: true,
     clientId: 'ca-pub-YOUR-ID-HERE',
   }
   ```

**Earnings:** $1-5 CPM (varies by region)

---

### 2️⃣ **PropellerAds** (Easy Approval)

**Sign Up:** https://propellerads.com

**Best For:** Popunders, Push notifications, Interstitials
**No minimum traffic required!**

**Setup Steps:**
1. Sign up and create a zone
2. Get your Zone ID
3. In `lib/adConfig.ts`:
   ```typescript
   propellerAds: {
     enabled: true,
     zoneId: 'YOUR-ZONE-ID',
     interstitialId: 'YOUR-INTERSTITIAL-ID',
   }
   ```

**Earnings:** $1-3 CPM

---

### 3️⃣ **Adsterra** (High CPM Alternative)

**Sign Up:** https://adsterra.com

**Best For:** Popunders, Direct links, Social bar
**Instant approval!**

**Setup Steps:**
1. Create publisher account
2. Add your website
3. Create ad zones
4. In `lib/adConfig.ts`:
   ```typescript
   adsterra: {
     enabled: true,
     publisherId: 'YOUR-PUBLISHER-ID',
     popunderId: 'YOUR-POPUNDER-ID',
   }
   ```

**Earnings:** $2-4 CPM

---

### 4️⃣ **AdMaven** (Video Ads)

**Sign Up:** https://admaven.com

**Best For:** Video ads before code generation
**Great for code/invite sites!**

**Setup Steps:**
1. Sign up and create video ad zone
2. Get zone ID
3. In `lib/adConfig.ts`:
   ```typescript
   videoAds: {
     enabled: true,
     zoneId: 'YOUR-VIDEO-ZONE-ID',
   }
   ```

**Earnings:** $3-6 CPM

---

### 5️⃣ **A-Ads** (Anonymous/Crypto-Friendly)

**Sign Up:** https://a-ads.com

**Best For:** Sites that may not qualify for AdSense
**No registration required!**

**Setup Steps:**
1. Create ad unit
2. Get zone ID
3. In `lib/adConfig.ts`:
   ```typescript
   aAds: {
     enabled: true,
     zoneId: 'YOUR-ZONE-ID',
   }
   ```

**Earnings:** Paid in Bitcoin

---

## 🎯 Ad Placement Strategy

Your site has **3 ad placements**:

### 1. **Video/Interstitial Ad** (Before Codes)
- Shows when user clicks "Get Codes"
- 5-second countdown
- Located in: `<AdContainer type="video" />`

### 2. **Banner Ad** (After Codes)
- Shows below the generated codes
- Responsive size
- Located in: `<AdContainer type="banner" />`

### 3. **Popunder** (Optional)
- Can be enabled via PropellerAds or Adsterra
- Opens in background on first click
- Higher CPM but more intrusive

---

## 💰 Expected Earnings

**Conservative Estimates:**

| Daily Visitors | Monthly Earnings |
|---------------|------------------|
| 100/day       | $30-60          |
| 500/day       | $150-300        |
| 1,000/day     | $300-600        |
| 5,000/day     | $1,500-3,000    |
| 10,000/day    | $3,000-6,000    |

*Actual earnings depend on traffic quality, GEO, and ad networks used*

---

## 🚀 Recommended Setup for Maximum Revenue

**Use Multiple Networks Together:**

```typescript
// lib/adConfig.ts
export const adConfig = {
  googleAdSense: {
    enabled: true,  // For banner ads
    clientId: 'ca-pub-XXXXX',
  },
  propellerAds: {
    enabled: true,  // For popunders
    zoneId: 'XXXXX',
  },
  videoAds: {
    enabled: true,  // For video ads before codes
    zoneId: 'XXXXX',
  },
}
```

---

## 🔧 Configuration File

Edit: `lib/adConfig.ts`

```typescript
export const adConfig = {
  googleAdSense: {
    enabled: false,  // Set to true after signup
    clientId: 'ca-pub-XXXXXXXXXXXXXXXXX',
  },
  // ... more networks
}
```

---

## 📊 Testing Your Setup

1. **Localhost Testing:**
   ```bash
   npm run dev
   ```

2. **Check Developer Console:**
   - Look for ad script loading
   - Check for errors

3. **Test Flow:**
   - Enter password (F1ZQ23)
   - Click "Get Codes"
   - See ad/countdown
   - Verify codes appear
   - Check banner ad below codes

---

## ⚠️ Important Notes

1. **Don't click your own ads** - Can get you banned
2. **Test in incognito mode** - To see real ad experience
3. **Wait 24-48 hours** - After enabling ads for them to appear
4. **Traffic quality matters** - Better traffic = higher CPM
5. **Mobile traffic** - Usually lower CPM than desktop

---

## 🆘 Troubleshooting

### Ads not showing?
1. Check if `enabled: true` in config
2. Verify your ad network IDs are correct
3. Clear browser cache
4. Wait 24-48 hours after approval
5. Check browser ad blockers

### Low earnings?
1. Increase traffic
2. Target better GEOs (US, UK, CA, AU)
3. Add more ad networks
4. Optimize ad placements

---

## 📈 Next Steps

1. **Get Approved:** Start with PropellerAds or Adsterra (instant approval)
2. **Add Codes:** Update `lib/adConfig.ts` with your IDs
3. **Enable Ads:** Set `enabled: true`
4. **Deploy:** Push to production
5. **Drive Traffic:** Share your site, SEO, social media
6. **Monitor:** Check earnings dashboard daily
7. **Optimize:** Test different ad networks and placements

---

## 💡 Pro Tips

- **Use 2-3 networks together** for maximum revenue
- **PropellerAds + Adsterra** = Good combination for beginners
- **Add AdSense later** once you have steady traffic
- **Video ads** convert best for code generator sites
- **Popunders** have highest CPM but may annoy users

---

**Need help?** Check each ad network's documentation or support.

Good luck with monetization! 💰
