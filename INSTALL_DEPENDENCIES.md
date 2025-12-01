# 📦 Install Dependencies

## Required Package

Your PrivateLand backend needs the Supabase JavaScript client library.

### Add to package.json

Open your `package.json` and add this to the `dependencies` section:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0"
  }
}
```

### Or Install via npm

```bash
npm install @supabase/supabase-js
```

### Then Install All Dependencies

```bash
npm install
```

---

## ✅ That's It!

The Supabase client is the only new dependency needed for the backend integration.

All other packages (React, Vite, Tailwind, etc.) are already in your project.

---

## Next Steps

1. ✅ Install `@supabase/supabase-js`
2. 🔑 Update `utils/supabase/info.tsx` with your Supabase credentials
3. 📊 Apply database schema in Supabase SQL Editor
4. 👤 Create admin account
5. 🚀 Launch!

See `BACKEND_INTEGRATION_COMPLETE.md` for full setup instructions.
