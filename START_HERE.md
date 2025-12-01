# 🚀 START HERE - PrivateLand Backend Setup

## 🎯 What You Have Now:

✅ **All backend code pushed to GitHub**  
✅ **Database schema ready**  
✅ **50+ helper functions**  
✅ **Authentication system**  
✅ **Payment processing code**  
✅ **Email notification code**  

---

## ⚡ Quick Setup (10 Minutes)

### ☐ **Step 1: Pull the Code** (30 seconds)

```bash
cd /path/to/PrivateLandCHostSupa-
git pull origin main
```

### ☐ **Step 2: Install Dependencies** (1 minute)

```bash
npm install @supabase/supabase-js
npm install
```

### ☐ **Step 3: Create Supabase Project** (2 minutes)

1. Go to https://supabase.com
2. Click "New Project"
3. Name: `privateland`
4. Database Password: (choose a strong one)
5. Region: (closest to you)
6. Click "Create new project"
7. **Wait 2 minutes** for it to spin up

### ☐ **Step 4: Get Your Credentials** (1 minute)

1. Go to: **Settings** (left sidebar) → **API**
2. Copy these two values:
   - **Project URL**: `https://abc123xyz.supabase.co`
   - **anon public key**: `eyJhbG...` (long string)

3. Open `utils/supabase/info.tsx`
4. Replace:

```typescript
export const projectId = 'abc123xyz'; // ← Just the ID part from URL
export const publicAnonKey = 'eyJhbG...'; // ← The full key
```

Example:
```typescript
// If your URL is: https://xyzproject.supabase.co
export const projectId = 'xyzproject';
export const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### ☐ **Step 5: Create Database Tables** (2 minutes)

1. In Supabase Dashboard, click **SQL Editor** (left sidebar)
2. Click "New query"
3. Open your local file: `supabase/migrations/001_initial_schema.sql`
4. **Copy the ENTIRE file** (all 495 lines)
5. **Paste** into SQL Editor
6. Click **RUN** (bottom right)
7. Wait ~10 seconds
8. Should see: ✅ "Success. No rows returned"

### ☐ **Step 6: Create Storage Buckets** (1 minute)

1. In Supabase Dashboard, click **Storage** (left sidebar)
2. Click "Create a new bucket"
3. Create these 3 buckets (one at a time):

   **Bucket 1:**
   - Name: `legal-documents`
   - Public: **NO** (keep private)
   - Click "Create bucket"

   **Bucket 2:**
   - Name: `property-images`
   - Public: **NO** (keep private)
   - Click "Create bucket"

   **Bucket 3:**
   - Name: `profile-photos`
   - Public: **NO** (keep private)
   - Click "Create bucket"

### ☐ **Step 7: Test the App** (30 seconds)

```bash
npm run dev
```

Go to: http://localhost:5173

You should see the homepage! 🎉

### ☐ **Step 8: Create Your Admin Account** (3 minutes)

**8a. Sign Up:**
1. Go to: http://localhost:5173/apply
2. Fill out the access request form
3. Click "Submit Application"
4. You'll see "Request Submitted"

**8b. Get Your User ID:**
1. Go back to Supabase Dashboard
2. Click **Authentication** (left sidebar) → **Users**
3. You should see your email
4. **Copy the UUID** (long string like `a1b2c3d4-...`)

**8c. Make Yourself Admin:**
1. Go to **SQL Editor** in Supabase
2. Paste this SQL (replace with YOUR details):

```sql
INSERT INTO public.users (id, email, first_name, last_name, role, status, payment_verified)
VALUES (
  'PASTE-YOUR-UUID-HERE',
  'your@email.com',
  'Your',
  'Name',
  'admin',
  'active',
  true
);
```

3. Click **RUN**
4. Should see: "Success. 1 row(s) affected"

**8d. Approve Your Request:**

Still in SQL Editor, run:

```sql
UPDATE public.access_requests
SET status = 'approved', reviewed_at = NOW()
WHERE email = 'your@email.com';
```

### ☐ **Step 9: Login!** (30 seconds)

1. Go to: http://localhost:5173/login
2. Email: (your email)
3. Password: (the password you used in Step 8a)
4. Click "Sign In"

**You should see the Admin Dashboard!** 🎉🎉🎉

---

## ✅ What Works Now:

- ✅ User authentication (signup, login, logout)
- ✅ Admin dashboard (14 pages)
- ✅ Role-based access control
- ✅ Database queries
- ✅ Document uploads
- ✅ Support tickets
- ✅ Notifications
- ✅ Analytics
- ✅ Budget gating
- ✅ Broker/client dashboards

---

## 🔐 Optional: Add API Keys (Later)

These are **optional** and can be added later:

### **Stripe (Payment Processing)**

Supabase Dashboard → Settings → Edge Functions → Environment Variables:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Get from: https://dashboard.stripe.com/apikeys

### **Resend (Email Notifications)**

Supabase Dashboard → Settings → Edge Functions → Environment Variables:

```
RESEND_API_KEY=re_...
```

Get from: https://resend.com/api-keys

### **Mapbox (Interactive Maps)**

Add to your `.env` file:

```
VITE_MAPBOX_TOKEN=pk.ey...
```

Get from: https://account.mapbox.com/access-tokens/

---

## 🐛 Troubleshooting:

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### "Invalid API key"
- Check `utils/supabase/info.tsx` has correct values
- Copy fresh credentials from Supabase Dashboard → Settings → API

### "Table 'users' does not exist"
- You skipped Step 5
- Go back and run the SQL migration

### "Row Level Security policy violation"
- You skipped Step 8c
- Go back and create your user in the `users` table

### "Login doesn't work"
- Did you create the auth user (Step 8a)?
- Did you create the database user (Step 8c)?
- Do both use the SAME email?

---

## 📚 More Help:

- **Quick guide**: `BACKEND_INTEGRATION_COMPLETE.md`
- **Detailed explanation**: `README_BACKEND.md`
- **Dependencies**: `INSTALL_DEPENDENCIES.md`

---

## 🎯 Quick Checklist:

- [ ] Pull code from GitHub
- [ ] Install `@supabase/supabase-js`
- [ ] Create Supabase project
- [ ] Copy credentials to `info.tsx`
- [ ] Run SQL migration
- [ ] Create 3 storage buckets
- [ ] Test app (npm run dev)
- [ ] Create admin account
- [ ] Login!

**Total time: 10 minutes**

---

**🎉 You're ready to go!**
