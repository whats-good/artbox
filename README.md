<img src="https://user-images.githubusercontent.com/96403295/222609149-43904e21-a086-48cd-999c-f6ab7df899af.gif" width="200" height="auto">

## Overview
- QR8 is a platform focused on curation for artists and collectors. Artists, curators, and collectors can create profiles that act as all-in-one discovery tools for their smart contracts deployed on the Ethereum blockchain (with the intention to add alternative L1s and L2s in the future).
- As the NFT ecosystem grows curation will become a central component of discovering, and collecting emerging artists. Curation will be the key to onboarding the next generation of collectors and artists. By focusing on curation and artists QR8 will become the best place to discover emerging artists, track trends, and follow disruptors in the art world.
#### [Current Deployed Version](https://artbox-web-app.vercel.app/) (In development)

## Features

### Account creation, authentication and authorization with Ethereum message signature.
![Authentication](https://i.gyazo.com/5f5a1eb2b552fdfc5d7165eec514b2bb.gif)

### Discover other users and their curated pages.
![Discover](https://i.gyazo.com/db65212a8a2358d989dfc64b314fef33.gif)

### View users accounts and their curated list of collections.
![Account](https://i.gyazo.com/2b60a323c393057369a3be519ffeb3f2.gif)

### Click an individual piece and get an event log of mints, sales and transfers
![Token](https://i.gyazo.com/15ee19b5082033a2c1266696bf6e4851.gif)

### Add / Delete liked contracts from your account
![Add](https://i.gyazo.com/2b4a6e25aad664b658aefe24eac56d70.gif)

## Stack
- Frontend: Typescript, NextJS, Apollo-Client, Styled-Components, WAGMI, Zora API, React-Draggable
- Backend: NodeJS, GraphQL-Yoga, Express, Express-Session, PostgreSQL, Prisma, Pothos, siwe

## Setup & Installation
- From project root, run `pnpm install` to install the monorepo with all dependencies
- Run `docker compose up -d` from project root to start the database
- From `./services/app-server`, run `pnpm prisma:migrate` to run database migrations
- From `./services/app-server`, run `pnpm prisma:seed` to seed the database
- From `./services/app-server`, run `pnpm start:dev` to start the api server
- From `./services/web-app`, run `pnpm dev` to start the web app
