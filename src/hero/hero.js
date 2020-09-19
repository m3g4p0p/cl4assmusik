import React from 'react'
import './hero.scss'

export function Hero ({ headline, copy, ...props }) {
  return (
    <div className='hero'>
      <h1>{headline}</h1>
      <p>{copy}</p>
    </div>
  )
}
