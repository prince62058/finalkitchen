# Yashavee Cloud Kitchen - Deployment Guide

## Option 1: Vercel Deployment (Recommended)

### Step 1: Prepare Your Project
1. Open your project files
2. Create a `package.json` build script (already done)
3. Create a `vercel.json` file for configuration

### Step 2: Create GitHub Repository
1. Go to github.com and login/signup
2. Click "New Repository"
3. Name it "yashavee-cloud-kitchen"
4. Don't initialize with README (we have files already)
5. Click "Create Repository"

### Step 3: Upload Code to GitHub
1. Download all your project files from Replit
2. Open terminal/command prompt on your computer
3. Navigate to your project folder
4. Run these commands:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/yashavee-cloud-kitchen.git
git push -u origin main
```

### Step 4: Deploy on Vercel
1. Go to vercel.com
2. Click "Sign up" and choose "Continue with GitHub"
3. Click "Import Project"
4. Select your GitHub repository
5. Configure these settings:
   - Framework Preset: Other
   - Root Directory: ./ (default)
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Step 5: Add Environment Variables
In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add these variables from your Replit:
   - `DATABASE_URL` (your PostgreSQL connection string)
   - `NODE_ENV` = `production`

### Step 6: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Your site will be live at `yourproject.vercel.app`

## Option 2: Replit Deployment

### Step 1: Use Replit's Deploy Feature
1. In your Replit project, click the "Deploy" button
2. Choose "Static Site" or "Autoscale"
3. Configure domain name
4. Click "Deploy"

## Option 3: Netlify Deployment

### Step 1: Build Your Project
1. Run `npm run build` in your project
2. This creates a `dist` folder

### Step 2: Deploy to Netlify
1. Go to netlify.com
2. Drag and drop your `dist` folder
3. Your site goes live instantly

## Important Notes

- Your database is already configured with fallback data
- All 39 menu items will display correctly
- The site is fully responsive and mobile-friendly
- Contact information shows Bhopal delivery areas

## Troubleshooting

If food items don't show:
1. Check environment variables are set correctly
2. Verify database connection string
3. The app has automatic fallback data as backup

## Custom Domain (Optional)
After deployment, you can add your own domain:
- Vercel: Settings → Domains
- Netlify: Site Settings → Domain Management
- Cost: Usually $10-15/year for .com domain