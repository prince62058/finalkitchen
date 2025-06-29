# Vercel Deployment Guide - Yashavee Cloud Kitchen

## Pre-deployment Setup

### 1. Build करें
```bash
npm run build
```

### 2. Environment Variables Setup
Vercel dashboard में ये environment variables add करें:
- `DATABASE_URL` - आपका PostgreSQL database URL
- `NODE_ENV` - production

## Vercel पर Deploy करने के Steps

### Method 1: Vercel CLI (Recommended)

1. **Vercel CLI Install करें**
```bash
npm i -g vercel
```

2. **Login करें**
```bash
vercel login
```

3. **Deploy करें**
```bash
vercel --prod
```

### Method 2: GitHub Integration

1. **GitHub पर code push करें**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. **Vercel Dashboard पर जाएं**
   - https://vercel.com/dashboard
   - "New Project" click करें
   - GitHub repository select करें

3. **Environment Variables add करें**
   - Settings → Environment Variables
   - `DATABASE_URL` add करें
   - `NODE_ENV=production` add करें

4. **Deploy करें**
   - "Deploy" button click करें

## Deployment Commands (Terminal में)

```bash
# Vercel CLI install
npm install -g vercel

# Login
vercel login

# Project deploy (first time)
vercel

# Production deploy
vercel --prod

# Environment variables set करने के लिए
vercel env add DATABASE_URL
vercel env add NODE_ENV
```

## Database Setup (Production)

Vercel पर deploy करने से पहले production database setup करें:

### Option 1: Neon Database (Free)
1. https://neon.tech पर account बनाएं
2. New project create करें
3. Connection string copy करें
4. Vercel में `DATABASE_URL` set करें

### Option 2: Supabase (Free)
1. https://supabase.com पर account बनाएं
2. New project create करें
3. Database connection string copy करें
4. Vercel में `DATABASE_URL` set करें

## Post-deployment Steps

1. **Database tables create करें**
```bash
# अपने local machine से
DATABASE_URL="your_production_db_url" npm run db:push
```

2. **Database seed करें**
```bash
# Production database में menu items add करने के लिए
DATABASE_URL="your_production_db_url" npx tsx server/seed.ts
```

## Troubleshooting

### Common Issues:

1. **Food items नहीं दिख रहे**
   - Database properly seeded है check करें
   - Environment variables सही set हैं check करें

2. **API endpoints काम नहीं कर रहे**
   - `/api/` routes properly configured हैं vercel.json में check करें

3. **Build fail हो रहा है**
   - Dependencies properly installed हैं check करें
   - TypeScript errors नहीं हैं check करें

## Verification Steps

Deploy के बाद ये URLs test करें:
- `https://your-app.vercel.app/` - Homepage
- `https://your-app.vercel.app/api/menu` - Menu API
- `https://your-app.vercel.app/api/featured` - Featured items API

## Production URLs Structure

```
Production URL: https://yashavee-cloud-kitchen.vercel.app
API Base: https://yashavee-cloud-kitchen.vercel.app/api
Menu: https://yashavee-cloud-kitchen.vercel.app/api/menu
Featured: https://yashavee-cloud-kitchen.vercel.app/api/featured
```

आपका Yashavee Cloud Kitchen अब Vercel पर deploy होने के लिए ready है! 🚀