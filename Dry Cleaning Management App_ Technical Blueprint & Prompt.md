# Dry Cleaning Management App: Technical Blueprint & Prompt

This document provides a detailed technical blueprint and a ready-to-use prompt for building a modern, responsive internal management application for a dry cleaning business. The application is designed to streamline operations between the storefront and the processing plant, using **Convex** for the backend and **React** for a fast, interactive frontend.

## Technical Architecture Overview

The application will follow a modern web architecture optimized for speed, real-time updates, and ease of use across both desktop and mobile devices.

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) + Tailwind CSS | Fast, responsive UI with a modern, "classy" look (glassmorphism, clean layouts). |
| **Backend** | Convex | Real-time data synchronization, serverless functions, and file storage for photos. |
| **Authentication** | Custom PIN-based Auth | Simple, secure access for internal staff without complex email/password flows. |
| **Database** | Convex Schema | Relational data for orders, items, staff, and logistics logs. |
| **Scanning** | Barcode/QR Integration | Rapid entry of invoice numbers using device cameras or external scanners. |

## Core Workflow & Data Model

The application tracks the lifecycle of each dry cleaning order through seven distinct stages, ensuring full visibility at every step.

> **Workflow Summary:**
> 1. **Drop-off:** Store staff records the invoice, due date, and initial photos.
> 2. **Transfer to Plant:** Driver scans items against a transfer slip.
> 3. **Plant Arrival:** Driver and plant staff verify the items received.
> 4. **Processing:** Plant staff records defects, stains, or completion photos.
> 5. **Plant Collection:** Driver scans completed items against a delivery slip.
> 6. **Return to Store:** Driver returns items to the original location.
> 7. **Store Arrival:** Final verification and status update to "Ready for Pickup."

### Key Data Entities

| Entity | Key Fields |
| :--- | :--- |
| **Order** | Invoice Number (ID), Customer Name (Optional), Due Date, Current Status, Original Location. |
| **Item** | Item Type, Initial Photos, Plant Photos, Completion Photos, Defects/Stains Notes. |
| **Logistics Log** | Order ID, Action (Transfer/Delivery), Staff ID, Timestamp, Location. |
| **Staff** | Name, Role (Store, Driver, Plant), PIN (Hashed). |

## Interactive Dashboard Requirements

The central hub of the application is the **Interactive Dashboard**, which provides real-time insights into the business operations.

*   **Real-time Metrics:** Instant visibility into items currently at the processing plant, items due today, and overdue items.
*   **Status Tracking:** A searchable and filterable list of all active orders, with the ability to drill down into specific item details and photos.
*   **Rescheduling:** A simple interface to update due dates for items that require extra processing time.
*   **Visual Indicators:** Color-coded status badges (e.g., Green for "Ready," Yellow for "In Transit," Red for "Overdue").

---

## The App-Building Prompt

*Copy and paste the following prompt into your AI development tool (e.g., Cursor, Windsurf, or a specialized AI developer) to begin the build.*

### Prompt: Internal Dry Cleaning Management System (Convex + React)

**Objective:** Build a modern, responsive internal management application for a dry cleaning business to track garments between a storefront and a processing plant.

**Tech Stack Requirements:**
- **Frontend:** React (Vite) with Tailwind CSS. Use a "classy" UI design (glassmorphism, subtle gradients, Inter/Poppins typography).
- **Backend:** Convex for real-time data, serverless functions, and file storage.
- **Authentication:** Implement a PIN-based authentication system for internal staff (Store, Driver, Plant roles).
- **Features:** Barcode scanning integration for invoice entry and check-lists.

**Core Functionality:**
1.  **Dashboard:** A real-time interactive dashboard showing:
    -   Items currently at the processing plant.
    -   Items due today vs. overdue items.
    -   Ability to reschedule due dates.
2.  **Order Entry (Storefront):**
    -   Scan or enter Invoice Number.
    -   Set Due Date.
    -   Capture/Upload initial photos of garments.
    -   Generate a digital "Transfer Slip."
3.  **Logistics (Driver/Plant):**
    -   **Transfer Mode:** Driver scans items to "check off" against the transfer slip before leaving the store and upon arrival at the plant.
    -   **Delivery Mode:** Driver scans items to "check off" against the delivery slip before leaving the plant and upon arrival at the store.
4.  **Plant Processing:**
    -   Ability for plant staff to add photos of defects/stains or final completion photos.
    -   Update status to "Processing" or "Completed."
5.  **Responsive Design:** Ensure the UI is highly functional on mobile (for drivers/plant staff) and desktop (for the main dashboard).

**Data Schema (Convex):**
-   `orders`: invoiceNumber, dueDate, status (enum), location, createdAt.
-   `items`: orderId, type, initialPhotos (array of IDs), plantPhotos (array of IDs), notes.
-   `staff`: name, role, pin (hashed).
-   `logs`: orderId, staffId, action, timestamp.

**UI/UX Guidelines:**
-   Use a clean, spacious layout with premium icons (e.g., Lucide-React).
-   Implement smooth transitions between status updates.
-   Ensure the barcode scanner is easily accessible from the main navigation.
