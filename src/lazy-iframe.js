import React, { useContext } from 'react'
import { useObservedRef } from './observer'
import { ObserverContext } from './app'

export function LazyIframe ({ src, title, ...props }) {
  const observer = useContext(ObserverContext)
  const [ref, isIntersecting] = useObservedRef(observer)

  return (
    <iframe
      ref={ref}
      title={title}
      src={isIntersecting ? src : ''}
      {...props}
    />
  )
}
