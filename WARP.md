# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 16 application using the App Router architecture with TypeScript, React 19, and Tailwind CSS v4. The project uses pnpm as the package manager.

## Development Commands

### Running the Application
```bash
pnpm dev          # Start development server at http://localhost:3000
pnpm build        # Create production build
pnpm start        # Start production server
```

### Code Quality
```bash
pnpm lint         # Run ESLint with Next.js config
```

Note: There are no test scripts configured in this project yet.

## Architecture

### Next.js App Router Structure
- **`app/`**: Contains all routes and layouts using Next.js App Router
  - `layout.tsx`: Root layout with Geist fonts and global metadata
  - `page.tsx`: Home page component
  - `globals.css`: Global styles with Tailwind CSS v4 imports
  - `favicon.ico`: Site favicon

### Styling Architecture
- Uses **Tailwind CSS v4** via PostCSS (`@tailwindcss/postcss`)
- Tailwind is imported directly in CSS via `@import "tailwindcss"`
- Custom CSS variables defined using `@theme inline` directive (Tailwind v4 feature)
- Dark mode supported via `prefers-color-scheme` media query
- Font variables: `--font-geist-sans` and `--font-geist-mono` from Google Fonts

### TypeScript Configuration
- Path alias configured: `@/*` maps to project root (e.g., `@/app/page.tsx`)
- Target: ES2017
- Strict mode enabled
- React JSX transform used (`"jsx": "react-jsx"`)

### ESLint Configuration
- Uses flat config format (`eslint.config.mjs`)
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Key Patterns

### Component Creation
- All components should be TypeScript (`.tsx`)
- Use React Server Components by default (no `"use client"` directive needed)
- Add `"use client"` only when using hooks, event handlers, or browser APIs
- Use `next/font/google` for font optimization

### Routing
- File-based routing in `app/` directory
- `page.tsx` for routes
- `layout.tsx` for shared layouts
- Metadata exported from `page.tsx` or `layout.tsx` for SEO

### Styling
- Tailwind utility classes are preferred
- Dark mode classes available (e.g., `dark:bg-black`)
- CSS custom properties for theme values

## Docker Configuration

Per project rules, this project requires:
- **Dockerfile.dev**: Development environment configuration
- **Dockerfile.prod**: Production environment configuration
- These should follow proper Docker standards and be used by GitHub workflows accordingly

## Static Assets

Place static files in `public/` directory. They are served from the root path:
- `public/image.png` → `/image.png`
- Use `next/image` component for optimized image loading

## Application Routes

### Pages
- **`/`**: Home page - Event invitation landing page
- **`/reminder`**: Reminder form page - Users set SMS reminders for the event
- **`/order-service`**: Program schedule page - Displays event timeline

## API Routes

### Reminder System
- **POST `/api/send-reminder`**: Handles form submission, saves reminder to database, sends confirmation SMS
- **GET/POST `/api/cron/send-reminders`**: Cron job endpoint that queries and sends scheduled reminders

### Database
- Uses Prisma ORM with PostgreSQL (Neon)
- Prisma Client generated to `generated/prisma/client`
- Connection configured via PG adapter in `lib/prisma.ts`

### SMS Integration
- Uses Termii API for SMS notifications
- Service methods in `lib/termii.ts`
- Sends confirmation SMS on form submission
- Sends reminder SMS at scheduled time
- Phone numbers are Nigeria-specific: users enter 10 digits (e.g., `8012345678`), automatically prefixed with `234` country code

### Timezone
- All date/time operations use **Africa/Lagos** timezone (WAT - UTC+1)
- Configured in cron job to match user's local time

## Environment Variables

Required environment variables (defined in `.env`):
```env
DATABASE_URL="postgresql://..."          # PostgreSQL connection string (Neon)
TERMII_API_KEY="..."                     # Termii SMS API key
TERMII_SECRET_KEY="..."                  # Termii secret key
TERMII_SENDER_ID="IDCODE"                # SMS sender ID
```

## Prisma Commands

```bash
pnpm prisma generate       # Generate Prisma Client to generated/prisma/client
pnpm prisma studio         # Open Prisma Studio (database GUI)
pnpm prisma db push        # Push schema changes to database
pnpm prisma migrate dev    # Create and apply migrations
```

Note: Prisma client is generated to custom path `generated/prisma/client` (configured in `schema.prisma`).

## Cron Job Setup

See `CRON_SETUP.md` for detailed instructions on configuring the reminder cron job.
