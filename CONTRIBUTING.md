# Contributing to Yashavee Cloud Kitchen

Thank you for considering contributing to Yashavee Cloud Kitchen! This document provides guidelines for contributing to the project.

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Git for version control

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/yashavee-cloud-kitchen.git
   cd yashavee-cloud-kitchen
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   └── lib/         # Utility functions and API
├── server/          # Express.js backend
│   ├── routes.ts    # API route definitions
│   ├── storage.ts   # Data storage implementations
│   └── db.ts        # Database configuration
├── shared/          # Shared types and schemas
│   └── schema.ts    # Database and validation schemas
└── vercel.json      # Deployment configuration
```

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper types for all API responses
- Use strict type checking

### React Components
- Use functional components with hooks
- Implement proper error boundaries
- Follow component composition patterns

### API Development
- Use proper HTTP status codes
- Implement error handling middleware
- Validate request/response data with Zod schemas

## Testing

### Running Tests
```bash
npm test
```

### Test Coverage
- Write tests for all new API endpoints
- Test React components with user interactions
- Ensure edge cases are covered

## Database Changes

### Adding New Menu Items
1. Update the schema in `shared/schema.ts`
2. Add data to appropriate storage implementation
3. Test locally before submitting

### Schema Migrations
- Use Drizzle Kit for database migrations
- Document breaking changes in pull requests

## Deployment

The project is configured for Vercel deployment:
- Production builds are automatic on main branch
- Environment variables are managed through Vercel dashboard
- All deployments use production-optimized storage

## Pull Request Process

1. Create a feature branch from main
2. Make your changes following the style guidelines
3. Test your changes locally
4. Submit a pull request with:
   - Clear description of changes
   - Screenshots for UI changes
   - Test results

## Reporting Issues

When reporting bugs or requesting features:
- Use the GitHub issue templates
- Provide detailed reproduction steps
- Include environment information
- Add screenshots for UI issues

## Menu Data Guidelines

### Adding New Dishes
- Use authentic food images from licensed sources
- Provide accurate pricing in INR
- Include proper category classification
- Write appetizing but accurate descriptions

### Image Requirements
- Minimum 800x600 resolution
- Food-focused composition
- Professional quality preferred
- Properly licensed images only

## Code Review Criteria

Pull requests will be reviewed for:
- Code quality and style consistency
- Performance implications
- Security considerations
- Test coverage
- Documentation updates

## Release Process

1. Features are merged to main branch
2. Version tags follow semantic versioning
3. Deployment to production is automated
4. Release notes are generated automatically

## Getting Help

- Create an issue for bugs or feature requests
- Check existing documentation first
- Provide minimal reproduction examples

Thank you for contributing to Yashavee Cloud Kitchen!