import config from '../config.json'
import { randomizeHue } from './color'

const { MAX_HUE_DELTA } = config.constants

function stringifyAlbum ({ artist, title }) {
  return `${artist} ${title}`
}

export const albums = config.albums.map(album => ({
  ...album,
  tags: album.tags && album.tags.map(tag => `#${tag}`),
  params: {
    ...config.defaults,
    ...album.params,
    bgcol: randomizeHue(album.params.bgcol || config.defaults.bgcol, MAX_HUE_DELTA),
    linkcol: randomizeHue(album.params.linkcol || config.defaults.linkcol, MAX_HUE_DELTA)
  },
  related: config.albums.filter(({ artist, title }) => (
    artist === album.artist &&
    title !== album.title
  )).map(({ params }) => params.album)
})).sort((a, b) => stringifyAlbum(a) < stringifyAlbum(b) ? -1 : 1)
