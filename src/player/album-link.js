import React from 'react'

export function AlbumLink ({ album }) {
  const { artist, title, link } = album
  return <a href={link} target='_blank' rel='noopener noreferrer'>{artist} - {title}</a>
}
