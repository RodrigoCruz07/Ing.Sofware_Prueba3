# Replit.md

## Overview

This is a full-stack web application built with a modern tech stack, featuring a React frontend with TypeScript, an Express.js backend, and PostgreSQL database integration. The application appears to be a customs/border management system with authentication, dashboards for administrators and certificate management, and a public information page.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling
- **Middleware**: Custom logging, JSON parsing, and error handling

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with connection pooling
- **Migrations**: Drizzle Kit for schema management
- **Schema Location**: `shared/schema.ts` for type sharing between frontend and backend

## Key Components

### Authentication System
- Login endpoint at `/api/auth/login`
- Demo credentials for testing (admin@aduana.com/admin123, usuario@empresa.com/password123)
- Role-based access control (admin vs client roles)
- In-memory storage implementation with interface for future database integration

### Dashboard Components
- **Admin Dashboard**: Statistics overview, recent operations, user management features
- **Certificate Dashboard**: Certificate management with status tracking, document handling
- **Home Page**: Public information display with news and announcements

### UI Component Library
- Complete shadcn/ui implementation with 40+ components
- Radix UI primitives for accessibility
- Custom theming with CSS variables
- Responsive design patterns

## Data Flow

1. **Client Request**: React components use TanStack Query for API calls
2. **API Layer**: Express routes handle authentication and business logic
3. **Data Access**: Drizzle ORM manages database interactions
4. **Response**: JSON responses with error handling and logging
5. **State Management**: TanStack Query caches and synchronizes server state

## External Dependencies

### Database
- **Neon Serverless PostgreSQL**: Cloud-hosted database with WebSocket connections
- **Connection Pooling**: @neondatabase/serverless for efficient connections

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first styling
- **Date-fns**: Date manipulation utilities

### Development Tools
- **Vite Plugins**: React support, runtime error overlay, Replit cartographer
- **TypeScript**: Full type safety across the stack
- **ESLint/Prettier**: Code quality and formatting (configured via components.json)

## Deployment Strategy

### Development Environment
- **Port**: 5000 (mapped to external port 80)
- **Hot Reload**: Vite HMR with Express middleware integration
- **Database**: Environment variable `DATABASE_URL` required

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: esbuild bundles server to `dist/index.js`
- **Deployment**: Autoscale deployment target on Replit
- **Process**: `npm run build` followed by `npm run start`

### Configuration Files
- **Replit Config**: `.replit` with Node.js 20, PostgreSQL 16 modules
- **TypeScript**: Shared config for client, server, and shared code
- **Drizzle**: Database schema and migration configuration

## Changelog

```
Changelog:
- June 20, 2025. Enhanced user experience with notification system
  * Reorganized homepage to prioritize "Trámites Disponibles" over news
  * Applied same layout to user home page (/user-home) - procedures first, news sidebar
  * Added "En proceso..." notifications for all procedure initiation buttons
  * Added "Trabajando..." notifications for all admin dashboard action buttons
  * Improved layout with procedures taking 3/4 width, news sidebar 1/4 width
  * Enhanced user flow with proper authentication redirects
  * Added quick actions section for authenticated users

- June 18, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```