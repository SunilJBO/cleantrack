# CleanTrack — TODO

## Completed
- [x] Project scaffold (Vite + React + Tailwind CSS v4)
- [x] Foundation layer (types, utils, constants, mock data)
- [x] UI primitives (glass-card, badge, button, input, modal, stat-card, etc.)
- [x] Auth context + PIN login screen
- [x] Layout shell (sidebar, header, mobile nav, app shell)
- [x] Router setup with all routes
- [x] Dashboard — metrics row, searchable/filterable order list, reschedule modal
- [x] Order detail page — progress bar, activity timeline, item list
- [x] Order entry page — scanner input, item builder, due date
- [x] Logistics page — transfer/delivery toggle, scan-verify checklist
- [x] Plant processing page — expandable orders, item management
- [x] Initial commit to GitHub
- [x] Connect Convex backend (schema, queries, mutations)
- [x] Wire up real-time data sync (ConvexProvider + useQuery/useMutation)
- [x] Seed staff data to Convex database

## Next Steps
- [ ] Implement photo capture/upload with Convex file storage
- [ ] Add barcode scanning library integration
- [ ] Session persistence (remember logged-in staff)
- [ ] Notification/alert system for overdue items
- [ ] Transfer slip generation (printable view)
- [ ] Offline support for drivers
- [ ] Role-based access control (restrict screens by role)
- [ ] Data retention/archival for completed orders
- [ ] Reschedule mutation (currently client-side only)
- [ ] Clean up legacy mock data files in src/data/

## Known Issues
- Reschedule saves in-memory only (needs Convex mutation)
- Scanner mode shows placeholder (camera integration pending)
- Photo grids use empty arrays (no actual images yet)
