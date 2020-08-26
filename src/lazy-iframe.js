import React, { useRef } from 'react'
import { useIntersection } from './intersection'

export function LazyIframe ({ src, title, ...props }) {
  const ref = useRef()
  const isIntersecting = useIntersection(ref)

  return (
    <iframe
      ref={ref}
      title={title}
      src={isIntersecting ? src : ''}
      {...props}
    />
  )
}
