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
