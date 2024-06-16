FROM node:20-alpine AS base
ENV SCOPE=@avila-tek/api
RUN apk add --no-cache libc6-compat git
RUN apk update



FROM base AS builder
WORKDIR /app
COPY . .
RUN npx turbo prune ${SCOPE} --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci --no-audit

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json


RUN npx turbo build --scope=${SCOPE} --filter=${SCOPE} --include-dependencies

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

EXPOSE ${PORT}

CMD node apps/api/dist/index.js
