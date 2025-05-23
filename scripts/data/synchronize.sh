#!/bin/bash

# Exit when any command fails:
set -e

if [ -z "$CI" ] && [ "${NODE_ENV}" != "production" ]; then
  # Load .env file
  if [ -f "./.env" ]; then
    export $(egrep -v '^#' ./.env | xargs) > /dev/null
  fi
fi

readonly FILE_BZ2_PATH="./tmp/lichess_db_puzzle.csv.bz2"
readonly FILE_CSV_PATH="./tmp/lichess_db_puzzle.csv"
# https://database.lichess.org
readonly FILE_URL="https://database.lichess.org/lichess_db_puzzle.csv.bz2"

if [ ! -d "./tmp" ]; then
  mkdir ./tmp
fi

if [ ! -f $FILE_BZ2_PATH ]; then
  wget --no-check-certificate $FILE_URL -P ./tmp
fi

if [ ! -f $FILE_CSV_PATH ]; then
  bzip2 -d $FILE_BZ2_PATH -v
fi

node -r dotenv/config ./scripts/data/synchronizeDatabase.js
rm -Rf ./tmp
