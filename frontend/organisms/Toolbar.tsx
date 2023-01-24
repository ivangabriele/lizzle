import { AccountButton } from '@frontend/atoms/AccountButton'
import { AtButton } from '@frontend/atoms/AtButton'
import styled from 'styled-components'

import type { Promisable } from 'type-fest'

export type ToolbarProps = {
  isAuthenticated: boolean
  onAnalysisRequest: () => Promisable<void>
  onLoginRequest: () => Promisable<void>
}
export function Toolbar({ isAuthenticated, onAnalysisRequest, onLoginRequest }: ToolbarProps) {
  return (
    <Box>
      <AtButton onClick={onAnalysisRequest} />
      <AccountButton isOn={isAuthenticated} onClick={() => (isAuthenticated ? () => undefined : onLoginRequest())} />
    </Box>
  )
}

const Box = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 6rem;
  width: 16rem;
`
