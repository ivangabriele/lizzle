import { XButton } from '@frontend/atoms/XButton'
import { LocalStorageNamespace, LocalStoragePuzzleKey } from '@frontend/constants'
import { useDebouncedValue } from '@frontend/hooks/useDebouncedValue'
import { LocalStorage } from '@frontend/libs/LocalStorage'
import { LevelControl } from '@frontend/organisms/LevelControl'
import { PuzzleInfo } from '@frontend/organisms/PuzzleInfo'
import { Toolbar } from '@frontend/organisms/Toolbar'
import ky, { HTTPError } from 'ky'
import dynamic from 'next/dynamic'
import { last } from 'ramda'
import { ComponentType, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ClockLoader } from 'react-spinners'
import styled from 'styled-components'

import type { BoardProps } from '@frontend/organisms/Board'
import type { LocalStoragePuzzleValue } from '@frontend/types'
import type { Puzzle } from '@prisma/generations'
import type { FEN } from 'chessground/types'

const ANALYSIS_BASE_URL = 'https://lichess.org/analysis'
const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const PRELOADED_PUZZLES_LENGTH = 12

const DynamicBoard: ComponentType<BoardProps> = dynamic(
  (): any => import('@frontend/organisms/Board').then(module => module.Board),
  {
    ssr: false,
  },
)

export default function HomePage() {
  const analysisFen = useRef<FEN>(DEFAULT_FEN)
  const isAnalysisFenLoaded = useRef(false)
  const localStorage = useRef(new LocalStorage())
  const puzzles = useRef<Puzzle[]>([])

  const [analysisUrl, setAnalysisUrl] = useState<string>(ANALYSIS_BASE_URL)
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [levelRange, setLevelRange] = useState<[number, number]>([1000, 1500])
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | undefined>()

  const boardKey = useMemo(() => (currentPuzzle ? currentPuzzle.fen : 'undefined'), [currentPuzzle])
  const debouncedLevelRange = useDebouncedValue(levelRange, 500)

  const closeAnalysis = useCallback(async () => {
    setIsAnalysisOpen(false)
  }, [])

  const openAnalysis = useCallback(async () => {
    if (!currentPuzzle) {
      return
    }

    const nextAnalysisUrl = `${ANALYSIS_BASE_URL}/standard/${analysisFen.current.replace(/ /g, '_')}`

    setAnalysisUrl(nextAnalysisUrl)
    setIsAnalysisOpen(true)
  }, [currentPuzzle])

  const loadRandomPuzzles = useCallback(
    async (isPreload: boolean = false) => {
      if (!isPreload) {
        setIsLoading(true)
      }

      try {
        const path = 'api/puzzles/random'
        const responseData = await ky
          .get(path, {
            searchParams: {
              length: PRELOADED_PUZZLES_LENGTH,
              maxRating: debouncedLevelRange[1],
              minRating: debouncedLevelRange[0],
            },
          })
          .json<
            | {
                data: Puzzle[]
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

        if (isPreload) {
          puzzles.current = [...puzzles.current, ...responseData.data]
        } else {
          puzzles.current = responseData.data
        }
      } catch (err) {
        if (err instanceof HTTPError) {
          console.info('API Error:', (await err.response.json()).message)
        } else {
          console.info('Unknown Error:', err)
        }
      }

      if (!isPreload) {
        setIsLoading(false)
      }
    },
    [debouncedLevelRange],
  )

  const loadNextPuzzle = useCallback(() => {
    const nextPuzzle = last(puzzles.current)
    if (!nextPuzzle) {
      console.error('No puzzle anymore. This should never happen.')

      return
    }

    puzzles.current = puzzles.current.slice(0, puzzles.current.length - 1)

    analysisFen.current = DEFAULT_FEN
    isAnalysisFenLoaded.current = false

    if (puzzles.current.length < 10) {
      loadRandomPuzzles(true)
    }

    setCurrentPuzzle(nextPuzzle)
  }, [loadRandomPuzzles])

  const updateAnalysisFen = useCallback((nextFen: FEN) => {
    if (isAnalysisFenLoaded.current) {
      return
    }

    analysisFen.current = nextFen
    isAnalysisFenLoaded.current = true
  }, [])

  const updateLevelRange = useCallback((nextLevelRange: [number, number]) => {
    setLevelRange(nextLevelRange)

    localStorage.current.set<LocalStoragePuzzleValue>(
      LocalStorageNamespace.PUZZLE,
      LocalStoragePuzzleKey.LEVEL_RANGE,
      nextLevelRange,
    )
  }, [])

  useEffect(() => {
    if (!isReady) {
      return
    }

    ;(async () => {
      await loadRandomPuzzles()

      loadNextPuzzle()
    })()
  }, [debouncedLevelRange, isReady, loadNextPuzzle, loadRandomPuzzles])

  useEffect(() => {
    const cachedLevelRange = localStorage.current.get<LocalStoragePuzzleValue>(
      LocalStorageNamespace.PUZZLE,
      LocalStoragePuzzleKey.LEVEL_RANGE,
    )
    if (cachedLevelRange) {
      setLevelRange(cachedLevelRange)
    }

    setIsReady(true)
  }, [])

  return (
    <Background>
      <Box>
        <Main>
          {(isLoading || !currentPuzzle) && <ClockLoader size={80} />}

          {!isLoading && currentPuzzle !== undefined && (
            <DynamicBoard
              key={boardKey}
              fen={currentPuzzle.fen}
              isPuzzle
              moves={currentPuzzle.moves}
              onChange={updateAnalysisFen}
              onEnd={loadNextPuzzle}
            />
          )}
        </Main>

        <Footer>
          {isReady && <Toolbar onAnalysisRequest={openAnalysis} />}
          {currentPuzzle !== undefined && <PuzzleInfo puzzle={currentPuzzle} />}
          {isReady && <LevelControl defaultValue={debouncedLevelRange} onChange={updateLevelRange} />}
        </Footer>

        {isAnalysisOpen && (
          <AnalysisBox>
            <AnalysisCloseButton onClick={closeAnalysis} />
            <AnalysisFrame src={analysisUrl} />
          </AnalysisBox>
        )}
      </Box>
    </Background>
  )
}

const Background = styled.div`
  background: inherit;
  flex-grow: 1;

  :before {
    background: inherit;
    bottom: -4rem;
    content: '';
    filter: blur(2rem) saturate(2);
    left: -4rem;
    position: absolute;
    right: -4rem;
    top: -4rem;
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  position: absolute;
  width: 100%;
`

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem 2rem;
`

const AnalysisBox = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  height: 100%;
  /* left: 10%; */
  padding: 10%;
  position: absolute;
  /* top: 10%; */
  width: 100%;
  z-index: 100;
`

const AnalysisFrame = styled.iframe`
  height: 100%;
  width: 100%;
`

const AnalysisCloseButton = styled(XButton)`
  position: absolute;
  right: 5%;
  top: 5%;
`
