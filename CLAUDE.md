# CleanTrack — Dry Cleaning Management App

## Project Overview
Internal management app for a dry cleaning business tracking garments between storefront(s) and a processing plant. **Convex backend is live** with real-time data sync.

## Tech Stack
- **Frontend:** React 19 + TypeScript (Vite 8)
- **Styling:** Tailwind CSS v4 (PostCSS plugin) + Glassmorphism design
- **Routing:** react-router-dom v7
- **Icons:** lucide-react
- **Utilities:** date-fns, clsx, tailwind-merge
- **Backend:** Convex (deployment: `dev:quirky-snake-575`, project: `oasistransfer`)

## Project Structure
```
convex/
├── schema.ts               # Database schema (orders, items, staff, logs)
├── orders.ts               # Order queries (list, getById, metrics) + mutations (create, updateStatus)
├── items.ts                # Item queries (getByOrderId) + mutations (createBatch, addDefect, addPhotos)
├── staff.ts                # Staff queries (getByPin, getById, list)
├── logs.ts                 # Log queries (getByOrderId) + mutations (create)
├── seed.ts                 # Staff seeding mutation
└── _generated/             # Auto-generated Convex types and API
src/
├── types/index.ts          # TypeScript interfaces (Order, Item, Staff, LogEntry)
├── lib/
│   ├── utils.ts            # cn(), formatDate(), isOverdue() helpers
│   └── constants.ts        # Status labels, colors, stage order, item types
├── data/                   # Legacy mock data (no longer used by app)
├── hooks/
│   ├── use-auth.ts         # Auth context hook
│   └── use-orders.ts       # Convex-powered hooks (useOrders, useMetrics, etc.)
├── context/
│   └── auth-context.tsx    # PIN auth via Convex staff lookup
├── components/
│   ├── ui/                 # Reusable primitives (glass-card, badge, button, input, modal, etc.)
│   ├── layout/             # App shell, sidebar, header, mobile nav
│   ├── auth/               # PIN login page
│   ├── dashboard/          # Dashboard page + metrics, order list, filters, reschedule
│   ├── orders/             # Order entry + order detail pages
│   ├── logistics/          # Transfer/delivery scan-verify flow
│   └── plant/              # Plant processing dashboard
├── main.tsx                # App entry point with ConvexProvider
└── App.tsx                 # Router config
```

## Key Patterns
- **Glassmorphism:** Use `.glass`, `.glass-light`, `.glass-dark` utility classes from index.css
- **Convex data flow:** Hooks use `useQuery` for reactive reads, components use `useMutation` for writes. No manual refresh needed — Convex handles real-time sync automatically.
- **Schema validators:** Union types (`orderStatus`, `staffRole`, `logAction`) are defined in `convex/schema.ts` and reused in mutation args for type safety.
- **Status flow:** dropped_off → transfer_to_plant → at_plant → processing → completed_at_plant → returning_to_store → ready_for_pickup
- **PIN auth:** Demo PINs: 1234 (Store), 5678 (Store), 1111 (Driver), 2222 (Driver), 3333 (Plant), 4444 (Plant), 0000 (Admin)

## Commands
```bash
npm run dev          # Start Vite dev server (port 5173)
npx convex dev       # Start Convex dev server (watches for changes)
npm run build        # Production build
npm run preview      # Preview production build
npx tsc --noEmit     # Type-check without emitting
npx convex dev --once # Push schema/functions once without watching
```

## Commit Workflow
When committing, also update:
1. This `CLAUDE.md` file (if project structure/patterns changed)
2. `TODO.md` in project root (current status + next steps)
3. Memory files in Claude's memory system

## GitHub
- Repo: https://github.com/SunilJBO/cleantrack
- Branch: main
