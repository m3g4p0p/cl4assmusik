import React, { useContext } from 'react'
import { useObservedRef } from './observer'
import { ObserverContext } from './app'

export function LazyIframe ({ src, title, ...props }) {
  const [observer, isIntersecting] = useContext(ObserverContext)
  const ref = useObservedRef(observer)

  return (
    <iframe
      ref={ref}
      title={title}
      src={isIntersecting(ref) ? src : ''}
      {...props}
    />
  )
}
