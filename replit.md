# Lume Dental - Dental Clinic Landing Page

## Overview

Lume Dental is a modern dental clinic landing page application built with React and Express. The application serves as a marketing and booking platform for a dental practice, featuring service information, team profiles, testimonials, and appointment scheduling capabilities. The system integrates with Firebase for authentication and data storage, providing both patient-facing landing pages and doctor authentication workflows.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing, managing navigation between landing pages, booking forms, and authentication views.

**UI Component System**: shadcn/ui components built on Radix UI primitives, providing accessible, customizable components with Tailwind CSS styling. The design follows a "New York" style preset with custom color schemes optimized for healthcare/dental aesthetics.

**State Management**: 
- TanStack Query (React Query) for server state management, data fetching, and caching
- React Context API for authentication state (Firebase user context)
- React Hook Form with Zod validation for form state management

**Styling Approach**: Tailwind CSS with custom design tokens defined in CSS variables for theming. The application uses a neutral color palette with professional healthcare aesthetics, custom spacing primitives, and typography scale defined in design guidelines.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**Session Management**: Express-session with connect-pg-simple for PostgreSQL-backed session storage. Sessions support Passport.js authentication middleware.

**Authentication Strategy**: Hybrid approach combining:
- Traditional username/password authentication via Passport.js Local Strategy
- Firebase Authentication for social login (Google OAuth)
- Session-based authentication with bcrypt password hashing

The dual authentication system exists to support both doctor login (Express/Passport) and potentially patient authentication (Firebase).

**API Design**: RESTful endpoints with JSON payloads:
- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/auth/logout` - Session termination
- `/api/auth/me` - Current user session retrieval

### Data Storage Solutions

**Primary Database**: PostgreSQL via Neon serverless driver, configured through environment variable `DATABASE_URL`.

**ORM**: Drizzle ORM for type-safe database queries and schema management. Schema definitions live in `shared/schema.ts` for code sharing between client and server.

**Database Schema**:
- `users` table: Authentication credentials (id, username, password)
- `doctors` table: Doctor profiles (id, firstName, lastName, email, role, createdAt)

**Migration Strategy**: Drizzle Kit for schema migrations, with migration files stored in `/migrations` directory.

### External Dependencies

**Firebase Services**:
- Firebase Authentication for Google OAuth and potential future auth providers
- Firestore Database for appointment booking data storage
- Custom Firebase Cloud Function endpoint for booking appointments at `https://foveal-yuriko-uratic.ngrok-free.dev/dental-clinic-project-a8512/us-central1/bookingAppointment`

**Google Services**:
- Google Sign-In (Client ID: `847789978053-p6k8o0g3t825o1p2359c9mu770ei4t57.apps.googleusercontent.com`)
- Google Fonts API for Inter and Playfair Display typography

**Development Dependencies**:
- Replit-specific plugins for development tooling (cartographer, dev banner, runtime error overlay)

**Asset Management**: Static images stored in `attached_assets/generated_images/` for dental clinic photography, team photos, and facility images.

### Architectural Decisions

**Monorepo Structure**: Client and server code coexist in a single repository with shared TypeScript types and schemas in `/shared` directory, enabling type safety across the full stack.

**Build Strategy**: 
- Client builds to `dist/public` via Vite
- Server bundles to `dist` via esbuild with ESM format
- Production serves bundled server with static client assets

**Development vs Production**: Vite dev server with HMR in development, static file serving in production. Conditional plugin loading based on `NODE_ENV` and Replit environment detection.

**Form Validation**: Zod schemas provide runtime validation that mirrors database schema constraints (via drizzle-zod), ensuring consistency between client validation, API validation, and database constraints.

**Password Security**: Bcrypt with 10 salt rounds for password hashing, following industry standard security practices.

**Asset Resolution**: Vite path aliases (`@/`, `@shared/`, `@assets/`) provide clean imports and decouple code from directory structure changes.