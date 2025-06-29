# Yashavee Cloud Kitchen 🍽️

Premium cloud kitchen in Bhopal specializing in Indian, Chinese, Italian cuisine, and desserts.

## 🌟 Features

✅ **Complete Menu System**
- 39+ dishes across 5 categories (Indian, Chinese, Italian, South Indian, Desserts)
- Real-time pricing and availability
- High-quality food images from trusted sources

✅ **Modern Web Application**
- React 18 with TypeScript
- Responsive design for all devices
- Smooth animations with Framer Motion
- Shopping cart with real-time item management

✅ **Production Ready**
- Vercel deployment optimized
- Reliable storage implementation
- Secure client/server separation
- RESTful API architecture

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development**
   ```bash
   npm run dev
   ```

3. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

## 🔧 Environment Setup

### Development
- Runs with optimized in-memory storage
- All 39 menu items loaded automatically

### Production (Vercel)
- Environment variable: `NODE_ENV=production`
- Production-optimized storage implementation
- Automatic menu data loading

## API Endpoints

- `GET /api/menu` - All menu items
- `GET /api/menu/:category` - Items by category
- `GET /api/featured` - Featured dishes

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build**: Vite with HMR

## Menu Categories

- **Indian (9 items)**: Traditional Thali, Butter Chicken, Paneer Makhani, Biryani, Dal Tadka, Palak Paneer, Chicken Tikka Masala, Rajma Chawal, Chole Bhature
- **Chinese (8 items)**: Schezwan Noodles, Manchurian, Fried Rice, Double Egg Roll, Chicken Roll, Chicken Chilli, Chicken Lollipop, Hakka Noodles
- **Italian (8 items)**: Margherita Pizza, Pasta Alfredo, Lasagna, Garlic Bread, Risotto, Penne Arrabbiata, Bruschetta, Gnocchi
- **South Indian (8 items)**: Masala Dosa, Idli Sambar, Rava Upma, Mysore Pak, Uttapam, Vada Sambar, Pongal, Filter Coffee
- **Desserts (6 items)**: Gulab Jamun, Tiramisu, Cheesecake, Ice Cream Sundae, Rasmalai, Chocolate Mousse

## Deployment Status

**Production Ready for Vercel:**
- Optimized for serverless deployment
- Production storage implementation
- Environment-based configuration
- All 39 menu items auto-loaded

**Live Deployment:**
- Easy Vercel deployment with single command
- Automatic environment detection
- Complete menu system functional

## Project Structure

```
├── client/          # React frontend
├── server/          # Express.js backend  
├── shared/          # Shared types and schemas
├── vercel.json     # Vercel deployment config
└── README.md       # Project documentation
```

**Yashavee Cloud Kitchen** - Complete city coverage across Bhopal