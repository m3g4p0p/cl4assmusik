import Color from 'color-js'

export function shiftHue (rgbString, hueShift) {
  return Color('#' + rgbString).shiftHue(hueShift).toCSS().slice(1)
}

export function randomizeHue (rgbString, maxShift) {
  const delta = Math.round(Math.random() * maxShift) % 360
  return shiftHue(rgbString, delta)
}
