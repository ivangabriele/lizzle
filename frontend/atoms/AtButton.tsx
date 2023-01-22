import styled from 'styled-components'

import { SymbolButton } from './SymbolButton'

import type { SymbolButtonProps } from './SymbolButton'

export function AtButton(props: SymbolButtonProps) {
  return <StyledSymbolButton {...props}>@</StyledSymbolButton>
}

const StyledSymbolButton = styled(SymbolButton)`
  font-size: 150%;
  padding: 2px 10px 8px;
  width: 48px;
`
