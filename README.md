# Nguyen Dang Dat (@arcrek) — Portfolio

A high-performance developer portfolio built with **Astro 5**, **Tailwind CSS v4**, and Google's **Material 3 (Material You)** design guidelines.

## Key Features

- **Dual-Persona Architecture**: Deep-linkable routes tailored to different audiences:
  - **`/` (or `/recruiter`)**: Technical depth, system architecture, problem breakdowns, and performance telemetry for engineering hiring managers.
  - **`/services`**: ROI-driven business case studies, automation package deliverables, and project inquiry form for clients and founders.
- **Material 3 Design Guidelines**:
  - Surface container hierarchy (Lowest to Highest) for subtle, authentic elevation.
  - Tonal color palettes (Primary, Secondary, Tertiary, On-Surface).
  - Material 3 Segmented Buttons, Cards (Elevated & Outlined), and Assist Chips.
  - Dark / Light mode toggle with zero-FOUC initialization and local storage sync.
- **Build-Time GitHub Hydration**:
  - Languages, repository topics, and source links are fetched at build-time using GitHub's API (`src/lib/github.ts`).
  - Resilient offline fallback guarantees the site builds reliably in any environment without runtime rate-limit errors.
- **Near-Zero Client JavaScript**:
  - 100/100 Lighthouse performance baseline with instant First Contentful Paint.
- **Automated CI/CD**:
  - GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push and on a weekly schedule.

## Project Structure

```text
├── .github/workflows/deploy.yml  # GitHub Pages deployment workflow
├── src/
│   ├── components/
│   │   └── m3/                  # Reusable Material 3 UI components
│   │       ├── M3Button.astro
│   │       ├── M3Card.astro
│   │       ├── M3Chip.astro
│   │       ├── M3NavBar.astro
│   │       ├── M3SegmentedButton.astro
│   │       └── M3ThemeToggle.astro
│   ├── data/
│   │   └── projects.ts          # Curated projects & profile metadata
│   ├── layouts/
│   │   └── Layout.astro         # Base M3 layout & SEO tags
│   ├── lib/
│   │   └── github.ts            # Build-time GitHub API fetcher & fallbacks
│   ├── pages/
│   │   ├── index.astro          # Recruiter & Engineering Hub
│   │   ├── recruiter.astro      # Deep-link alias for resumes
│   │   └── services.astro       # Client & Automation Services Hub
│   └── styles/
│       └── global.css           # Material 3 CSS tokens & Tailwind theme
├── astro.config.mjs
└── package.json
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Static Build
```bash
npm run preview
```

## Adding or Updating Projects

To add or update featured projects, edit [`src/data/projects.ts`](file:///home/arcrek/workspace/portfolio/src/data/projects.ts). Each project accepts both `recruiterView` (problem, architecture, key decisions) and `servicesView` (business problem, ROI impact, deliverables). Repository metadata will automatically synchronize on the next build!
