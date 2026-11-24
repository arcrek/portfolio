# Nguyen Dang Dat (@arcrek) — Portfolio

Developer portfolio built with **Astro 7**, **Tailwind CSS v4**, and a Material 3 + editorial Cobalt-Slate design system, deployed on **Cloudflare Pages** at **[datnd.io.vn](https://datnd.io.vn)**.

Written from the perspective of an ICT student in Vietnam building backend services, network tools, self-hosted software, and embedded security hardware.

## Key Features

- **Tonal Cobalt-Slate Design System (Light & Dark):**
  - Pairs `rounded-3xl` outer card containers with `1px` internal hairlines, `rounded-full` pill controls, and WCAG AA contrast tokens in both themes.
  - Interactive 5-stage SVG architecture diagrams (`ArchitectureDiagram.astro`) with keyboard navigation, mobile auto-centering, and stage detail panels.
  - Inline SVG icons (`Icon.astro`) and self-hosted variable fonts (`Plus Jakarta Sans` + `JetBrains Mono`) with zero external font requests.
  - Zero-FOUC theme toggle persisted across Astro `<ClientRouter />` view transitions and `prefers-reduced-motion` support.
- **Routes & Structure:**
  - **Projects (`/`):** Masthead with profile summary and stack strip, 3 flagship projects (`VeriKey` [in development, closed source], `TMail`, `Telegram Order Bot`) with interactive diagrams, and 5 expandable project rows (`Xray VLESS Go`, `Outlook Graph Module`, `Canva Automation Suite`, `VMS`, `Price Board`).
  - **Homelab (`/lab`):** Self-hosted home server topology (`Cloudflare & Traefik`, `AdGuard Home`, `Proxmox VE`, `Docker & Portainer`, `TrueNAS ZFS`), 6-service grid, and side-project workflow.
  - **Compatibility aliases & 404:** `/recruiter` (canonical `/`, `noindex`), `/services` (canonical `/lab`, `noindex`), and custom `/404` page.
- **Build-Time GitHub Metadata Lookup:**
  - Primary repository languages are hydrated at build time with a verified offline fallback in `src/lib/github.ts`.
  - Private repositories are never exposed.
- **Cloudflare Pages Ready:**
  - Configured with `wrangler.jsonc`, `public/_headers` for security and immutable asset caching, `public/robots.txt`, and `.github/workflows/cloudflare-pages.yml`.

## Project Structure

```text
├── .github/workflows/
│   ├── cloudflare-pages.yml  # Cloudflare Pages build & deployment workflow
│   └── deploy.yml            # GitHub Pages build & deployment workflow
├── public/
│   ├── _headers              # Cloudflare edge security & caching headers
│   ├── avatar.webp           # Optimized 240x240 profile avatar
│   ├── favicon.svg           # Site favicon
│   ├── fonts/                # Self-hosted Plus Jakarta Sans & JetBrains Mono
│   ├── img.jpg               # Source profile image / Open Graph image
│   └── robots.txt            # Crawler rules
├── src/
│   ├── components/editorial/ # Reusable UI components
│   │   ├── ArchitectureDiagram.astro
│   │   ├── EditorialHeader.astro
│   │   ├── FlagshipCard.astro
│   │   ├── Icon.astro
│   │   ├── ProjectRow.astro
│   │   └── ThemeToggle.astro
│   ├── data/
│   │   └── projects.ts       # Projects, architecture flows & homelab config
│   ├── layouts/
│   │   └── Layout.astro      # Master layout with View Transitions & SEO tags
│   ├── lib/
│   │   └── github.ts         # Build-time GitHub API lookup & offline fallback
│   ├── pages/
│   │   ├── 404.astro         # Custom 404 page
│   │   ├── index.astro       # Main portfolio page
│   │   ├── lab.astro         # Homelab hobby page
│   │   ├── recruiter.astro   # Alias route (canonical -> /)
│   │   └── services.astro    # Alias route (canonical -> /lab)
│   └── styles/
│       └── global.css        # Theme tokens, focus styles & reduced motion
├── astro.config.mjs          # Astro configuration (site: https://datnd.io.vn, base: /)
├── package.json
└── wrangler.jsonc            # Cloudflare Pages deployment configuration
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Local Development
```bash
npx astro dev --background
```

Manage the background server with `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop`.

### 3. Production Build
```bash
npm run build
```

### 4. Local Preview
```bash
npm run preview
```

### 5. Deploy to Cloudflare Pages via CLI
```bash
npx wrangler pages deploy ./dist --project-name portfolio
```

## Deploying to Cloudflare Pages (`datnd.io.vn`)

### Method 1: Cloudflare Git Integration (Recommended)
1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select repository `arcrek/portfolio`.
3. Set the build configuration:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**: `NODE_VERSION` = `22`
4. Under **Custom domains**, add `datnd.io.vn`.

### Method 2: GitHub Actions with Wrangler
1. Generate a Cloudflare API Token with `Cloudflare Pages: Edit` permissions.
2. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to repository secrets.
3. Every push to `main` builds and deploys via `.github/workflows/cloudflare-pages.yml`.
