# Dashboard App — Deployment Plan

## Status: Not deploying yet (local-only for now)

## Future Deployment Method: Static Export + Rsync

### Rationale

The dashboard is a read-only display of workspace metadata. For production, it can be built as a static export (`next build` with `output: 'export'`) and served from any web server directory on the VPS.

However, since it reads sibling app metadata at render time, two modes are possible:

### Option A: Static Export (simple)

- Run `next build` which pre-renders the page with current metadata.
- Upload the `out/` directory to the VPS via rsync or SCP.
- Serve with Nginx/Caddy as a static site.
- **Trade-off:** Data is frozen at build time. Must rebuild + redeploy to update.

### Option B: Node.js Server on VPS (dynamic)

- Deploy as a running Next.js server (`next start`).
- Metadata is read on every page load (always fresh).
- Managed with systemd or Docker.
- **Trade-off:** Requires Node.js on the VPS and a running process.

### Recommendation

Start with **Option A** for simplicity. If live-updating matters, switch to **Option B** later.

### Infrastructure Needs

- A subdomain or path on the VPS (e.g., `dashboard.lucasbt.fr`)
- Nginx/Caddy reverse proxy or static file serving
- No database, no env vars required for basic operation

### Steps (when ready)

1. `npm run build` (generates `out/` with static HTML)
2. `rsync -avz out/ user@vps:/var/www/dashboard/`
3. Configure Nginx to serve `/var/www/dashboard/`
4. Set up optional cron or GitHub Action to rebuild + redeploy on push
