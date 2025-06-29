# Render Deployment Guide - Yashavee Cloud Kitchen

## Step 1: GitHub Repository बनाएं

1. **GitHub पर जाएं**: github.com
2. **Sign up/Login** करें
3. **New Repository** बनाएं:
   - Repository name: `yashavee-cloud-kitchen`
   - Public या Private (दोनों free हैं)
   - **Don't** initialize with README
   - "Create Repository" करें

## Step 2: Code को GitHub पर Upload करें

### Option A: Web Interface से
1. "uploading an existing file" link पर click करें
2. सारी project files को drag & drop करें
3. Commit message लिखें: "Initial deployment"
4. "Commit changes" करें

### Option B: Git Commands (अगर आपके पास Git है)
```bash
git init
git add .
git commit -m "Initial deployment"
git remote add origin https://github.com/yourusername/yashavee-cloud-kitchen.git
git push -u origin main
```

## Step 3: Render पर Web Service बनाएं

1. **Render.com** पर जाएं
2. **Sign up** करें (GitHub account से)
3. **"New +"** → **"Web Service"** पर click करें
4. **GitHub repository** connect करें
5. Repository select करें: `yashavee-cloud-kitchen`

## Step 4: Service Configuration

**Build & Deploy Settings:**
- **Name**: `yashavee-cloud-kitchen`
- **Environment**: `Node`
- **Region**: `Oregon (US West)` या `Frankfurt (EU)`
- **Branch**: `main`
- **Root Directory**: leave blank
- **Build Command**: `npm install && npx vite build && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`
- **Start Command**: `npm start`

## Step 5: Environment Variables Add करें

**Environment Variables section में:**
1. **DATABASE_URL**: आपका PostgreSQL connection string
2. **NODE_ENV**: `production`
3. **PORT**: `10000` (Render default)

## Step 6: Deploy करें

1. **"Create Web Service"** पर click करें
2. Deploy process शुरू होगा (5-10 मिनट लग सकते हैं)
3. Build logs में progress देख सकते हैं
4. Success के बाद आपको `.onrender.com` URL मिलेगा

## Step 7: Database Setup (Important)

आपका PostgreSQL database अगर Replit का है तो:
1. Render में free PostgreSQL database add करें:
   - Dashboard में "New +" → "PostgreSQL"
   - Database name दें
   - Connection string copy करें
   - Web Service के environment variables में update करें

## Pricing Information

**Render Free Tier:**
- Web Service: Free (limited hours/month)
- PostgreSQL: $7/month (recommended)
- Custom domain: Free
- SSL Certificate: Free

**Render Paid:**
- Web Service: $7/month (24/7 uptime)
- Better performance और no sleep mode

## Important Files Check करें

Project में ये files होनी चाहिए:
- ✅ `package.json` (build scripts के साथ)
- ✅ `server/index.ts` (main server file)
- ✅ Environment variables properly configured
- ✅ Database fallback mechanism (already done)

## Build Error Fix - "vite: not found"

**Problem**: Build fails with error `sh: 1: vite: not found`

**Solution**: Updated build command में `npx` use करें:

**Old (Failing)**: `npm install && npm run build`
**New (Fixed)**: `npm install && npx vite build && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`

**Why this works**:
- `npx vite build` downloads and runs vite directly
- `npx esbuild` bundles the server code properly
- No dependency conflicts

## Troubleshooting

**अगर build अभी भी fail हो:**
1. Updated build command use करें (ऊपर दिया गया)
2. render.yaml file updated होनी चाहिए
3. GitHub repository में latest code push करें

**अगर food items नहीं दिख रहे:**
1. DATABASE_URL environment variable check करें
2. PostgreSQL database running होनी चाहिए
3. Application automatically seed करेगा database

**Environment Variables Required:**
```
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:password@host:port/database
```

आपका Yashavee Cloud Kitchen site live हो जाएगी `yourapp.onrender.com` पर!

क्या आप GitHub repository बनाना चाहेंगे पहले?