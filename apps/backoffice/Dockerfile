FROM node:20-alpine AS base
ENV SCOPE=@avila-tek/admin
RUN apk add --no-cache libc6-compat git
RUN apk update

FROM base AS builder
WORKDIR /app

RUN npm i -g turbo
COPY . .
RUN npx turbo prune ${SCOPE} --docker

FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci --no-audit

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG NEXT_PUBLIC_ENDPOINT
ENV NEXT_PUBLIC_ENDPOINT=$NEXT_PUBLIC_ENDPOINT
RUN npx turbo build --scope=${SCOPE} --filter=${SCOPE} --include-dependencies

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production


# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/backoffice/next.config.js .
COPY --from=installer /app/apps/backoffice/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/backoffice/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/backoffice/.next/static ./apps/backoffice/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/backoffice/public ./apps/backoffice/public

CMD node apps/backoffice/server.js
