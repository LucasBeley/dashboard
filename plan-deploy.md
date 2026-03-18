# Dashboard — Deployment Plan

## Method: Docker (Next.js standalone) behind Caddy behind Apache

## Architecture

```
Apache (443, TLS) → Caddy (8080, Docker) → dashboard (3000, Docker)
```

- **Apache** terminates TLS with wildcard cert `*.lucasbt.fr`, proxies to Caddy
- **Caddy** runs in Docker, routes subdomains to app containers
- **Dashboard** runs as Next.js standalone server in its own container

## Infrastructure

- **Subdomain:** `dashboard.lucasbt.fr`
- **Container port:** 3000 (internal, not published)
- **Memory limit:** 192MB
- **Volume:** `/home/deploy/apps:/workspace:ro` — scanner reads sibling `app.meta.json` files
- **Env var:** `WORKSPACE_DIR=/workspace`

## Deploy Commands

```bash
# On VPS as deploy user
cd /home/deploy/apps
git clone git@github.com:LucasBeley/dashboard.git  # or git pull if already cloned
docker compose up -d --build dashboard
```

## Update Commands

```bash
cd /home/deploy/apps/dashboard
git pull
cd /home/deploy/apps
docker compose up -d --build dashboard
```
