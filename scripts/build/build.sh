#!/bin/bash

# Exit when any command fails:
set -e

# Load .env file
if [ -f "./.env" ]; then
  export $(egrep -v '^#' ./.env | xargs) > /dev/null
fi

echo "Generating Prisma runtime files..."
yarn db:generate
echo "Building Next.js application..."
yarn next build
