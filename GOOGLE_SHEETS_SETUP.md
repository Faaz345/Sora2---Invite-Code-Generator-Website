# 📊 Google Sheets Integration Setup Guide

## Overview
Your website now fetches real invite codes from your Google Sheet. When you add codes to the sheet, they'll be displayed on your site. When the sheet is empty, users see the "servers overloaded" error.

**Your Google Sheet**: https://docs.google.com/spreadsheets/d/1lnAuNhfWG_FLTy5MfX_FBEsKeIwv_dZSBrNuOzySW4g/edit?usp=sharing

---

## 🚀 Step 1: Make Your Google Sheet Public

### **CRITICAL: The sheet MUST be publicly accessible for the website to read it**

1. **Open your Google Sheet** (link above)

2. **Click the "Share" button** (top-right corner)

3. **Change access settings**:
   - Click "Change to anyone with the link"
   - Select **"Anyone with the link"**
   - Set permission to **"Viewer"** (NOT Editor)
   - Click "Done"

4. **Verify it's public**:
   - Open the sheet link in an incognito/private browser window
   - If you can see it without logging in, it's public ✅

---

## 📝 Step 2: Add Invite Codes to Sheet

### **Format:**
- **Column A**: Put one invite code per row
- **First row**: Can be "Codes" as header (will be ignored) OR start directly with codes
- **No empty rows** between codes

### **Example Sheet Layout:**

```
| A                |
|------------------|
| Codes            | ← Optional header (will be ignored)
| SORA2-ABC123     | ← Code 1
| INVITE-XYZ789    | ← Code 2
| OPENAI-DEF456    | ← Code 3
| ...              |
```

### **Code Requirements:**
- **Length**: 4-20 characters
- **Format**: Letters, numbers, hyphens (-), underscores (_)
- **Case**: Any (uppercase recommended for visibility)

---

## ⚙️ How It Works

### **Success Rate: 10%**
- Even when codes exist, only **10% of users** get a code
- The other **90% see errors** to maximize ad impressions
- This is intentional for revenue optimization

### **Code Selection:**
- System picks a **random code** from your sheet
- Each user who succeeds gets a random code
- Codes can be reused (no automatic removal)

### **Error Scenarios:**
1. **Sheet is empty** → "OpenAI servers overloaded"
2. **90% probability** → "No codes available" (even if codes exist)
3. **Sheet not public** → "OpenAI servers overloaded"
4. **Network error** → "OpenAI servers overloaded"

---

## 🎯 Managing Your Codes

### **Adding Codes:**
1. Open your Google Sheet
2. Add new codes to Column A (one per row)
3. Codes appear on website **immediately** (no deploy needed)

### **Removing Codes:**
1. Delete the row with the code you want to remove
2. Changes take effect **immediately**

### **Updating Codes:**
1. Edit the code directly in the cell
2. Updated code shows **immediately**

### **Benefits:**
- ✅ **No website redeployment** needed
- ✅ **Real-time updates** (changes reflect instantly)
- ✅ **Easy management** (just edit the sheet)
- ✅ **Full control** over which codes to show

---

## 🔧 Advanced Configuration

### **Change Success Rate:**

**File**: `app/api/get-code/route.ts` (Line 35)

```typescript
// Current: 10% success rate
const shouldSucceed = Math.random() < 0.1

// Examples:
const shouldSucceed = Math.random() < 0.2  // 20% success
const shouldSucceed = Math.random() < 0.05 // 5% success
const shouldSucceed = Math.random() < 0.5  // 50% success
```

### **Change Sheet Name:**

If your sheet tab is named something other than "Sheet1":

**File**: `lib/googleSheets.ts` (Line 5)

```typescript
const SHEET_NAME = 'YourSheetName' // Change this
```

### **Use Multiple Columns:**

To read codes from columns A, B, C:

**File**: `lib/googleSheets.ts` (Line 6)

```typescript
const RANGE = 'A:C' // Reads columns A, B, and C
```

### **Custom Code Validation:**

**File**: `lib/googleSheets.ts` (Lines 68-75)

Modify the `isValidCodeFormat` function to match your code format.

---

## 🧪 Testing Your Setup

### **Test 1: Verify Sheet is Public**
1. Open sheet link in incognito window
2. Should see content without login ✅

### **Test 2: Test with Codes**
1. Add 3-5 codes to your sheet
2. Click "Get Codes" on your website multiple times
3. Should see:
   - Errors most of the time (90%)
   - Real codes occasionally (10%)
   - Codes match what's in your sheet ✅

### **Test 3: Test with Empty Sheet**
1. Delete all codes from sheet
2. Click "Get Codes" on website
3. Should always see error ✅

### **Test 4: Test Code Updates**
1. Add a unique code like "TEST123ABC"
2. Keep clicking "Get Codes"
3. Eventually you'll see "TEST123ABC" ✅

---

## 🚨 Troubleshooting

### **Problem: Always seeing errors (even with codes in sheet)**

**Solutions:**
1. **Check sheet is public**:
   - Go to Share → "Anyone with the link" → "Viewer"
   
2. **Check codes are in Column A**:
   - Codes must be in the first column
   
3. **Check code format**:
   - 4-20 characters
   - Only letters, numbers, hyphens, underscores
   
4. **Check browser console**:
   - Press F12 → Console tab
   - Look for error messages

5. **Remember the 10% rate**:
   - Click 10-20 times to see a code

### **Problem: Sheet changes not reflecting on website**

**Solutions:**
1. **Wait 5-10 seconds** after editing sheet
2. **Hard refresh** website (Ctrl+Shift+R or Cmd+Shift+R)
3. **Clear browser cache**
4. **Check sheet is still public**

### **Problem: Codes showing with quotes like "CODE123"**

This is normal CSV parsing. Codes are displayed without quotes on the website.

### **Problem: Can't access sheet from API**

**Solutions:**
1. Verify sheet is public (Share → Anyone with link)
2. Check Sheet ID in `lib/googleSheets.ts` matches your URL
3. Ensure no firewall blocking Google Sheets

---

## 📊 Example Codes to Add

Here are some example invite codes you can add to test:

```
SORA2-INVITE-001
SORA2-INVITE-002
SORA2-INVITE-003
OPENAI-2025-ABC
OPENAI-2025-XYZ
ALPHA-TEST-123
BETA-ACCESS-456
EARLY-BIRD-789
VIP-USER-2025
PREMIUM-CODE-1
```

---

## 🎉 Summary

✅ **Real codes** from your Google Sheet  
✅ **10% success rate** (adjustable)  
✅ **Real-time updates** (no deploy needed)  
✅ **Empty sheet** → shows error  
✅ **Easy management** via spreadsheet  
✅ **Maximum ad revenue** (90% see errors = more clicks)  

---

## 📁 Files Modified

- ✅ `lib/googleSheets.ts` - Sheet integration logic
- ✅ `app/api/get-code/route.ts` - API endpoint for fetching codes
- ✅ `app/page.tsx` - Updated to use API instead of random generation

---

**Next Step**: Make your sheet public and add some codes to test! 🚀
