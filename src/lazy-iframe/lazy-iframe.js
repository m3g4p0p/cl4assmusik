import React, { useContext } from 'react'
import { useObservedRef } from '../lib/observer'
import { IntersectionContext } from '../app'
import { assemble } from '../lib/util'

export function LazyIframe ({ src, title, className, onLoad, ...props }) {
  const observer = useContext(IntersectionContext)
  const [ref, { isIntersecting }] = useObservedRef(observer, true)

  return (
    <iframe
      ref={ref}
      title={title}
      src={isIntersecting ? src : ''}
      onLoad={isIntersecting ? onLoad : null}
      className={assemble(className, 'lazy-iframe')}
      {...props}
    />
  )
}
