# Database Setup Guide for Yashavee Cloud Kitchen

Your project is currently running with in-memory storage, which works for development but doesn't persist data between restarts. Here are options to add a real database:

## Option 1: Neon Database (Recommended - Free Tier Available)

1. Go to [neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project
4. Copy the connection string from your dashboard
5. Add it as an environment variable in Replit:
   - Go to your Replit project settings
   - Add a new secret named `DATABASE_URL`
   - Paste your Neon connection string as the value

## Option 2: Supabase Database (Free Tier Available)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string (make sure to replace [YOUR-PASSWORD])
5. Add it as `DATABASE_URL` in your Replit secrets

## Option 3: Railway (Simple Setup)

1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Add a PostgreSQL database
4. Copy the connection string from the database tab
5. Add it as `DATABASE_URL` in your Replit secrets

## After Adding Database

Once you add the `DATABASE_URL` secret:

1. Your project will automatically switch from in-memory to database storage
2. Run `npm run db:push` to create the database tables
3. The app will automatically seed the database with menu items
4. Restart your application to see the changes

## Current Status

- ✅ Project runs successfully with in-memory storage
- ✅ All 39 menu items load properly
- ✅ Cart and ordering system works
- ⏳ Database connection ready to be configured
- ⏳ Database will be automatically seeded when connected

## Benefits of Adding Database

- **Data Persistence**: Orders and menu changes will be saved
- **Production Ready**: Can handle real customer orders
- **Order Tracking**: Customers can track their order status
- **Admin Panel**: Full order management capabilities
- **Scalability**: Can handle multiple concurrent users

Choose any of the database options above and I'll help you complete the setup!