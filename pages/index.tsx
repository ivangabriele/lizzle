import ky, { HTTPError } from 'ky'
import dynamic from 'next/dynamic'
import { ComponentType, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import type { BoardProps } from '@app/molecules/Board'
import type { Puzzle } from '@prisma/generations'

const DynamicBoard: ComponentType<BoardProps> = dynamic(
  (): any => import('@app/molecules/Board').then(module => module.Board),
  {
    ssr: false,
  },
)

const Box = styled.div`
  align-items: center;
  background-color: #000000;
  color: #eeeeee;
  display: flex;
  justify-content: center;
  min-height: 40rem;
  width: 40rem;
`

export default function HomePage() {
  const boxElementRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [randomPuzzle, setRandomPuzzle] = useState<Puzzle | undefined>()

  const key = useMemo(() => (randomPuzzle ? randomPuzzle.fen : 'undefined'), [randomPuzzle])

  const loadRandomPuzzle = useCallback(async () => {
    setIsLoading(true)

    try {
      const path = 'api/puzzles/random'
      const responseData = await ky
        .get(path, {
          searchParams: {
            maxRating: 1500,
            minRating: 1300,
          },
        })
        .json<
          | {
              data: Puzzle
              hasError: false
            }
          | {
              hasError: true
              message: string
              status: number
            }
        >()
      if (responseData.hasError) {
        console.error(responseData.message)

        return
      }

      setRandomPuzzle(responseData.data)
    } catch (err) {
      if (err instanceof HTTPError) {
        console.info('API Error:', (await err.response.json()).message)
      } else {
        console.info('Unknown Error:', err)
      }
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!boxElementRef.current) {
      return
    }

    const size = Math.round(window.screen.height * 0.75)
    boxElementRef.current.style.height = `${size}px`
    boxElementRef.current.style.width = `${size}px`

    loadRandomPuzzle()
  }, [])

  if (!randomPuzzle || isLoading) {
    return <Box ref={boxElementRef}>LOADING...</Box>
  }

  return <DynamicBoard key={key} fen={randomPuzzle.fen} isPuzzle moves={randomPuzzle.moves} onEnd={loadRandomPuzzle} />
}
