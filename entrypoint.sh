#!/bin/sh

echo "⏳ Waiting for the database to be ready..."
until nc -z postgres 51212; do
  sleep 1
done
echo "✅ Database is ready!"

echo "🚀 Running Prisma migrations..."
npx prisma migrate deploy

echo "🟢 Starting the app..."
exec npm run start:dev
