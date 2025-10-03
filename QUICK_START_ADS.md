# 🚀 Quick Start: PropellerAds + Adsterra (Instant Approval)

Start earning TODAY with instant approval ad networks!

---

## 🎯 Option 1: PropellerAds (Recommended First)

### ⚡ Why PropellerAds?
- ✅ **Instant approval** - No waiting!
- ✅ **No minimum traffic** required
- ✅ **$5 minimum payout** (very low!)
- ✅ **Multiple ad formats** - Popunders, Push, Interstitials
- ✅ **Good CPM** - $1-3 average

---

## 📝 PropellerAds Setup (5 Minutes)

### Step 1: Sign Up
1. Go to: **https://propellerads.com**
2. Click **"Sign Up"** (top right)
3. Choose **"Publisher"** (not Advertiser)
4. Fill form:
   ```
   Email: your-email@gmail.com
   Password: (create strong password)
   Country: Your country
   ```
5. Click **"Sign Up"**
6. **Verify email** - Check inbox for verification link

### Step 2: Add Your Website
1. **Log in** to PropellerAds dashboard
2. Click **"Websites"** → **"Add Website"**
3. Fill details:
   ```
   Website URL: https://your-site.vercel.app
   Category: Technology / Entertainment
   Description: Sora 2 invite code generator
   ```
4. Click **"Add Website"**
5. **Status:** Approved instantly! ✅

### Step 3: Create Ad Zones

#### A) Interstitial Ad (Full page before codes)
1. Click **"Ad Zones"** → **"Create New"**
2. Select your website
3. Choose **"Interstitial"**
4. Settings:
   ```
   Name: Interstitial Before Codes
   Position: On Click
   Frequency: 1 per session
   ```
5. Click **"Create"**
6. **Copy Zone ID** (looks like: `1234567`)

#### B) Popunder Ad (Background window)
1. Click **"Create New"** again
2. Choose **"Onclick (Popunder)"**
3. Settings:
   ```
   Name: Popunder Main
   Frequency: 1 per 24 hours
   ```
4. Click **"Create"**
5. **Copy Zone ID**

### Step 4: Add Codes to Your Site

**Edit:** `lib/adConfig.ts`

```typescript
export const adConfig = {
  propellerAds: {
    enabled: true,  // ← Turn ON
    zoneId: '1234567',  // ← Your Popunder Zone ID
    interstitialId: '7654321',  // ← Your Interstitial Zone ID
  },
  // ... other networks
}
```

### Step 5: Add PropellerAds Script

**Edit:** `app/layout.tsx`

Add before `</body>`:

```typescript
<body className={inter.className}>
  <BackgroundVideo />
  
  <div className="min-h-screen flex flex-col">
    {/* Your existing content */}
  </div>
  
  {/* PropellerAds Script */}
  <script dangerouslySetInnerHTML={{
    __html: `
      (function(d,z,s){
        s.src='https://'+d+'/400/'+z;
        try{(document.body||document.documentElement).appendChild(s)}
        catch(e){}
      })('glizauvo.net',${YOUR_ZONE_ID},document.createElement('script'))
    `
  }} />
</body>
```

### Step 6: Deploy & Test
```bash
npm run build
vercel --prod
```

**Test:** Visit your site, click "Get Codes" - Ad should appear!

---

## 🎯 Option 2: Adsterra (Highest CPM)

### ⚡ Why Adsterra?
- ✅ **Instant approval** - Even faster than PropellerAds
- ✅ **$5 minimum payout**
- ✅ **Higher CPM** - $2-4 average
- ✅ **Multiple formats** - Popunders, Social Bar, Native
- ✅ **Weekly payments** available

---

## 📝 Adsterra Setup (5 Minutes)

### Step 1: Sign Up
1. Go to: **https://adsterra.com**
2. Click **"Sign Up"** → **"Publisher"**
3. Fill form:
   ```
   Email: your-email@gmail.com
   Password: (strong password)
   Skype/Telegram: (optional)
   ```
4. Click **"Register"**
5. **Verify email**

### Step 2: Add Website
1. **Log in** to dashboard
2. Click **"Add Site"**
3. Fill details:
   ```
   Website URL: https://your-site.vercel.app
   Category: Tools & Utilities
   Description: Code generator tool
   Traffic: Any amount
   ```
4. Click **"Add"**
5. **Instant approval!** ✅

### Step 3: Create Ad Placements

#### A) Popunder Ad
1. Go to **"Websites"** → Your site
2. Click **"Add Placement"**
3. Choose **"Popunder"**
4. Settings:
   ```
   Name: Main Popunder
   Frequency: 1 per user per day
   ```
5. **Copy Publisher Code** (looks like: `12345`)

#### B) Social Bar (Optional)
1. Click **"Add Placement"** again
2. Choose **"Social Bar"**
3. Position: Bottom or Top
4. **Copy Code**

### Step 4: Add to Your Site

**Edit:** `lib/adConfig.ts`

```typescript
export const adConfig = {
  adsterra: {
    enabled: true,  // ← Turn ON
    publisherId: '12345',  // ← Your Publisher ID
    popunderId: '67890',  // ← Your Popunder ID
  },
  // ... other networks
}
```

### Step 5: Add Adsterra Script

**Add to `app/layout.tsx`:**

```typescript
{/* Adsterra Popunder */}
<script 
  type="text/javascript"
  dangerouslySetInnerHTML={{
    __html: `
      atOptions = {
        'key' : '${YOUR_POPUNDER_KEY}',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `
  }}
/>
<script 
  type="text/javascript" 
  src="//www.topcreativeformat.com/${YOUR_KEY}/invoke.js"
/>
```

### Step 6: Deploy
```bash
npm run build
vercel --prod
```

---

## 💰 Use BOTH for Maximum Earnings!

### Recommended Setup:

```typescript
// lib/adConfig.ts
export const adConfig = {
  propellerAds: {
    enabled: true,
    zoneId: 'YOUR_ZONE',  // Popunder
    interstitialId: 'YOUR_ZONE',  // Interstitial
  },
  adsterra: {
    enabled: true,
    publisherId: 'YOUR_ID',
    popunderId: 'YOUR_ID',
  },
}
```

**Strategy:**
- **PropellerAds:** Interstitial (before codes load)
- **Adsterra:** Popunder (on first click)
- **Result:** 2x earnings! 💰💰

---

## 📊 Expected Earnings (First Month)

### Conservative Estimate:

| Daily Visitors | PropellerAds | Adsterra | Total/Month |
|---------------|--------------|----------|-------------|
| 100/day       | $15          | $20      | **$35**     |
| 500/day       | $75          | $100     | **$175**    |
| 1,000/day     | $150         | $200     | **$350**    |
| 5,000/day     | $750         | $1,000   | **$1,750**  |

*Actual earnings vary by traffic quality and GEO*

---

## 🎯 Payment Info

### PropellerAds:
- **Minimum:** $5
- **Methods:** PayPal, Wire, ePayments, Payoneer
- **Schedule:** NET 30 (monthly)

### Adsterra:
- **Minimum:** $5
- **Methods:** PayPal, Bitcoin, Wire, WebMoney
- **Schedule:** NET 15 or Weekly (choose in settings)

---

## ✅ Quick Checklist

**Before You Start:**
- [ ] Deploy site online (Vercel/Netlify)
- [ ] Site is accessible via URL
- [ ] Login page works (password: F1ZQ23)
- [ ] Code generation works

**PropellerAds:**
- [ ] Sign up at propellerads.com
- [ ] Add website
- [ ] Create Interstitial zone
- [ ] Create Popunder zone
- [ ] Copy Zone IDs
- [ ] Add to `lib/adConfig.ts`
- [ ] Add script to layout
- [ ] Deploy & test

**Adsterra:**
- [ ] Sign up at adsterra.com
- [ ] Add website
- [ ] Create Popunder placement
- [ ] Copy Publisher ID
- [ ] Add to `lib/adConfig.ts`
- [ ] Add script to layout
- [ ] Deploy & test

---

## 🆘 Troubleshooting

### Ads not showing?

**PropellerAds:**
1. Check Zone ID is correct
2. Wait 5-10 minutes after adding
3. Try different browser (no ad blocker)
4. Check console for errors (F12)

**Adsterra:**
1. Verify Publisher ID
2. Make sure site is approved
3. Clear cache and reload
4. Test in incognito mode

### Low earnings?

1. **Drive more traffic** - Share your site
2. **Better traffic sources** - Organic > Paid > Social
3. **Target US/UK/CA** - Higher CPM
4. **Optimize placement** - Test different positions

---

## 🚀 Next Steps

1. **Today:**
   - [ ] Sign up for PropellerAds
   - [ ] Sign up for Adsterra
   - [ ] Add both to your site
   - [ ] Deploy & test

2. **This Week:**
   - [ ] Drive traffic to your site
   - [ ] Monitor earnings dashboard
   - [ ] Test different ad placements
   - [ ] Join related forums/communities

3. **This Month:**
   - [ ] Reach $5 minimum payout
   - [ ] Get first payment
   - [ ] Apply for AdSense (while earning from these)
   - [ ] Scale traffic → Scale earnings

---

## 💡 Pro Tips

1. **Use BOTH networks** - Don't choose, use both!
2. **PropellerAds for interstitials** - Good user experience
3. **Adsterra for popunders** - Higher CPM
4. **Test frequency** - Don't annoy users
5. **Track everything** - Monitor which works better
6. **SEO your site** - Organic traffic = Best earnings
7. **Share on Reddit** - r/InviteCodes, r/codes, etc.
8. **Social media** - Twitter, Discord communities
9. **Keep improving** - Better site = More visitors = More $$$

---

## 📈 Traffic Sources to Explore

**Free Traffic:**
- Reddit (relevant subreddits)
- Discord servers
- Twitter/X
- Facebook groups
- Forums (BlackHatWorld, etc.)
- Telegram channels

**Paid Traffic (Advanced):**
- Google Ads (after getting good ROI)
- Facebook Ads
- Reddit Ads
- Push notification ads

---

## 🎓 Resources

**PropellerAds:**
- Dashboard: https://propellerads.com/ssp
- Support: support@propellerads.com
- Blog: https://propellerads.com/blog

**Adsterra:**
- Dashboard: https://publishers.adsterra.com
- Support: publishers@adsterra.com
- Help: https://adsterra.com/help

---

## ⚡ Start Earning NOW!

1. **PropellerAds:** https://propellerads.com
2. **Adsterra:** https://adsterra.com

Both take **5 minutes** to set up and you can start earning **TODAY**!

No waiting for approval like AdSense. Just sign up, add code, and start making money! 💰

---

**Questions?** 
- PropellerAds: Live chat on their site
- Adsterra: 24/7 support ticket system

**Good luck! 🚀💰**
