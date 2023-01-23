import { B } from 'bhala'
import csvtojson from 'csvtojson'
import { getAbsolutePath } from 'esm-path'
import { createReadStream } from 'fs'
import numeral from 'numeral'
import { last } from 'ramda'

// eslint-disable-next-line import/no-relative-packages
import { PrismaClient } from '../../prisma/generations'

/**
 * @typedef {Object} JsonPuzzle
 * @property {string} FEN
 * @property {string} GameUrl
 * @property {string} Moves
 * @property {string} NbPlays
 * @property {string} OpeningFamily
 * @property {string} Popularity
 * @property {string} PuzzleId
 * @property {string} Rating
 * @property {string} RatingDeviation
 * @property {string} Themes
 */

const BATCH_LENGTH = 1024
const CACHE = {
  /** @type {import('../../prisma/generations').Prisma.PuzzleCreateInput[]} */
  puzzles: [],
}
let PUZZLES_COUNT = 0
const LICHESS_PUZZLES_DATA_FILENAME = 'lichess_db_puzzle'

const prisma = new PrismaClient()

async function createPuzzles() {
  const batchLength = CACHE.puzzles.length

  B.info(`Upserting ${numeral(batchLength).format(0, 0)} puzzles (last ID: ${last(CACHE.puzzles).originalId})...`)

  const result = await prisma.puzzle.createMany({
    data: CACHE.puzzles,
    skipDuplicates: true,
  })

  B.success(`${result.count} puzzles inserted.`)

  PUZZLES_COUNT += batchLength
  B.info(`${numeral(PUZZLES_COUNT).format(0, 0)} puzzles processed.`)
}

/**
 * @param {JsonPuzzle} jsonPuzzle
 * @returns {import('../../prisma/generations').Prisma.PuzzleCreateInput}
 */
function convertJsonPuzzleToPuzzle(jsonPuzzle) {
  return {
    fen: jsonPuzzle.FEN,
    moves: jsonPuzzle.Moves.split(' '),
    originalId: jsonPuzzle.PuzzleId,
    rating: Number(jsonPuzzle.Rating),
    themes: jsonPuzzle.Themes.split(' '),
  }
}

/**
 * @param {JsonPuzzle} jsonPuzzle
 * @returns {Promise<void>}
 */
async function processJsonPuzzle(jsonPuzzle) {
  const puzzle = convertJsonPuzzleToPuzzle(jsonPuzzle)

  CACHE.puzzles = [...CACHE.puzzles, puzzle]

  if (CACHE.puzzles.length === BATCH_LENGTH) {
    await createPuzzles()

    CACHE.puzzles = []
  }
}

async function run() {
  const csvFilePath = getAbsolutePath(import.meta.url, `../../tmp/${LICHESS_PUZZLES_DATA_FILENAME}.csv`)
  const csvFileStream = createReadStream(csvFilePath)

  const csvtojsonConfig = {
    // https://database.lichess.org/#puzzles
    headers: [
      'PuzzleId',
      'FEN',
      'Moves',
      'Rating',
      'RatingDeviation',
      'Popularity',
      'NbPlays',
      'Themes',
      'GameUrl',
      'OpeningFamily',
      'OpeningVariation',
    ],
    noheader: true,
  }
  await csvtojson(csvtojsonConfig)
    .fromStream(csvFileStream)
    .subscribe(
      processJsonPuzzle,
      err => {
        B.error(err.message)
        // eslint-disable-next-line no-console
        console.debug(err)
      },
      () => {
        B.success('Done.')
      },
    )

  if (CACHE.puzzles.length > 0) {
    await createPuzzles()
  }
}

run()
