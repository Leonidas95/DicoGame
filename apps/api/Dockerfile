FROM node:18-alpine AS builder
RUN apk update
# Set working directory
WORKDIR /app
RUN  npm install --global turbo
COPY . .
# Only Take packages that are needed to compile this app
RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18-alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
COPY --from=builder /app/turbo.json ./turbo.json
RUN npm ci

FROM node:18-alpine AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN npm run turbo run build --scope=api --include-dependencies --no-deps

FROM node:18-alpine as runner
WORKDIR /app
COPY --from=sourcer /app/ .
CMD ["npm", "start"]
