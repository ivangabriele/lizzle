import { prisma } from '@backend/libs/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function PuzzleListEndpoint(req: NextApiRequest, res: NextApiResponse) {
  try {
    const puzzles = await prisma.puzzle.findMany({
      skip: 0,
      take: 10,
    })

    res.status(200).json({
      data: puzzles,
      hasError: false,
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.debug('[pages/api/puzzles/index.ts]', '[ERROR]', String(err))
    // eslint-disable-next-line no-console
    console.debug('[pages/api/puzzles/index.ts]', '[DEBUG]', err)

    res.status(400).json({
      hasError: true,
      message: 'Something went wrong.',
      status: 400,
    })
  }
}
