import config from '../config.json'
import { randomizeHue } from './color'

const { MAX_INITIAL_HUE_SHIFT } = config.constants

function stringifyAlbum ({ artist, title }) {
  return `${artist.replace(/^the\s+/i, '')} ${title}`
}

function colorizeAlbum ({ params }) {
  const {
    linkcol = config.defaults.linkcol,
    bgcol = config.defaults.bgcol
  } = params

  return {
    linkcol: randomizeHue(linkcol, MAX_INITIAL_HUE_SHIFT),
    bgcol: randomizeHue(bgcol, MAX_INITIAL_HUE_SHIFT)
  }
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
    ...colorizeAlbum(album)
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
