# ---------------------------
# Stage 1: Dependencies
# ---------------------------
FROM node:20-alpine3.18 AS deps
WORKDIR /app

# Copy only package manager files to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and project dependencies
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

# ---------------------------
# Stage 2: Build Keystone
# ---------------------------
FROM node:20-alpine3.18 AS builder
WORKDIR /app

# Install pnpm in builder stage (needed for build commands)
RUN npm install -g pnpm

# Install OpenSSL 1.1 compatibility for Prisma on Alpine ARM64
# This provides libssl.so.1.1 and libcrypto.so.1.1
RUN apk add --no-cache openssl1.1-compat

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application source
COPY . .

# Generate Prisma client (must be done after copying schema.prisma)
RUN pnpm prisma generate

# Build Keystone (generates .keystone output)
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

# Copy only the necessary build artifacts and production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.keystone ./.keystone
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/schema.prisma ./schema.prisma

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Ensure images directory exists and is writable by appuser
RUN mkdir -p ./public/images && chown -R appuser:appgroup ./public

# Copy migration entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

USER appuser

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/status || exit 1

ENTRYPOINT ["/app/docker-entrypoint.sh"]