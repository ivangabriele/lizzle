#!/bin/bash

# Exit when any command fails:
set -e

# Load .env file
if [ -f "./.env" ]; then
  export $(egrep -v '^#' ./.env | xargs) > /dev/null
fi

if [ -z "$CI" ] && [ "${NODE_ENV}" != "production" ]; then
  echo "Generating .env file..."
  cp ./.env.example ./.env
  yarn husky install
else
  echo "Removing .env file..."
  rm -f ./.env
fi

echo "Generating Prisma runtime files..."
yarn db:generate
echo "Running database migration..."
yarn db:migrate
