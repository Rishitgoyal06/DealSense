# Vercel Deployment Fix Guide

## Problem
Error: "No Next.js version detected"

## Solution
Vercel needs to deploy from the `frontend` directory, not the root.

---

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/dashboard
2. Click on your project: `frontend-inky-five-23`
3. Go to **Settings** → **General**
4. Update **Root Directory**: 
   - Change from: `.` or empty
   - Change to: `frontend`
5. Click **Save**
6. Go to **Deployments** → Click **Redeploy**

---

## Option 2: Deploy via CLI

```bash
# Navigate to frontend directory
cd frontend

# Deploy to Vercel
vercel --prod

# Follow prompts:
# - Link to existing project? Yes
# - Which project? frontend-inky-five-23
```

---

## Option 3: Fresh Deployment

If the above doesn't work, create a new deployment:

```bash
cd frontend
vercel --prod

# When prompted:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? dealsense-frontend
# - Directory? ./ (current directory)
# - Override settings? No
```

---

## Verify Deployment

After deployment, test:

1. **Frontend URL**: https://your-new-url.vercel.app
2. **Login page**: https://your-new-url.vercel.app/login
3. **API connection**: Check browser console for API calls

---

## Update Frontend URL in Backend

If you get a new Vercel URL, update:

**File:** `backend/.env`
```env
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,https://YOUR-NEW-URL.vercel.app
```

And update on Render dashboard.

---

## Files Created

✅ `frontend/vercel.json` - Proper Vercel config
✅ Root `vercel.json` - Updated (but frontend/vercel.json takes priority)

---

**Next Step:** Deploy using Option 1 or 2 above! 🚀
