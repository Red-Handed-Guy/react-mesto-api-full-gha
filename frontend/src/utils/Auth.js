const BASE_URL = 'http://127.0.0.1:3000'

function getResponseData(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return getResponseData(res)
  })
}

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return getResponseData(res)
  })
}

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'PATCH',
    credentials: 'include',
  }).then((res) => {
    if (res.ok) {
      return res
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return getResponseData(res)
  })
}