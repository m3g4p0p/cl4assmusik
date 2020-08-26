import React from 'react'
import { LazyIframe } from './lazy-iframe'

const BASE_URL = 'https://bandcamp.com/EmbeddedPlayer/'

const stringifyOptions = options => Object
  .entries(options)
  .map(entry => entry.join('='))
  .join('/')

export function Bandcamp ({ style, title, link = '', ...options }) {
  return (
    <LazyIframe
      title={title}
      style={{ border: 0, width: '100%', height: '120px', ...style }}
      src={BASE_URL + stringifyOptions(options)}
    >
      <a href={link}>{title}</a>
    </LazyIframe>
  )
}
