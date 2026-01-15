# Invoice UI (React + TypeScript + Tailwind) — Auth, Mock API, Real-time, Tests

This project implements the provided Figma screens and extends them with:
- Authentication (Firebase email/password)
- Mock backend API (MSW)
- Real-time updates (Socket.IO client)
- Unit/integration tests (Vitest + RTL)
- Error handling and loading states

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS
- Firebase Auth
- MSW (Mock Service Worker) for API
- Socket.IO client
- Vite + Vitest + React Testing Library

## Setup

### 1) Install dependencies
```bash
npm i
```

### 2) Environment variables
Create `.env` in the project root:
```bash
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

If you do not have Firebase credentials, you can still run the app; login/signup screens will error out until valid values are provided.

### 3) Development
```bash
npm run dev
```
- MSW starts automatically in dev to mock `/api/*` endpoints.
- Real-time socket uses a placeholder URL in `src/socket/index.ts`; replace with your backend socket URL when available.

### 4) Tests
```bash
npm run test
# or interactive UI:
npm run test:ui
```

## Authentication
- Implemented via Firebase email/password in `src/auth/*`.
- `AuthProvider` tracks `user` and `loading`.
- `ProtectedRoute` guards app routes; unauthenticated users are redirected to `/login` with return path preserved.

## Mock Backend (MSW)
- Handlers in `src/mocks/handlers.ts`:
  - `GET /api/invoices` — returns invoice summaries
  - `GET /api/invoices/:id` — returns invoice details
  - `POST /api/invoices` — creates an invoice
- Service worker is started in dev in `src/main.tsx`. For tests, Node server setup is under `src/test/server.ts`.

## Real-time Data (Socket.IO)
- `useSocket(event)` subscribes to events and updates state (e.g., `invoice:created` in `InvoiceList`).
- Replace demo endpoint with your server URL. When integrated, emit `invoice:created` from backend to update the list in real time.

## Error Handling & UX
- Axios interceptors convert network/timeout errors to readable messages.
- `ErrorBoundary` catches render/runtime errors and shows a friendly page.
- Invalid URLs are handled by `NotFound` page.
- Loading spinners: `Spinner` component used across auth, invoices list, and invoice details.

## Components & Structure
- Reusable primitives: `Button`, `Input`, `Badge`, `Card`, `Dropdown`, `Modal`, `Spinner`
- Layout: `Sidebar`, `Topbar`
- Pages: `InvoiceHome`, `InvoiceDetails`, `Login`, `Signup`, `NotFound`
- API utility: `src/utils/api.ts` (axios client with auth token injection)
- Socket: `src/socket/index.ts`
- Tests: `src/__tests__/*` with `src/test/setupTests.ts`

## Responsive Design
- Mobile-first using Tailwind breakpoints; grids collapse to single column on small screens.
- Buttons and controls maintain accessible touch targets.

## Accessibility
- Semantic HTML: `header`, `aside`, `main`, `nav`, `table`
- ARIA attributes for dropdowns, modals, inputs
- Keyboard support: Escape closes dropdown and modal; focus management in modal.

