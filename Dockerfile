# ---------------------------
# Stage 1: Dependencies
# ---------------------------
FROM node:20-alpine3.18 AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# ---------------------------
# Stage 2: Build Keystone
# ---------------------------
FROM node:20-alpine3.18 AS builder
WORKDIR /app
RUN npm install -g pnpm
RUN apk add --no-cache openssl1.1-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate
RUN pnpm build

# ---------------------------
# Stage 3: Production Runner
# ---------------------------
FROM node:20-alpine3.18 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Install OpenSSL 1.1 compatibility for Prisma runtime
RUN apk add --no-cache openssl1.1-compat

# Install pnpm in runtime stage so entrypoint can run pnpm commands
RUN npm install -g pnpm

# Copy built app & dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.keystone ./.keystone
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/schema.prisma ./schema.prisma

# Copy migration entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

ENTRYPOINT ["/app/docker-entrypoint.sh"]