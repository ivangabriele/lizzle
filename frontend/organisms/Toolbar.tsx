import { AtButton } from '@frontend/atoms/AtButton'
import styled from 'styled-components'

import type { Promisable } from 'type-fest'

export type ToolbarProps = {
  onAnalysisRequest: () => Promisable<void>
}
export function Toolbar({ onAnalysisRequest }: ToolbarProps) {
  return (
    <Box>
      <AtButton onClick={onAnalysisRequest} />
    </Box>
  )
}

const Box = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 6rem;
  width: 16rem;
`
