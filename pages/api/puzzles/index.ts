import { prisma } from '@backend/libs/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function PuzzleListEndpoint(req: NextApiRequest, res: NextApiResponse) {
  const puzzles = await prisma.puzzle.findMany({
    skip: 0,
    take: 10,
  })

  res.status(200).json({
    data: puzzles,
    hasError: false,
  })
}
