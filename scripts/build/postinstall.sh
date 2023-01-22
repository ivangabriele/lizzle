#!/bin/bash

# Exit when any command fails:
set -e

# Load .env file
if [ -f "./.env" ]; then
  export $(egrep -v '^#' ./.env | xargs) > /dev/null
fi

if [ -z "$CI" ] && [ "${NODE_ENV}" != "production" ]; then
  cp ./.env.example ./.env
  yarn husky install
fi

yarn db:generate
