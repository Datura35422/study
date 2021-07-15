const storage = window.localStorage || localStorage || null

export function setStorage(key, value) {
  if (!storage) {
    return
  }
  storage.setItem(key, JSON.stringify(value))
  return {
    key,
    value
  }
}

export function getStorage(key) {
  const value = storage && storage.getItem(key)
  return value ? JSON.parse(value) : null
}