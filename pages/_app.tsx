import { createGlobalStyle } from 'styled-components'

import type { AppProps } from 'next/app'

import '@fontsource/azeret-mono/400.css'
import '@fontsource/azeret-mono/600.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'

const GlobalStyle: any = createGlobalStyle`
  * {
    box-sizing: border-box;
    user-select: none;
  }

  html {
    height: 100%;
  }

  body {
    background-color: #a18890;
    color: #eeeeee;
    display: flex;
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    height: 100%;
    margin: 0;
    overflow: hidden;
  }

  #__next {
    background-color: #a18890;
    background-image: url('/images/background.jpg');
    background-size: cover;
    color: #eeeeee;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
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
