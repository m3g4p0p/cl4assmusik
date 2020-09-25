export function toggle (list, item) {
  const filtered = list.filter(current => current !== item)

  if (filtered.length < list.length) {
    return filtered
  }

  return list.concat([item])
}

export function join (values, separator = ' ') {
  return values.map(value => Array.isArray(value)
    ? join(value, separator)
    : value
  ).join(separator)
}

export function split (value) {
  return value.split(/\s+/)
}

export function searchList (list, keys, search) {
  const patters = split(search).map(term => new RegExp(term, 'i'))

  return list.filter(item => {
    const value = join(keys.map(key => item[key]))
    return patters.every(pattern => pattern.test(value))
  })
}

export function assemble (...values) {
  return join(values.filter(Boolean)).trim()
}

export function negate (value) {
  return !value
}

export function throttleRAF (callback) {
  let isScheduled = false

  return () => {
    if (isScheduled) {
      return
    }

    isScheduled = true

    window.requestAnimationFrame(() => {
      callback()
      isScheduled = false
    })
  }
}
