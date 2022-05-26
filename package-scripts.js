const path = require('path');

const apiPath = path.resolve(__dirname, 'apps/api');
const webPath = path.resolve(__dirname, 'apps/web');

const ciApiPath = path.resolve(__dirname, 'out/apps/api');
const ciWebPath = path.resolve(__dirname, 'out/apps/web');

module.exports = {
  scripts: {
    prepare: {
      default: 'nps prepare.web prepare.api',
      api: 'nps prepare.docker prisma.migrate.dev prisma.seed',
      web: 'npm ci',
      docker: 'docker-compose --env-file ./apps/api/.env up -d',
      ci: {
        api: 'npx turbo prune --scope=api && cd out && npm ci && nps prisma.generate && nps prisma.seed',
        web: 'npx turbo prune --scope=web && cd out && npm ci',
      },
    },
    test: {
      default: 'nps test.web test.api',
      web: `cd ${webPath} && npm run test:watch`,
      api: `cd ${apiPath} && npm run test:watch`,
      ci: {
        default: 'nps test.ci.web test.ci.api',
        web: `cd ${ciWebPath} && npm run test:ci`,
        api: `cd ${ciApiPath} && npm run test:ci`,
      },
      watch: {
        default: 'nps test.watch.web test.watch.api',
        web: `cd ${webPath} && npm run test:ci`,
        api: `cd ${apiPath} && npm run test:watch`,
      },
    },
    prisma: {
      generate: `cd ${apiPath} && npx prisma generate`,
      studio: `cd ${apiPath} && npx prisma studio`,
      migrate: {
        dev: `cd ${apiPath} && npx prisma migrate dev`,
      },
      seed: `cd ${apiPath} && npx prisma db seed`,
    },
    build: {
      default: 'npx turbo run build',
      ci: {
        web: 'cd out && npm run build',
        api: 'cd out && npm run build',
      },
    },
    docker: {
      build: {
        default: 'nps docker.build.web docker.build.api',
        web: `docker build -t web . -f ${webPath}/Dockerfile`,
        api: `docker build -t api . -f ${apiPath}/Dockerfile`,
      },
    },
    dev: 'npx turbo run dev',
  },
};
