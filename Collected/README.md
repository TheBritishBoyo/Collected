# Collected

A trusted collector marketplace that aggregates prices from verified retailers for Pokémon cards, booster boxes, figures, and sealed product — showing buyers the cheapest in-stock option across sellers, instead of making them check a dozen sites themselves.

**Live:** https://collected-ebon.vercel.app/

## Tech stack

- **React 19** + **Vite** — frontend framework/build tool
- **React Router 7** — client-side routing
- **Supabase** — Postgres database + authentication
- **Plain CSS** — no framework, one global stylesheet (`src/index.css`) using CSS custom properties for theming
- **Vercel** — hosting, auto-deploys on push to `main`

## Getting started

> ⚠️ This repo has the Vite project nested one folder deeper than the repo root. Make sure you're inside the inner `Collected/` folder before running anything.

```bash
git clone https://github.com/TheBritishBoyo/Collected.git
cd Collected/Collected
npm install
```

Create a `.env` file in this folder (see `.env.example` for the required keys):

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

Then:

```bash
npm run dev
```

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Production build (output to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

src/
├── components/ → reusable UI pieces (Navbar, Hero, ProductCard, etc.)
├── context/ → AuthContext (Supabase session state)
├── data/ → static homepage content (categories, stats, steps)
├── lib/ → Supabase client setup
└── pages/ → route-level pages (Home, Browse, ProductDetail, About, SignIn, Contact)

## Status

Actively in development. Product/listing data lives in Supabase; browsing, product detail, and real sign up/sign in are functional. Contact form, seller onboarding, and payments are not built yet.

cd Collected
git add README.md public/icons.svg
git rm public/icons.svg
git commit -m "Update README, remove unused icon asset"
git push origin main