import { useCallback, useMemo } from 'react'
import styled from 'styled-components'

import type { FEN } from 'chessground/types'
import type { Promisable } from 'type-fest'

export type LastPuzzleProps = {
  fen: FEN
  onClick: (fen: FEN) => Promisable<void>
}
export function LastPuzzle({ fen, onClick }: LastPuzzleProps) {
  const pictureUrl = useMemo(
    () => `https://chessboardimage.com/${fen.replace(/\//g, '').replace(/ b$/, '-flip').replace(/ w$/, '')}.png`,
    [fen],
  )

  const handleClick = useCallback(() => {
    onClick(fen)
  }, [fen, onClick])

  return <Picture onClick={handleClick} src={pictureUrl} />
}

const Picture = styled.img`
  cursor: pointer;
  opacity: 0.125;
  transition: opacity 0.5s ease-in-out;
  width: 100%;

  :hover {
    opacity: 0.75;
  }
`
