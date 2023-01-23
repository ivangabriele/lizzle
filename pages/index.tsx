import { XButton } from '@frontend/atoms/XButton'
import { LocalStorageNamespace, LocalStoragePuzzleKey } from '@frontend/constants'
import { useDebouncedValue } from '@frontend/hooks/useDebouncedValue'
import { usePrevious } from '@frontend/hooks/usePrevious'
import { LocalStorage } from '@frontend/libs/LocalStorage'
import { LastPuzzle } from '@frontend/organisms/LastPuzzle'
import { LevelControl } from '@frontend/organisms/LevelControl'
import { PuzzleInfo } from '@frontend/organisms/PuzzleInfo'
import { Toolbar } from '@frontend/organisms/Toolbar'
import ky, { HTTPError } from 'ky'
import dynamic from 'next/dynamic'
import { last } from 'ramda'
import { ComponentType, useCallback, useEffect, useRef, useState } from 'react'
import { ClockLoader } from 'react-spinners'
import styled from 'styled-components'

import type { BoardProps } from '@frontend/organisms/Board'
import type { LocalStoragePuzzleValue } from '@frontend/types'
import type { Puzzle } from '@prisma/generations'
import type { FEN } from 'chessground/types'

const ANALYSIS_BASE_URL = 'https://lichess.org/analysis'
const DEFAULT_LEVEL_RANGE: [number, number] = [1000, 1500]
const PRELOADED_PUZZLES_LENGTH = 12

const DynamicBoard: ComponentType<BoardProps> = dynamic(
  (): any => import('@frontend/organisms/Board').then(module => module.Board),
  {
    ssr: false,
  },
)

export default function HomePage() {
  const isAnalysisFenLoaded = useRef(false)
  const localStorage = useRef(new LocalStorage())
  const puzzles = useRef<Puzzle[]>([])

  const [analysisUrl, setAnalysisUrl] = useState<string>(ANALYSIS_BASE_URL)
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [levelRange, setLevelRange] = useState<[number, number] | undefined>(undefined)
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | undefined>()
  const [currentPuzzleAnalysisFen, setCurrentPuzzleAnalysisFen] = useState<FEN | undefined>(undefined)

  const debouncedLevelRange = useDebouncedValue(levelRange, 500)
  const lastPuzzleAnalysisFen = usePrevious(currentPuzzleAnalysisFen)

  const closeAnalysis = useCallback(() => {
    setIsAnalysisOpen(false)
  }, [])

  const openAnalysis = useCallback((fen: FEN) => {
    const nextAnalysisUrl = `${ANALYSIS_BASE_URL}/standard/${fen.replace(/ /g, '_')}`

    setAnalysisUrl(nextAnalysisUrl)
    setIsAnalysisOpen(true)
  }, [])

  const loadRandomPuzzles = useCallback(
    async (isPreload: boolean = false) => {
      if (!debouncedLevelRange) {
        return
      }

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

    isAnalysisFenLoaded.current = false

    if (puzzles.current.length < 10) {
      loadRandomPuzzles(true)
    }

    setCurrentPuzzle(nextPuzzle)
  }, [loadRandomPuzzles])

  const updateCurrentPuzzleAnalysisFen = useCallback((nextFen: FEN) => {
    if (isAnalysisFenLoaded.current) {
      return
    }

    isAnalysisFenLoaded.current = true

    setCurrentPuzzleAnalysisFen(nextFen)
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
    if (!debouncedLevelRange) {
      return
    }

    ;(async () => {
      await loadRandomPuzzles()

      loadNextPuzzle()
    })()
  }, [debouncedLevelRange, loadNextPuzzle, loadRandomPuzzles])

  useEffect(() => {
    const cachedLevelRange = localStorage.current.get<LocalStoragePuzzleValue>(
      LocalStorageNamespace.PUZZLE,
      LocalStoragePuzzleKey.LEVEL_RANGE,
    )
    if (cachedLevelRange) {
      setLevelRange(cachedLevelRange)
    } else {
      localStorage.current.set(LocalStorageNamespace.PUZZLE, LocalStoragePuzzleKey.LEVEL_RANGE, DEFAULT_LEVEL_RANGE)

      setLevelRange(DEFAULT_LEVEL_RANGE)
    }
  }, [])

  return (
    <Background>
      <Box>
        <Main>
          <Board>
            {(isLoading || !currentPuzzle) && <ClockLoader size={80} />}

            {!isLoading && currentPuzzle !== undefined && (
              <DynamicBoard
                fen={currentPuzzle.fen}
                isPuzzle
                moves={currentPuzzle.moves}
                onChange={updateCurrentPuzzleAnalysisFen}
                onEnd={loadNextPuzzle}
              />
            )}
          </Board>

          <Sidebar>
            {lastPuzzleAnalysisFen !== undefined && <LastPuzzle fen={lastPuzzleAnalysisFen} onClick={openAnalysis} />}
          </Sidebar>
        </Main>

        <Footer>
          {currentPuzzleAnalysisFen && <Toolbar onAnalysisRequest={() => openAnalysis(currentPuzzleAnalysisFen)} />}
          {currentPuzzle !== undefined && <PuzzleInfo puzzle={currentPuzzle} />}
          {debouncedLevelRange && <LevelControl defaultValue={debouncedLevelRange} onChange={updateLevelRange} />}
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
  display: flex;
  flex-grow: 1;
  padding: 2rem;
`

const Board = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
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
