import type { LocalStoragePuzzleKey } from './constants'

export type LocalStoragePuzzleValue = Partial<{
  [LocalStoragePuzzleKey.LEVEL_RANGE]: [number, number]
}>
