import { B } from 'bhala'
import csvtojson from 'csvtojson'
import { getAbsolutePath } from 'esm-path'
import { createReadStream } from 'fs'

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

const { LICHESS_PUZZLES_DATA_FILENAME } = process.env

const prisma = new PrismaClient()

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
  const maybePuzzleCount = await prisma.puzzle.count({
    where: {
      originalId: jsonPuzzle.PuzzleId,
    },
  })
  if (maybePuzzleCount === 1) {
    B.warn(`Puzzle ${jsonPuzzle.PuzzleId} is already processed.`)

    return
  }

  B.info(`Puzzle ${jsonPuzzle.PuzzleId} is processing...`)
  const puzzle = convertJsonPuzzleToPuzzle(jsonPuzzle)
  await prisma.puzzle.create({
    data: puzzle,
  })
}

const fileCsvPath = getAbsolutePath(import.meta.url, `../../${LICHESS_PUZZLES_DATA_FILENAME}.csv`)
const config = {
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
const fileCsvStream = createReadStream(fileCsvPath)
await csvtojson(config)
  .fromStream(fileCsvStream)
  .subscribe(
    processJsonPuzzle,
    err => {
      B.error(err.message)
      console.error(err)
    },
    () => {
      B.success('Done.')
    },
  )
