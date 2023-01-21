import { prisma } from '@backend/libs/prisma'
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
  if (!puzzles.length) {
    res.status(404).json({
      hasError: true,
      message: 'Not puzzle available.',
      status: 404,
    })

    return
  }

  const puzzle = puzzles[0]

  res.status(200).json({
    data: puzzle,
    hasError: false,
  })
}
