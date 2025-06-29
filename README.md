# Yashavee Cloud Kitchen

Premium cloud kitchen in Bhopal specializing in Indian, Chinese, Italian cuisine, and desserts.

## Features

✅ **Complete Menu System**
- 39+ dishes across 5 categories (Indian, Chinese, Italian, South Indian, Desserts)
- Real-time pricing and availability
- High-quality food images

✅ **Modern Web Application**
- React 18 with TypeScript
- Responsive design for all devices
- Smooth animations with Framer Motion

✅ **Production Ready**
- PostgreSQL database integration
- Secure client/server separation
- RESTful API architecture

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Database**
   ```bash
   npm run db:push
   npx tsx server/seed.ts
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/menu` - All menu items
- `GET /api/menu/:category` - Items by category
- `GET /api/featured` - Featured dishes

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build**: Vite with HMR

## Categories

- **Indian**: Traditional Thali, Butter Chicken, Paneer Makhani, Biryani
- **Chinese**: Schezwan Noodles, Manchurian, Fried Rice, Chicken Chilli
- **Italian**: Margherita Pizza, Pasta Alfredo, Lasagna, Risotto
- **South Indian**: Masala Dosa, Idli Sambar, Rava Upma, Uttapam
- **Desserts**: Gulab Jamun, Tiramisu, Cheesecake, Rasmalai

## Deployment

Ready for deployment on Replit with:
- Environment-based database configuration
- Production-optimized build
- Secure API endpoints

---

**Yashavee Cloud Kitchen** - Delivering quality food across Bhopal 🍽️