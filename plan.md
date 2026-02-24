# Dashboard App — Plan

## Goal

A local web app that auto-discovers and displays all apps in the `/home/lucas/Workspace/ia/` workspace. Acts as a living portfolio / control panel.

## Tech Stack

- **Next.js 14+** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS**
- **Zod** for metadata validation

Why Next.js: Server Components can read the filesystem directly on every request — no separate backend, no build step needed to refresh data. Lucas already knows React.

## Core Mechanism

Each sibling app includes an `app.meta.json` at its root. The dashboard scans all sibling directories, reads those files, validates them with Zod, and renders cards.

- Directories without `app.meta.json` show as "unconfigured".
- Malformed JSON shows a warning card.
- `export const dynamic = 'force-dynamic'` ensures re-scan on every page load in dev.

## Metadata Schema (`app.meta.json`)

See `app.meta.schema.json` in this repo for the full JSON Schema. Key fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | kebab-case, matches folder name |
| `displayName` | string | yes | Human-readable name |
| `description` | string | yes | Brief description |
| `version` | string | no | Semver |
| `techStack` | string[] | no | Free-form tags |
| `status` | enum | yes | `planning`, `in-progress`, `ready`, `deployed`, `archived` |
| `github.owner` | string | no | GitHub owner |
| `github.repo` | string | no | GitHub repo name |
| `github.url` | string | no | Full GitHub URL |
| `deploy.method` | string | no | Deployment method |
| `deploy.status` | enum | no | `not-deployed`, `deploying`, `live`, `failed` |
| `deploy.url` | string | no | Production URL |
| `createdAt` | string | no | ISO date |
| `tags` | string[] | no | Free-form tags |

## UI Design

- **Dark theme** (`bg-gray-950` background, `bg-gray-900` cards)
- **Responsive card grid** (1 col mobile, 2 col tablet, 3 col desktop)
- **Header** with workspace stats (total apps, deployed count, WIP count)
- **Status badges** color-coded (gray=planning, amber=WIP, blue=ready, green=deployed, slate=archived)
- **Tech tags** as small chips
- **GitHub + deploy links** at bottom of each card
- **Unconfigured apps** shown with dashed border as a prompt to add metadata

## Milestones

1. Scaffold Next.js + Tailwind + TypeScript, implement scanner, create own `app.meta.json`
2. Build UI components (Header, AppCard, AppGrid, StatusBadge, TechTag)
3. Polish: parse error handling, empty state, sorting
4. Local git metadata enrichment (branch, last commit)
5. Optional GitHub API enrichment
6. Deployment docs

## Project Structure

```
dashboard/
  app.meta.json
  app.meta.schema.json
  plan.md
  plan-deploy.md
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
    components/
      header.tsx
      app-card.tsx
      app-grid.tsx
      status-badge.tsx
      tech-tag.tsx
      empty-state.tsx
    lib/
      scanner.ts
      schema.ts
      git-info.ts
      types.ts
```
