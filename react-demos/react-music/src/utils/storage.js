const storage = window.localStorage || localStorage || null

export const setStorage = (key, value) => {
  if (!storage) {
    return
  }
  storage.setItem(key, JSON.stringify(value))
  return {
    key,
    value
  }
}

export const getStorage = key => {
  const value = storage && storage.getItem(key)
  return value ? JSON.parse(value) : null
}