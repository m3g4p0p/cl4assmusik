import config from '../config.json'
import { randomizeHue } from './color'

const { MAX_HUE_DELTA } = config.constants

function stringifyAlbum ({ artist, title }) {
  return `${artist.replace(/^the\s+/i, '')} ${title}`
}

export function getId ({ id, params }) {
  return id || params.album
}

export function getAlbum (id) {
  const nId = Number(id)
  return albums.find(album => album.id === nId)
}

export const albums = config.albums.map(album => ({
  ...album,
  id: getId(album),
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
  )).map(getId)
})).sort((a, b) => stringifyAlbum(a) < stringifyAlbum(b) ? -1 : 1)

export const firstForArtist = albums.reduce((list, album) => {
  if (list.every(({ artist }) => artist !== album.artist)) {
    list.push(album)
  }

  return list
}, []).map(getId)
