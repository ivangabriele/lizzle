#!/bin/bash

# Exit when any command fails:
set -e

echo "Generating Prisma runtime files..."
yarn db:generate
echo "Building Next.js application..."
yarn next build
