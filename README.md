# Nova Dynamics Frontend

A Next.js App Router frontend that renders a landing page from validated section data in `src/data/data.json`.

## Requirements

- Node.js 22 LTS
- pnpm 12.11.2, enabled through Corepack
- Docker and Docker Compose for container runs

## Run locally

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000>.

Run the checks with:

```sh
pnpm typecheck
pnpm test
```

## Run with Docker Compose

Build the production image and start the app:

```sh
docker compose up --build
```

Open <http://localhost:3000>. Stop the container with `Ctrl+C`, or run `docker compose down` from another terminal.

The multi-stage image builds Next.js with standalone output, includes the production server and static assets, and runs as the unprivileged `nextjs` user. Compose publishes port 3000 on the host and enables init for clean signal forwarding and shutdown.

CMS entries are validated independently by the component registry. Unsupported types,
invalid entries, and duplicate IDs show a diagnostic during development and are
skipped in production. The first valid section with a given ID wins.

Fonts are served locally with preloading and adjusted fallback metrics. Optional
hero images reserve their layout space and default to lazy loading. Set
`preloadImage` when directly using a hero whose image is the expected LCP element.

The fixture is included at build time. Rebuild the image after changing
`src/data/data.json`.
