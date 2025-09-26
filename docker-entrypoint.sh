#!/bin/sh
set -e

echo "📦 Waiting for Postgres to be ready..."
until nc -z postgres 5432; do
  sleep 1
done

echo "📦 Running Prisma migrations..."
pnpm prisma migrate deploy

echo "🚀 Starting Keystone..."
npm start