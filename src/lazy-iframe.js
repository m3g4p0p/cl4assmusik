import React, { useContext } from 'react'
import { useObservedRef } from './observer'
import { ObserverContext } from './app'

export function LazyIframe ({ src, title, onLoad, ...props }) {
  const observer = useContext(ObserverContext)
  const [ref, { isIntersecting }] = useObservedRef(observer, true)

  return (
    <iframe
      ref={ref}
      title={title}
      src={isIntersecting ? src : ''}
      onLoad={isIntersecting ? onLoad : null}
      {...props}
    />
  )
}
