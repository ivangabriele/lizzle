import { createGlobalStyle } from 'styled-components'

import type { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'

const GlobalStyle: any = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    align-items: center;
    background-color: #111111;
    color: #eeeeee;
    display: flex;
    font-family: sans-serif;
    font-size: 16px;
    height: 100%;
    justify-content: center;
    margin: 0;
  }
`

export default function MetiersNumeriquesApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />

      <Component {...pageProps} />
    </>
  )
}
