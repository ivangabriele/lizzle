import { Engine, EngineState } from '@app/libs/Engine'
import { Chessground } from 'chessground'
import { map, mergeDeepRight } from 'ramda'
import { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

import type { Api } from 'chessground/api'
import type { Config } from 'chessground/config'
import type { FEN, Key } from 'chessground/types'

const Box = styled.div`
  height: 40rem;
  width: 40rem;

  > div {
    height: 100%;
    width: 100%;
  }

  .last-move {
    background-color: rgba(255, 255, 255, 0.25);
  }
`

const DEFAULT_CONFIG: Config & {
  fen: FEN
} = {
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

const convertMoveToPair = (move: string): Key[] => move.match(/.{2}/g) as any

export type BoardProps = {
  fen?: FEN
  isPuzzle?: boolean
  moves?: string[]
  onEnd: () => void
}
export function Board(props: BoardProps) {
  const { fen = DEFAULT_CONFIG.fen, isPuzzle = false, moves, onEnd } = props
  const movesAsPairs = map(convertMoveToPair)(moves || [])

  const anchorElementRef = useRef<HTMLDivElement | null>(null)
  const boxElementRef = useRef<HTMLDivElement | null>(null)
  const chessgroundRef = useRef<Api | undefined>()
  const engineRef = useRef<Engine>(new Engine(fen, isPuzzle))
  const moveIndexRef = useRef<number>(0)
  const soundRef = useRef<Record<EngineState, HTMLAudioElement>>({
    [EngineState.CAPTURE]: new Audio('/sounds/capture.ogg'),
    [EngineState.CHECK]: new Audio('/sounds/silence.ogg'),
    [EngineState.DEFEAT]: new Audio('/sounds/defeat.ogg'),
    [EngineState.DRAW]: new Audio('/sounds/draw.ogg'),
    [EngineState.MOVE]: new Audio('/sounds/move.ogg'),
    [EngineState.VICTORY]: new Audio('/sounds/victory.ogg'),
  })

  const cancelPlayerMove = useCallback(() => {
    if (!chessgroundRef.current) {
      return
    }

    const failureAudio = new Audio('/sounds/failure.ogg')
    failureAudio.play()

    chessgroundRef.current.set({
      fen: engineRef.current.fen,
      movable: {
        dests: engineRef.current.getDestinations(),
      },
    })
  }, [props])

  const checkPlayerMove = useCallback(
    (playerFrom: Key, playerTo: Key) => {
      if (!chessgroundRef.current) {
        return
      }

      const [expectedFrom, expectedTo] = movesAsPairs[moveIndexRef.current]
      if (isPuzzle && (playerFrom !== expectedFrom || playerTo !== expectedTo)) {
        cancelPlayerMove()

        return
      }

      engineRef.current.move(playerFrom as any, playerTo as any)
      moveIndexRef.current += 1

      if (moveIndexRef.current === movesAsPairs.length) {
        if (isPuzzle) {
          const confirmationAudio = new Audio('/sounds/confirmation.ogg')
          confirmationAudio.play()
        } else {
          soundRef.current[engineRef.current.state].play()
        }

        setTimeout(onEnd, 500)

        return
      }

      soundRef.current[engineRef.current.state].play()

      if (isPuzzle) {
        playOponentMove()

        return
      }

      chessgroundRef.current.set({
        movable: {
          dests: engineRef.current.getDestinations(),
        },
      })
    },
    [props],
  )

  const playOponentMove = useCallback(() => {
    if (!chessgroundRef.current) {
      return
    }

    const [oponentFrom, oponentTo] = movesAsPairs[moveIndexRef.current]
    engineRef.current.move(oponentFrom as any, oponentTo as any)
    soundRef.current[engineRef.current.state].play()
    chessgroundRef.current.move(oponentFrom, oponentTo)
    chessgroundRef.current.set({
      movable: {
        dests: engineRef.current.getDestinations(),
      },
    })

    moveIndexRef.current += 1
  }, [props])

  useEffect(() => {
    if (!anchorElementRef.current || !boxElementRef.current) {
      return
    }

    const size = Math.round(window.screen.height * 0.75)
    boxElementRef.current.style.height = `${size}px`
    boxElementRef.current.style.width = `${size}px`

    const customConfig: Config = {
      fen,
      movable: {
        dests: engineRef.current.getDestinations(),
        events: {
          after: checkPlayerMove,
        },
      },
      orientation: engineRef.current.initialTurnColor,
    }
    const config: Config = mergeDeepRight(DEFAULT_CONFIG, customConfig) as any
    chessgroundRef.current = Chessground(anchorElementRef.current, config)
    moveIndexRef.current = 0

    if (isPuzzle && movesAsPairs.length) {
      playOponentMove()
    }
  }, [props])

  return (
    <Box ref={boxElementRef}>
      <div ref={anchorElementRef} />
    </Box>
  )
}
