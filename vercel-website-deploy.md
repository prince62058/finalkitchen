# Vercel Website से Deploy करने का Guide

## Step 1: Vercel Account बनाएं

1. **https://vercel.com** पर जाएं
2. "Sign Up" पर click करें
3. GitHub, Google, या Email से account बनाएं

## Step 2: GitHub Repository Setup

1. **GitHub पर जाएं**: https://github.com
2. **New Repository** बनाएं:
   - Repository name: `yashavee-cloud-kitchen`
   - Public या Private select करें
   - "Create repository" click करें

3. **Local code को GitHub पर push करें**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/yashavee-cloud-kitchen.git
   git push -u origin main
   ```

## Step 3: Vercel में Project Import करें

1. **Vercel Dashboard** पर जाएं: https://vercel.com/dashboard
2. **"New Project"** button click करें
3. **"Import Git Repository"** section में:
   - GitHub account connect करें
   - `yashavee-cloud-kitchen` repository select करें
   - "Import" click करें

## Step 4: Build Settings Configure करें

Vercel automatically detect करेगा आपके project settings:
- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

## Step 5: Environment Variables Add करें

Deploy करने से पहले:

1. **"Environment Variables"** section में click करें
2. **Add करें**:
   - **Name**: `DATABASE_URL`
   - **Value**: आपका production database URL
   - **Environment**: Production

3. **Add करें**:
   - **Name**: `NODE_ENV`
   - **Value**: `production`
   - **Environment**: Production

## Step 6: Database Setup (Free Options)

### Option A: Neon Database (Recommended)
1. **https://neon.tech** पर जाएं
2. **Sign up** करें
3. **New Project** create करें
4. **Connection String** copy करें:
   ```
   postgresql://username:password@hostname/database
   ```
5. Vercel में `DATABASE_URL` में paste करें

### Option B: Supabase
1. **https://supabase.com** पर जाएं
2. **New project** create करें
3. **Database URL** copy करें
4. Vercel में add करें

## Step 7: Deploy करें

1. **"Deploy"** button click करें
2. Vercel automatically build और deploy करेगा
3. **Deployment URL** मिलेगा जैसे:
   ```
   https://yashavee-cloud-kitchen.vercel.app
   ```

## Step 8: Post-Deployment Setup

Deploy होने के बाद database में menu items add करने के लिए:

1. **Vercel Dashboard** में आपके project पर जाएं
2. **Settings** → **Functions** → **Console** में जाएं
3. या local machine से:
   ```bash
   DATABASE_URL="your_production_url" npx tsx server/seed.ts
   ```

## Step 9: Custom Domain (Optional)

1. **Vercel Dashboard** में project settings में जाएं
2. **"Domains"** section में custom domain add करें
3. DNS settings update करें

## Troubleshooting

### Common Issues:
1. **Build failed**: Package.json में dependencies check करें
2. **Database connection failed**: Environment variables सही हैं check करें
3. **404 errors**: Vercel.json routing configuration check करें

### Support:
- Vercel Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

## Final Result

आपका website live होगा:
- **Homepage**: https://your-project.vercel.app
- **Menu API**: https://your-project.vercel.app/api/menu
- **Featured API**: https://your-project.vercel.app/api/featured

Deploy complete होने के बाद आपका Yashavee Cloud Kitchen website live हो जाएगा!