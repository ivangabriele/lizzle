import { usePrevious } from '@frontend/hooks/usePrevious'
import { AudioPlayer, AudioPlayerCustomSound } from '@frontend/libs/AudioPlayer'
import { Chessground } from 'chessground'
import { Game } from 'frontend/libs/Game'
import { map, mergeDeepRight } from 'ramda'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'

import type { Api as ChessgroundApi } from 'chessground/api'
import type { Config as ChessgroundConfig } from 'chessground/config'
import type { FEN, Key } from 'chessground/types'
import type { Promisable } from 'type-fest'

const DEFAULT_CONFIG: ChessgroundConfig & {
  fen: FEN
} = {
  coordinates: false,
  fen: 'k7/7R/6Q1/8/8/8/8/7K w - - 0 1',
  highlight: {
    check: true,
    lastMove: true,
  },
  movable: {
    free: false,
    showDests: false,
  },
}

const audioPlayer = new AudioPlayer()
const convertMoveToPair = (move: string): Key[] => move.match(/.{2}/g) as any

export type BoardProps = {
  fen: FEN
  isPuzzle?: boolean
  moves?: string[]
  onChange: (nextFen: FEN) => Promisable<void>
  onEnd: () => Promisable<void>
}
export function Board({ fen, isPuzzle = false, moves, onChange, onEnd }: BoardProps) {
  // eslint-disable-next-line no-null/no-null
  const anchorElementRef = useRef<HTMLDivElement | null>(null)
  // eslint-disable-next-line no-null/no-null
  const boxElementRef = useRef<HTMLDivElement | null>(null)
  const chessgroundRef = useRef<ChessgroundApi | undefined>(undefined)
  const gameRef = useRef<Game>(new Game(fen, isPuzzle))
  const isFirstLoadRef = useRef(true)
  const moveIndexRef = useRef<number>(0)

  const movesAsPairs = useMemo(() => map(convertMoveToPair)(moves || []), [moves])
  const previousFen = usePrevious(fen)

  const cancelPlayerMove = useCallback(() => {
    if (!chessgroundRef.current) {
      return
    }

    audioPlayer.play(AudioPlayerCustomSound.CONFIRMATION)

    chessgroundRef.current.set({
      fen: gameRef.current.fen,
      movable: {
        dests: gameRef.current.getDestinations(),
      },
    })
  }, [])

  const playOponentMove = useCallback(() => {
    if (!chessgroundRef.current) {
      return
    }

    const [oponentFrom, oponentTo] = movesAsPairs[moveIndexRef.current]
    gameRef.current.move(oponentFrom as any, oponentTo as any)
    audioPlayer.play(gameRef.current.state)
    chessgroundRef.current.move(oponentFrom, oponentTo)
    chessgroundRef.current.set({
      movable: {
        dests: gameRef.current.getDestinations(),
      },
    })

    const nextFen = chessgroundRef.current.getFen()

    moveIndexRef.current += 1

    onChange(nextFen)
  }, [movesAsPairs, onChange])

  const checkPlayerMove = useCallback(
    (playerFrom: Key, playerTo: Key) => {
      if (!chessgroundRef.current) {
        return
      }

      const [expectedFrom, expectedTo] = movesAsPairs[moveIndexRef.current]
      if (isPuzzle && (playerFrom !== expectedFrom || playerTo !== expectedTo)) {
        console.info('Expected Player Move:', expectedFrom, expectedTo)

        cancelPlayerMove()

        return
      }

      gameRef.current.move(playerFrom as any, playerTo as any)
      moveIndexRef.current += 1

      const nextFen = chessgroundRef.current.getFen()
      onChange(nextFen)

      if (moveIndexRef.current === movesAsPairs.length) {
        if (isPuzzle) {
          audioPlayer.play(AudioPlayerCustomSound.CONFIRMATION, 0.1)
        } else {
          audioPlayer.play(gameRef.current.state)
        }

        setTimeout(onEnd, 500)

        return
      }

      audioPlayer.play(gameRef.current.state)

      if (isPuzzle) {
        playOponentMove()

        return
      }

      chessgroundRef.current.set({
        movable: {
          dests: gameRef.current.getDestinations(),
        },
      })
    },
    [cancelPlayerMove, isPuzzle, movesAsPairs, onChange, onEnd, playOponentMove],
  )

  useEffect(() => {
    if (!anchorElementRef.current || !boxElementRef.current) {
      return
    }

    if (isFirstLoadRef.current) {
      const size = Math.round(window.screen.height * 0.67)
      boxElementRef.current.style.alignItems = `center`
      boxElementRef.current.style.height = `${size}px`
      boxElementRef.current.style.width = `${size}px`

      isFirstLoadRef.current = false
    }

    const nextGame = new Game(fen, isPuzzle)

    const nextChessgroundCustomConfig: ChessgroundConfig = {
      fen,
      movable: {
        // color: gameRef.current.initialTurnColor,
        dests: gameRef.current.getDestinations(),
        events: {
          after: checkPlayerMove,
        },
      },
      orientation: gameRef.current.initialTurnColor,
    }
    const nextChessgroundConfig: ChessgroundConfig = mergeDeepRight(DEFAULT_CONFIG, nextChessgroundCustomConfig) as any
    const nextChessground = Chessground(anchorElementRef.current, nextChessgroundConfig)

    chessgroundRef.current = nextChessground
    gameRef.current = nextGame
    moveIndexRef.current = 0

    if (isPuzzle && movesAsPairs.length) {
      playOponentMove()
    }
  }, [checkPlayerMove, fen, isPuzzle, movesAsPairs.length, playOponentMove, previousFen])

  return (
    <Box ref={boxElementRef}>
      <div ref={anchorElementRef} />
    </Box>
  )
}

const Box = styled.div`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);

  > div {
    height: 100%;
    width: 100%;
  }

  .last-move {
    background-color: rgba(255, 255, 255, 0.5);
  }
`
