# Lova To-Do — ту ду лист пары
# Multi-stage: build → run

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p public

ENV NEXT_TELEMETRY_DISABLED=1
# Нужен для пререндера главной страницы при next build (реальный URL задаётся в runtime)
ENV DATABASE_URL="file:/tmp/prisma-dev.db"
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

RUN npm install -g prisma@6.19.2

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DATABASE_URL="file:/data/prisma/dev.db"

ENTRYPOINT ["/bin/sh", "-c", "mkdir -p /data/prisma && prisma migrate deploy --schema=./prisma/schema.prisma && node server.js"]
