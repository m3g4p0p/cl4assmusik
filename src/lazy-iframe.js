import React, { useContext } from 'react'
import { useObservedRef } from './observer'
import { ObserverContext } from './app'

export function LazyIframe ({ src, title, ...props }) {
  const observerContext = useContext(ObserverContext)
  const [ref, isIntersecting] = useObservedRef(observerContext)

  return (
    <iframe
      ref={ref}
      title={title}
      src={isIntersecting ? src : ''}
      {...props}
    />
  )
}
