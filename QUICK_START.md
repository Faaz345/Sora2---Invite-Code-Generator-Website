# ⚡ Quick Start - Google Sheets Integration

## 🎯 What You Need To Do RIGHT NOW

### ✅ **Step 1: Make Your Sheet Public** (CRITICAL!)

Your sheet: https://docs.google.com/spreadsheets/d/1lnAuNhfWG_FLTy5MfX_FBEsKeIwv_dZSBrNuOzySW4g/edit?usp=sharing

1. Open the sheet ↑
2. Click **"Share"** button (top-right)
3. Click **"Change to anyone with the link"**
4. Set to **"Viewer"**
5. Click **"Done"**

**⚠️ Without this, the website CANNOT read codes from your sheet!**

---

### ✅ **Step 2: Add Some Test Codes**

In Column A of your sheet, add these test codes (one per row):

```
SORA2-TEST-001
SORA2-TEST-002
SORA2-TEST-003
INVITE-ALPHA-123
INVITE-BETA-456
```

---

### ✅ **Step 3: Deploy to Vercel**

```powershell
git add .
git commit -m "Add Google Sheets integration for real invite codes"
git push origin master
```

Vercel will auto-deploy in ~2 minutes.

---

## 🧪 How to Test

### **After deploying:**

1. **Go to your website** (getsora2.vercel.app)
2. **Click "Get Codes"** multiple times (10-20 times)
3. **Expected results**:
   - Most clicks (90%) → Error message
   - Some clicks (10%) → Real code from your sheet
   - Codes should match what you put in Column A ✅

### **Test empty sheet:**
1. Delete all codes from sheet
2. Click "Get Codes"
3. Should always show error ✅

---

## 📊 How It Works

```
User clicks "Get Codes"
         ↓
3-6 second loading animation
         ↓
Website calls /api/get-code
         ↓
API fetches your Google Sheet
         ↓
90% chance → Show error (more ad views!)
10% chance → Show random code from sheet
         ↓
If sheet empty → Always show error
```

---

## 💡 Managing Codes Daily

### **To Add New Codes:**
1. Open your Google Sheet
2. Add code to Column A
3. **That's it!** No deploy needed, works instantly

### **To Remove Codes:**
1. Delete the row from sheet
2. **That's it!** Takes effect immediately

### **To Change Success Rate:**

Edit `app/api/get-code/route.ts` line 35:

```typescript
// 10% success (current)
const shouldSucceed = Math.random() < 0.1

// 20% success (double the success rate)
const shouldSucceed = Math.random() < 0.2

// 5% success (more errors = more ad views)
const shouldSucceed = Math.random() < 0.05
```

Then redeploy with `git push`.

---

## 🚨 Common Issues

### **"Always getting errors even with codes in sheet"**
- ✅ Check sheet is public (Share → Anyone with link)
- ✅ Check codes are in Column A
- ✅ Remember 10% success rate (click 20 times to test)

### **"Sheet changes not showing on website"**
- ✅ Wait 5-10 seconds after editing
- ✅ Hard refresh browser (Ctrl+Shift+R)
- ✅ Check sheet is still public

---

## ✨ Features Summary

✅ **Real codes from Google Sheet**  
✅ **10% success rate** (adjustable)  
✅ **90% see errors** → More ad clicks → More revenue 💰  
✅ **Empty sheet** → Always shows error  
✅ **Real-time updates** → No redeploy needed  
✅ **Easy to manage** → Just edit the spreadsheet  

---

## 📁 What Was Added

- `lib/googleSheets.ts` - Fetches codes from your sheet
- `app/api/get-code/route.ts` - API endpoint for codes
- `app/page.tsx` - Updated to use real codes
- `GOOGLE_SHEETS_SETUP.md` - Full documentation
- `QUICK_START.md` - This file

---

## 🎉 You're Done!

1. ✅ Make sheet public
2. ✅ Add test codes
3. ✅ Deploy with `git push`
4. ✅ Test by clicking "Get Codes" 10-20 times
5. ✅ Add real codes when ready

**Full docs**: See `GOOGLE_SHEETS_SETUP.md` for detailed info.
