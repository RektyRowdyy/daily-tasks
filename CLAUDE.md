# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Daily Tasks" is a minimalist, playful Progressive Web App (PWA) for todo management with:
- **Mission**: Making productivity delightful through thoughtful design and playful interactions
- **Architecture**: Separate API and UI components with offline-first approach
- **Technology**: Angular 20 + PWA with comprehensive theming system

## Project Structure

- `API/` - Complete Express.js backend with RESTful todo endpoints
- `UI/` - Angular 20 PWA frontend with comprehensive feature set

### Current Implementation Status
- ✅ **Frontend**: Complete Angular 20 PWA with offline functionality
- ✅ **Design System**: Custom brand kit with light/dark/system themes
- ✅ **PWA Features**: Service worker, offline storage, installable app
- ✅ **Theming**: Dynamic theme switching with system preference detection
- ✅ **Backend**: Complete Express.js API with RESTful endpoints

### Design System
The UI follows a comprehensive brand kit documented in `UI/CLAUDE.md`:
- **Brand**: Minimalist, playful, creative with typewriter aesthetics  
- **Colors**: Dynamic CSS properties supporting light/dark themes
- **Typography**: JetBrains Mono (typewriter) + Caveat (handwritten)
- **Effects**: 3D geometric shadows, playful rotations, satisfying animations
- **Theming**: System-aware theme switching with persistence

## Common Commands

### UI Development
All UI commands should be run from the `UI/` directory:

### Development
- `npm run start` or `ng serve` - Start development server on http://localhost:4200
- `npm run watch` - Build in watch mode for development

### Building
- `npm run build` - Production build (outputs to dist/)
- `ng build` - Standard build command

### Testing
- `npm run test` or `ng test` - Run unit tests with Karma
- No e2e testing framework is currently configured

### Code Generation
- `ng generate component <name>` - Generate new component
- `ng generate --help` - See all available schematics

### API Development  
All API commands should be run from the `API/` directory:

#### Development
- `npm run dev` - Start development server with nodemon on port 3000
- `npm start` - Start production server
- `node server.js` - Direct server start

#### Package Management
- `npm install` - Install dependencies
- `npm install <package>` - Add new dependency

## Architecture

### Angular Configuration
- Uses Angular 20 with standalone components (no NgModule)
- Bootstrap application pattern with `bootstrapApplication()` in main.ts:4
- Application configuration in app.config.ts:6 with providers for routing and error handling
- Uses Angular CLI build system with standard project structure

### Key Files
- `src/main.ts` - Application bootstrap
- `src/app/app.ts` - Root component using Angular signals
- `src/app/app.config.ts` - Application providers configuration
- `src/app/app.routes.ts` - Routing configuration (currently empty)

### Technology Stack

#### Frontend (Angular 20 PWA)
- Angular 20 with TypeScript 5.8
- Uses Angular signals for reactive state management
- Karma + Jasmine for testing
- Prettier configured for HTML formatting with Angular parser

#### Backend (Express.js API)
- Node.js with ES6 modules
- Express.js 5.x with RESTful endpoints
- In-memory data storage (ready for database integration)
- CORS configured for Angular integration
- Helmet for security headers