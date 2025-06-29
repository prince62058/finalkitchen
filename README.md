# Yashavee Cloud Kitchen

A modern, full-stack web application for Yashavee Cloud Kitchen - a premium cloud kitchen in Bhopal specializing in Indian, Chinese, Italian cuisine, and desserts.

## Features

- **Complete Menu Showcase**: 39+ authentic dishes across multiple cuisines
- **Responsive Design**: Optimized for all devices
- **Interactive Shopping Cart**: Real-time cart management
- **Database Integration**: PostgreSQL with fallback mechanisms
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Smooth Animations**: Enhanced user experience with Framer Motion

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build Tool**: Vite
- **Deployment**: Ready for Render, Vercel, or Netlify

## Menu Categories

- **Indian Cuisine**: Traditional Thali, Butter Chicken, Biryani, Paneer dishes
- **Chinese**: Schezwan Noodles, Manchurian, Fried Rice, Chicken specialties  
- **Italian**: Margherita Pizza, Pasta Alfredo, Lasagna, Garlic Bread
- **Desserts**: Gulab Jamun, Tiramisu, Cheesecake, Traditional sweets
- **South Indian**: Masala Dosa, Idli Sambar, Filter Coffee

## Local Development

```bash
npm install
npm run dev
```

## Deployment on Render

1. **Create GitHub Repository**
2. **Connect to Render**:
   - Go to render.com
   - Create new Web Service
   - Connect GitHub repository
3. **Configure**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. **Add Environment Variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV`: production

## Database

The application uses PostgreSQL with automatic seeding of menu items. Database connection includes fallback mechanisms for reliability.

## Contact Information

- **Location**: Bhopal, Madhya Pradesh
- **Delivery**: All over Bhopal - Complete city coverage
- **Specialization**: Indian, Chinese, Italian cuisine, and desserts

## License

MIT License