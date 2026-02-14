# Practice Tasks Dashboard (Next.js + Tokens)

This project is a small multi-task playground built with **Next.js App Router** and a simple **Design System token layer**. It contains:

- A **Games** section with filtering + infinite scroll, backed by a local JSON dataset.
- An **Admin Dashboard** section (Chakra UI) with login + users/products pages using DummyJSON.
- A **Virtualized Select** playground with grouped options and fast rendering for large lists.

## Stack

**Core**

- Next.js (App Router)
- React
- TypeScript

**Styling / UI**

- Tailwind CSS (utility classes)
- Design System tokens in [Design-System/tokens](/test-1/Design-System/tokens) (`colorTokens`, `typographyTokens`, `spacingTokens`, `radiusTokens`)
- Chakra UI (used mainly in the `/Dashboard/*` routes)
- Headless UI (accessible Listbox for the custom Select)
- Lucide icons

**Data / State**

- Local JSON dataset for Games: [apiReplaced.json](/test-1/lib/utils/apiReplaced.json)
- DummyJSON API client for Dashboard: [dummyjson.ts](file:///c:/Users/mandegar/test-1/lib/api/dummyjson.ts)
- Axios for HTTP (DummyJSON + optional RAWG client)

**Performance**

- Infinite scroll via `IntersectionObserver`: [useInfiniteScroll.ts](/test-1/lib/hooks/useInfiniteScroll.ts)
- List virtualization via `@tanstack/react-virtual` in Select: [select.tsx](/test-1/components/organism/select/select.tsx)

**Testing**

- Vitest + Testing Library + JSDOM

## Routes (what to click)

- `/` → introduction + navigation buttons
- `/games` → games list (filters + infinite scroll)
- `/games/[slug]` → game detail page
- `/Dashboard/Login` → dashboard login
- `/Dashboard/products` → products management
- `/Dashboard/users` → users management
- `/finalPractice/select` → virtualized select playground

## How the Games section works (important)

The Games task is intentionally **offline-friendly**:

- The main dataset is stored in [apiReplaced.json](/test-1/lib/utils/apiReplaced.json).
- The UI loads the first page server-side in [games/page.tsx](/test-1/app/games/page.tsx).
- Infinite scroll loads more pages by calling a local API route:
  - [app/api/games/route.ts](/test-1/app/api/games/route.ts)
  - Supports: `page`, `page_size`, `search`, `genres`, `platforms`
- The grid + “load next page when last card appears” logic lives in:
  - [GameGalley.tsx](f/test-1/components/organism/game/GameGalley.tsx)

If you change filter query params (e.g. `?search=...&genres=action`), the list resets and starts paginating again.

## Design System tokens (how to use them)

Tokens are plain objects exporting Tailwind class strings. Example usage:

```tsx
import {
  colorTokens,
  typographyTokens,
  radiusTokens,
} from "@/Design-System/tokens";

export function Example() {
  return (
    <div className={`${colorTokens.background.dark} ${radiusTokens.lg}`}>
      <h1 className={`${typographyTokens.heading} ${colorTokens.text.light}`}>
        Title
      </h1>
    </div>
  );
}
```

Where to look:

- [colors.ts](/test-1/Design-System/tokens/colors.ts)
- [typography.ts](/test-1/Design-System/tokens/typography.ts)
- [radius.ts](/test-1/Design-System/tokens/radius.ts)
- [spacing.ts](/test-1/Design-System/tokens/spacing.ts)

## Custom cursor

- The custom cursor is rendered globally in [layout.tsx](/test-1/app/layout.tsx) via [customCursor.tsx](/test-1/lib/hooks/customCursor.tsx) which i also used in my portfolio.
- The native cursor is hidden in [globals.css](/test-1/app/globals.css) (`cursor: none;`).

If you want the normal cursor back, remove the `cursor: none;` rule.

## Getting started

**Requirements**

- Node.js 18.17+ (or 20+ recommended)

**Install**

```bash
npm install
```

**Run dev**

```bash
npm run dev
```

Open: http://localhost:3000

## Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run start      # start production server
npm run lint       # eslint
npx tsc --noEmit   # typecheck
npx vitest run     # tests
```

## Environment variables

Some API utilities expect keys, but the Games task is currently configured to use local JSON.

- `RAWG_API_KEY` (optional)  
  Used by [rawg.ts](/test-1/lib/api/rawg.ts) if you ever switch back to RAWG.

Create `.env.local`:

```bash
RAWG_API_KEY=your_key_here
```

## Project structure (quick map)

- `app/` → Next.js routes (App Router)
- `components/` → UI building blocks (atoms/molecules/organisms)
- `Design-System/tokens/` → Tailwind-class tokens for consistent styling
- `lib/api/` → API clients (DummyJSON + RAWG helper kept as-is)
- `lib/utils/` → shared utilities + local JSON dataset
- `lib/hooks/` → reusable hooks (infinite scroll, cursor, etc.)
