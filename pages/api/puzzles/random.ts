import { prisma } from '@backend/libs/prisma'

import type { Prisma } from '@prisma/generations'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function PuzzleRandomEndpoint(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { length = 1, maxRating, minRating } = req.query

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
      take: Number(length),
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

    res.status(200).json({
      data: puzzles,
      hasError: false,
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.debug('[pages/api/puzzles/random.ts]', '[ERROR]', String(err))
    // eslint-disable-next-line no-console
    console.debug('[pages/api/puzzles/random.ts]', '[DEBUG]', err)

    res.status(400).json({
      hasError: true,
      message: 'Something went wrong.',
      status: 400,
    })
  }
}
