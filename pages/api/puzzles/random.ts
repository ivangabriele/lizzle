import { prisma } from '@api/libs/prisma'
import { Prisma } from '@prisma/generations'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function PuzzleRandomEndpoint(req: NextApiRequest, res: NextApiResponse) {
  const { maxRating, minRating } = req.query

  const where: Prisma.PuzzleFindManyArgs['where'] = {
    rating: {
      gte: Number(minRating),
      lte: Number(maxRating),
    },
  }
  const puzzlesCount = await prisma.puzzle.count({ where })
  const skip = Math.floor(Math.random() * puzzlesCount)
  const puzzles = await prisma.puzzle.findMany({
    skip,
    take: 1,
    where,
  })
  const puzzle = puzzles[0]

  res.status(200).json({
    data: puzzle,
    hasError: false,
  })
}
