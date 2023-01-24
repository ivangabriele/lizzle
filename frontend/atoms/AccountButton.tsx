import styled from 'styled-components'

import { SymbolButton } from './SymbolButton'

import type { SymbolButtonProps } from './SymbolButton'

export function AccountButton({
  isOn,
  ...nativeProps
}: SymbolButtonProps & {
  isOn: boolean
}) {
  return <StyledSymbolButton {...nativeProps}>{`${isOn ? '⚉' : '⚇'}`}</StyledSymbolButton>
}

const StyledSymbolButton = styled(SymbolButton)`
  font-size: 175%;
  padding: 9px 10px 9px;
  width: 48px;
`
