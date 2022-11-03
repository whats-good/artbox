# Setup

- From project root, run `pnpm install` to install the monorepo with all dependencies
- Run `docker compose up -d` from project root to start the database
- From `./services/app-server`, run `pnpm prisma:migrate` to run database migrations
- From `./services/app-server`, run `pnpm prisma:seed` to seed the database
- From `./services/app-server`, run `pnpm start:dev` to start the api server
- From `./services/web-app`, run `pnpm dev` to start the web app
