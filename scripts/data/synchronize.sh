#!/bin/bash

# Exit when any command fails:
set -e

# Load .env file
if [ -f "./.env" ]; then
  export $(egrep -v '^#' ./.env | xargs) > /dev/null
fi

readonly FILE_BZ2_PATH="./${LICHESS_PUZZLES_DATA_FILENAME}.csv.bz2"
readonly FILE_CSV_PATH="./${LICHESS_PUZZLES_DATA_FILENAME}.csv"
# https://database.lichess.org
readonly FILE_URL="https://database.lichess.org/${LICHESS_PUZZLES_DATA_FILENAME}.csv.bz2"

if [ ! -f $FILE_BZ2_PATH ]; then
  wget --no-check-certificate $FILE_URL
fi

if [ ! -f $FILE_CSV_PATH ]; then
  bzip2 -d $FILE_BZ2_PATH -v
fi

node -r dotenv/config ./scripts/data/synchronizeDatabase.js
rm -f $FILE_BZ2_PATH
rm -f $FILE_CSV_PATH
