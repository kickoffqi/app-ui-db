# apps/frontend/Dockerfile
# Next.js (standalone) multi-stage build

# 1) deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# 2) build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Ensure Next produces a minimal standalone server
# next.config.js should set: output: 'standalone'
RUN npm run build

# 3) runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

# The standalone build includes server.js at repo root of standalone output
CMD ["node", "server.js"]
