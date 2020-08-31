import React, { useContext } from 'react'
import { useObservedRef } from './observer'
import { AppContext } from './app'

export function LazyIframe ({ src, title, ...props }) {
  const { observer } = useContext(AppContext)
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
