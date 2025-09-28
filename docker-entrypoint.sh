#!/bin/sh
set -e

echo "📦 Waiting for Postgres (${POSTGRES_HOST:-postgres}:5432) to be ready..."
until nc -z ${POSTGRES_HOST:-postgres} 5432; do
  echo "⏳ Postgres is unavailable - sleeping"
  sleep 2
done

echo "📦 Running Prisma migrations..."
pnpm prisma migrate deploy

echo "🚀 Starting Keystone..."
pnpm start