# 📁 FILE LOCATIONS FOR MANUAL PUSH

## Files in Figma Make Workspace

You need to copy these 2 files from your Figma Make workspace to GitHub:

---

### 1. BrokerAddListing.tsx

**Source Location (Figma Make):**
```
/components/BrokerAddListing.tsx
```

**Destination (GitHub):**
```
src/components/BrokerAddListing.tsx
```

**File Stats:**
- Lines: 1,949
- Size: ~65 KB
- Status: Modified with consent workflow

**Key Changes:**
- Added Client Consent section (lines 37-45)
- Added `loadApprovedClients()` function
- Added consent selection dropdown
- Added inline new client workflow
- Added auto-verification logic
- Shows only VERIFIED (not expired) consents

---

### 2. AdminListingReviews.tsx

**Source Location (Figma Make):**
```
/components/AdminListingReviews.tsx
```

**Destination (GitHub):**
```
src/components/AdminListingReviews.tsx
```

**File Stats:**
- Lines: 816
- Size: ~28 KB
- Status: Modified with consent review modal

**Key Changes:**
- Added `consentDialogOpen` state
- Added `selectedConsent` state
- Added consent review modal with document viewer
- Added status filter tabs
- Added three admin actions: Approve, Request Revision, Reject
- Full audit trail with reviewer tracking

---

## How to Access Files in Figma Make

1. Open Figma Make workspace
2. Click "Files" in left sidebar
3. Navigate to `/components/`
4. Click on each file name to view content
5. Copy complete file content
6. Paste into your local repository

---

## Quick Copy-Paste Method

### Option A: Via Figma Make UI
```
1. Click file in Figma Make
2. Ctrl+A (Select All)
3. Ctrl+C (Copy)
4. Paste into your local file
```

### Option B: Via Download (if available)
```
1. Right-click file in Figma Make
2. Select "Download" (if available)
3. Save to correct location in your repo
```

---

## Verify Before Pushing

```bash
# Check file exists
ls -la src/components/BrokerAddListing.tsx
ls -la src/components/AdminListingReviews.tsx

# Check line count matches
wc -l src/components/BrokerAddListing.tsx
# Should show: 1949

wc -l src/components/AdminListingReviews.tsx  
# Should show: 816

# Check for syntax errors (if you have tsx/eslint)
npx tsc --noEmit src/components/BrokerAddListing.tsx
npx tsc --noEmit src/components/AdminListingReviews.tsx
```

---

## Push Command

```bash
git add src/components/BrokerAddListing.tsx src/components/AdminListingReviews.tsx

git commit -m "feat: Add consent workflow to listing components

Modified Components:
- BrokerAddListing.tsx (1,949 lines): Added client consent selection with auto-verification
- AdminListingReviews.tsx (816 lines): Added consent review modal with admin actions

Features:
- Broker can select verified client consents or add new client inline
- Admin can review, approve, request revision, or reject consents
- Full audit trail with reviewer tracking
- Real-time status updates and notifications"

git push origin feature/consent-workflow
```

---

**PR will auto-update:** https://github.com/JakeMofa/PrivateLandCHostSupa-/pull/6

🎉 **Almost done!**