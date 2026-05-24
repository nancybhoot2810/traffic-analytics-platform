#!/bin/sh
set -e

echo "Waiting for database..."
sleep 5

echo "Creating database tables..."
npx prisma db push

echo "Seeding database..."
npx prisma db seed || true

echo "Starting backend..."
npm run start:dev