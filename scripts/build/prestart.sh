#!/bin/bash

# Exit when any command fails:
set -e

echo "Running database migration..."
yarn db:migrate
echo "Synchronizing data..."
yarn data:sync
