# Changelog

All notable changes to Yashavee Cloud Kitchen project will be documented in this file.

## [2.0.0] - 2025-06-29

### Added
- Complete migration from Replit Agent to standard Replit environment
- PostgreSQL database integration with Drizzle ORM
- Production-optimized storage implementation for Vercel deployment
- Automatic menu data seeding with 39 items across 5 categories
- Shopping cart functionality with real-time item management
- Cart integration in navigation with item count badges
- Complete South Indian menu section (8 authentic dishes)
- Enhanced Chinese menu with new items (Double Egg Roll, Chicken Lollipop, etc.)
- Advanced error handling and fallback mechanisms
- Vercel deployment configuration with serverless optimization

### Changed
- Restaurant name updated to "Yashavee Cloud Kitchen"
- Delivery coverage updated to "All over Bhopal - Complete city coverage"
- All menu item prices optimized (under ₹300, ₹200, and ₹100 categories)
- Database storage implementation with automatic environment detection
- Improved security practices with proper client/server separation

### Fixed
- Vercel deployment food items display issue
- Database connection handling in serverless environment
- Menu items not showing on production deployments
- Accessibility warnings in modal components
- All image URLs verified as working Unsplash links

### Technical Improvements
- Implemented DatabaseStorage class with connection pooling
- Added VercelStorage for production reliability
- Enhanced API error handling and logging
- Optimized for serverless function limitations
- Database migration and seeding automation

## [1.0.0] - 2025-06-28

### Added
- Initial project setup with React 18 and TypeScript
- Express.js backend with RESTful API
- 32 menu items across 4 categories (Indian, Chinese, Italian, Desserts)
- 3D card effects with perspective transforms
- Glass morphism effects and shimmer animations
- Responsive design with mobile-first approach
- Image loading with error fallbacks and lazy loading

### Features
- Modern web application with Tailwind CSS
- Complete shadcn/ui component library
- Framer Motion animations
- Vite build system with hot module replacement
- In-memory storage for development