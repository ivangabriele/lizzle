#!/bin/bash

# Exit when any command fails:
set -e

echo "Generating Prisma runtime files..."
yarn db:generate
echo "Building Next.js application..."
yarn next build
echo "Running database migration..."
yarn db:migrate
echo "Synchronizing data..."
yarn data:sync
