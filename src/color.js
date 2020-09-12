import Color from 'color-js'

export function shiftHue (rgbString, hueShift) {
  return Color('#' + rgbString).shiftHue(hueShift).toCSS().slice(1)
}

export function randomizeHue (rgbString, maxDelta) {
  const delta = maxDelta - Math.round(Math.random() * maxDelta * 2)
  return shiftHue(rgbString, delta)
}
