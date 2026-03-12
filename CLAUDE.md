# CleanTrack — Dry Cleaning Management App

## Project Overview
Internal management app for a dry cleaning business tracking garments between storefront(s) and a processing plant. Currently **UI-only with mock data** — Convex backend will be wired up later.

## Tech Stack
- **Frontend:** React 19 + TypeScript (Vite 8)
- **Styling:** Tailwind CSS v4 (PostCSS plugin) + Glassmorphism design
- **Routing:** react-router-dom v6
- **Icons:** lucide-react
- **Utilities:** date-fns, clsx, tailwind-merge
- **Backend (planned):** Convex

## Project Structure
```
src/
├── types/index.ts          # All TypeScript interfaces (Order, Item, Staff, LogEntry)
├── lib/
│   ├── utils.ts            # cn(), formatDate(), isOverdue() helpers
│   └── constants.ts        # Status labels, colors, stage order, item types
├── data/                   # Mock data layer (swap to Convex later)
│   ├── mock-orders.ts      # 15 orders across 7 statuses
│   ├── mock-items.ts       # ~43 items linked to orders
│   ├── mock-staff.ts       # 6 staff (2 per role: store/driver/plant)
│   ├── mock-logs.ts        # ~52 activity log entries
│   └── index.ts            # Query helpers (getAllOrders, searchOrders, etc.)
├── hooks/
│   ├── use-auth.ts         # Auth context hook
│   └── use-orders.ts       # Order data hooks (useOrders, useMetrics, etc.)
├── context/
│   └── auth-context.tsx    # Mock PIN auth (React context)
├── components/
│   ├── ui/                 # Reusable primitives (glass-card, badge, button, input, modal, etc.)
│   ├── layout/             # App shell, sidebar, header, mobile nav
│   ├── auth/               # PIN login page
│   ├── dashboard/          # Dashboard page + metrics, order list, filters, reschedule
│   ├── orders/             # Order entry + order detail pages
│   ├── logistics/          # Transfer/delivery scan-verify flow
│   └── plant/              # Plant processing dashboard
└── App.tsx                 # Router config
```

## Key Patterns
- **Glassmorphism:** Use `.glass`, `.glass-light`, `.glass-dark` utility classes from index.css
- **Mock-to-Convex swap:** All data access goes through `src/data/index.ts` helpers and `src/hooks/use-orders.ts`. Only these files change when connecting Convex.
- **Status flow:** dropped_off → transfer_to_plant → at_plant → processing → completed_at_plant → returning_to_store → ready_for_pickup
- **PIN auth:** Demo PINs: 1234 (Store), 5678 (Store), 1111 (Driver), 2222 (Driver), 3333 (Plant), 4444 (Plant)

## Commands
```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Production build
npm run preview  # Preview production build
npx tsc --noEmit # Type-check without emitting
```

## Commit Workflow
When committing, also update:
1. This `CLAUDE.md` file (if project structure/patterns changed)
2. `TODO.md` in project root (current status + next steps)
3. Memory files in Claude's memory system

## GitHub
- Repo: https://github.com/SunilJBO/cleantrack
- Branch: main
