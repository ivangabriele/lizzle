# Contributing

- [Get Started](#get-started)
  - [Prequisites](#prequisites)
  - [Setup](#setup)
- [Deploy](#deploy)
  - [Heroku / Scalingo / Dokku](#heroku--scalingo--dokku)
  - [Other hosting solutions](#other-hosting-solutions)
  - [Environment variables](#environment-variables)
    - [Required](#required)
    - [Optional](#optional)
  - [Syncronizing Lichess puzzles database](#syncronizing-lichess-puzzles-database)

## Get Started

### Prequisites

You need to have those installed before getting started:

- [Docker Desktop](https://www.docker.com/get-started/)  
  (or [Docker Engine](https://docs.docker.com/engine/install/) if you're at ease with command lines)
- [Node.js v19](https://nodejs.org) with npm v9  
  (check your npm version via `npm -v` and upgrade via `npm i -g npm@9` if necessary)
- [Yarn 3](https://yarnpkg.com/getting-started/install) (simply run `corepack enable` once you have Node.js installed)

It should also work with [Podman](https://podman.io/getting-started/) instead of Docker. You'll just need to look at the
`package.json` scripts and run docker-related commands manually.

### Setup

```sh
git clone https://github.com/ivangabriele/lizzle.git
cd lizzle
yarn
yarn dev:docker
yarn dev:setup
yarn dev:setup:vscode # If you're using Visual Studio Code
yarn data:sync # There are more than 3M puzzles so that's a long process (~10m locally)
```

## Deploy

If you prefer to deploy your own instance rather than ~~paying for~~ using [lizzle.org](https://lizzle.org),
it should work out of the box when deploying to containerized PaaS solutions.

### Heroku / Scalingo / Dokku

Just clone this repository and deploy it to your favorite PaaS.

It's an all-in-one instance that only require a Node.js environment with Yarn 3 (which is alread available in Node.js
buildpack). You'll alspo need to link a PostgreSQL database plugin/service which must be linked via the required
`DATABASE_URL` enviroment variable.

### Other hosting solutions

I don't provide documentation for other hosting solutions (AWS, Azure, Google Cloud, custom VPS) but it should be fairly
easy to deploy after reading this page to find how to do it if you have basic devops skills.

It's also easy to Dockerize/Podmanize 😉.

### Environment variables

#### Required

- `DATABASE_URL` set to your full PostgreSQL database URL (`postgresql://...`).
- `NODE_ENV` set to `production`.

#### Optional

These are custom env vars for Heroku / Scalingo / Dokku:

- `PER_IP_MAX_FREE_PUZZLES_LENGTH` is the number of free puzzles allowed by IP vefore requiring a subscription.
  Both omitting this env var or setting it to `0` mean no limitation.

### Syncronizing Lichess puzzles database

Lichess puzzles are available as a bzip2-compressed CSV file which requires lizzle to download, extract and process the
CSV file. Since it's a heavy file with more than 3M lines, it's processed using Node.js stream and batch-upserted into
the database.

Since it's a relatively slow and heavy process, it's cumbersome to run it directly on a remote server.

The best (but not ideal, security-wise) solution right now is to:

1. Prepare a local instance, following [Get Started](#get-started) steps.
2. If necessary, allow your remote PostgreSQL database to accept public connections (preferably with TLS enabled).
3. Change the `DATABASE_URL` value in your local `.env` file to the remote PostgreSQL database (`postgresql://...`).
4. Change the `NODE_ENV` value in your local `.env` file to `production`. 
5. Run the command `yarn data:sync`.

⚠️ **Don't forget to delete your production `DATABASE_URL` aftwerwards as well as eventually disable your public
PostgreSQL database access afterwards. It's UNSAFE to keep your remote datbase URL in clear on your computer.**
