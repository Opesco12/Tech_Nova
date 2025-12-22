Tech Nova — Frontend + Backend

Overview

This repository contains a Strapi backend and a React + Vite frontend for the Tech Nova blog site.

Folders

- `backend/` — Strapi application and server configuration
- `frontend/` — React + Vite frontend (Tailwind + TypeScript)

Prerequisites

- Node.js (>=16)
- pnpm (recommended) — or use npm/yarn if you prefer

Quick start (frontend)

1. Install dependencies:

```bash
cd frontend
pnpm install
```

2. Start dev server (uses a Vite proxy for Strapi during development):

```bash
pnpm dev
```

The frontend dev server will proxy calls starting with `/strapi` to the remote Strapi instance (see `frontend/vite.config.ts`). This avoids CORS issues while developing locally.

Quick start (backend)

1. Change to the backend folder:

```bash
cd backend
```

2. Follow the Strapi app README in `backend/README.md` (install dependencies, run migrations, configure environment)

CORS and API notes

- In development the frontend routes API requests through the Vite proxy at `/strapi` (configured in `frontend/vite.config.ts`). For example, the frontend requests:

  - `/strapi/api/blogs?fields=title,publishedAt,content,documentId&populate=coverImage`

  The proxy forwards that to the configured Strapi host.

- The frontend `blogStore` now requests the `documentId` field for each blog and links to details using `article.documentId ?? article.id` (see `frontend/src/stores/blogStore.ts` and `frontend/src/pages/BlogsPage.tsx`). The blog detail route accepts either a numeric id or a `documentId` string.

Routing & detail pages

- Route format for blog detail pages: `#/blogs/{documentId_or_id}` (handled in `frontend/src/App.tsx` and `frontend/src/pages/BlogPage.tsx`).

Developer tips

- If you control the Strapi server, enable the correct CORS origin for your dev frontend (e.g., `http://localhost:5175`) to avoid needing a proxy in production.
- To debug API responses, open the browser Network tab and inspect requests to `/strapi` (dev) or to your deployed Strapi host.

Files of interest

- `frontend/vite.config.ts` — Vite dev proxy config
- `frontend/src/stores/blogStore.ts` — fetchAll / fetchById logic and `documentId` handling
- `frontend/src/pages/BlogsPage.tsx` — blog list, hero, and latest scroller
- `frontend/src/pages/BlogPage.tsx` — blog detail page

Contact

If you want me to also add a more detailed developer README per folder, or to include example environment files, tell me which environment variables you use and I'll add them.
