import numeral from 'numeral'
import styled from 'styled-components'

import type { Puzzle } from '@prisma/generations'

export type PuzzleInfoProps = {
  puzzle: Puzzle
}
export function PuzzleInfo({ puzzle }: PuzzleInfoProps) {
  return (
    <Box>
      <span>{numeral(puzzle.rating).format('0000,0')}</span>
    </Box>
  )
}

const Box = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 6rem;
  width: 16rem;

  > span {
    font-family: 'Azeret Mono', monospace;
    font-size: 400%;
    line-height: 1;
    margin: 0 1rem;
    opacity: 0.25;
    text-align: right;
  }
`
