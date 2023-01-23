#!/bin/bash

# Exit when any command fails:
set -e

if [ "${NODE_ENV}" = "production" ]; then
  echo "Removing .env file..."
  rm -f ./.env
fi

# echo "Running database migration..."
# yarn db:migrate
# yarn data:sync
yarn next start
