import Cookies from 'js-cookie'

const historyKey = 'search-history'

export function getHistory() {
  return Cookies.get(historyKey)
}

export function setHistory(token) {
  return Cookies.set(historyKey, token)
}

export function removeHistory() {
  return Cookies.remove(historyKey)
}
