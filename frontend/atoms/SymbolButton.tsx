import styled from 'styled-components'

import type { ButtonHTMLAttributes } from 'react'

export type SymbolButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
export const SymbolButton = styled.button`
  background-color: transparent;
  border: solid 1px #ffffff;
  border-radius: 50%;
  color: #ffffff;
  font-size: 112.5%;
  font-weight: 600;
  opacity: 0.125;
  padding: 0;
  width: 29px;

  :hover:not(:disabled) {
    opacity: 1;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0;
  }
`
