import { MinusButton } from '@frontend/atoms/MinusButton'
import { PlusButton } from '@frontend/atoms/PlusButton'
import numeral from 'numeral'
import { useCallback, useState } from 'react'
import styled from 'styled-components'

import type { Promisable } from 'type-fest'

const BOTTOM_LEVEL = 600
const STEP_LEVEL = 100
const TOP_LEVEL = 3000

export type LevelControlProps = {
  defaultValue: [number, number]
  onChange: (nextLevelRange: [number, number]) => Promisable<void>
}
export function LevelControl({ defaultValue, onChange }: LevelControlProps) {
  if (defaultValue[0] < BOTTOM_LEVEL) {
    throw new Error(`The minimum level can't be less than ${BOTTOM_LEVEL}.`)
  }
  if (defaultValue[1] > TOP_LEVEL) {
    throw new Error(`The maximum level can't be less than ${TOP_LEVEL}.`)
  }

  const [minLevel, setMinLevel] = useState(defaultValue[0])
  const [maxLevel, setMaxLevel] = useState(defaultValue[1])

  const decreaseMinLevel = useCallback(() => {
    const nextMinLevel = minLevel - STEP_LEVEL
    if (nextMinLevel < BOTTOM_LEVEL) {
      return
    }

    setMinLevel(nextMinLevel)

    onChange([nextMinLevel, maxLevel])
  }, [maxLevel, minLevel, onChange])

  const increaseMinLevel = useCallback(() => {
    const nextMinLevel = minLevel + STEP_LEVEL
    if (nextMinLevel >= maxLevel) {
      return
    }

    setMinLevel(nextMinLevel)

    onChange([nextMinLevel, maxLevel])
  }, [maxLevel, minLevel, onChange])

  const decreaseMaxLevel = useCallback(() => {
    const nextMaxLevel = maxLevel - STEP_LEVEL
    if (nextMaxLevel <= minLevel) {
      return
    }

    setMaxLevel(nextMaxLevel)

    onChange([minLevel, nextMaxLevel])
  }, [maxLevel, minLevel, onChange])

  const increaseMaxLevel = useCallback(() => {
    const nextMaxLevel = maxLevel + STEP_LEVEL
    if (nextMaxLevel > TOP_LEVEL) {
      return
    }

    setMaxLevel(nextMaxLevel)

    onChange([minLevel, nextMaxLevel])
  }, [maxLevel, minLevel, onChange])

  return (
    <Box>
      <LevelBox>
        <MinusButton disabled={minLevel <= BOTTOM_LEVEL} onClick={decreaseMinLevel} />
        <span>{numeral(minLevel).format('0000,0')}</span>
        <PlusButton disabled={minLevel === maxLevel - STEP_LEVEL} onClick={increaseMinLevel} />
      </LevelBox>
      <LevelBox>
        <MinusButton disabled={maxLevel <= minLevel + STEP_LEVEL} onClick={decreaseMaxLevel} />
        <span>{numeral(maxLevel).format('0000,0')}</span>
        <PlusButton disabled={maxLevel >= TOP_LEVEL} onClick={increaseMaxLevel} />
      </LevelBox>
    </Box>
  )
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 6rem;
  width: 16rem;
`

const LevelBox = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  > button {
    margin-top: 3px;
  }

  > span {
    font-family: 'Azeret Mono', monospace;
    font-size: 250%;
    line-height: 1;
    margin: 0 1rem;
    opacity: 0.25;
    text-align: right;
  }
`
