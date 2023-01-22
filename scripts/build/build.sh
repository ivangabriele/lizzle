#!/bin/bash

# Exit when any command fails:
set -e

# Load .env file
if [ -f "./.env" ]; then
  export $(egrep -v '^#' ./.env | xargs) > /dev/null
fi

if [ "${NODE_ENV}" == "production" ]; then
  echo "Removing .env file..."
  rm -f ./.env
fi

echo "Generating Prisma runtime files..."
yarn db:generate
echo "Building Next.js app..."
yarn next build
