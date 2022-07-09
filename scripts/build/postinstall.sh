#!/bin/bash

# Exit when any command fails:
set -e

# Load .env file
if [ -f "./.env" ]; then
  export $(egrep -v '^#' ./.env | xargs) > /dev/null
fi

yarn pnpify prisma generate

if [ -z "$CI" ] && [ "${NODE_ENV}" != "production" ]; then
  yarn dlx @yarnpkg/sdks
  yarn husky install
fi
