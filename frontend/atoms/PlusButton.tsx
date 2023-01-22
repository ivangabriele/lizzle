import { SymbolButton } from './SymbolButton'

import type { SymbolButtonProps } from './SymbolButton'

export function PlusButton(props: SymbolButtonProps) {
  return <SymbolButton {...props}>+</SymbolButton>
}
