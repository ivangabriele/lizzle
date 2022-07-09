import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import type { HtmlHTMLAttributes } from 'react'

export const Box = styled.div<{
  backgroundImageUrl: string
}>`
  background-color: black;
  background-image: url('${p => p.backgroundImageUrl}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`

type CardImageProps = HtmlHTMLAttributes<HTMLDivElement> & {
  src: string
}
export function CardImage({ src, ...props }: CardImageProps) {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!boxRef.current) {
      return
    }

    boxRef.current.style.height = `${boxRef.current.clientWidth}px`
  }, [boxRef.current])

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Box ref={boxRef} backgroundImageUrl={src} {...props} />
}
