class Api {
  constructor({ link, headers }) {
    this._fetchLink = link
    this._headers = headers
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._fetchLink}/cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._handleResponse)
  }

  toggleCardLike(cardId, isLiked) {
    return fetch(`${this._fetchLink}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
      credentials: 'include',
    }).then(this._handleResponse)
  }

  setNewCard({ name, link }) {
    console.log({ name, link }, 'dspfjvajnsfdopivnsfd')
    return fetch(`${this._fetchLink}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name, link }),
    }).then(this._handleResponse)
  }

  delCard(cardId) {
    return fetch(`${this._fetchLink}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._handleResponse)
  }

  getUserProfile() {
    return fetch(`${this._fetchLink}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._handleResponse)
  }

  setUserProfile({ name, about }) {
    return fetch(`${this._fetchLink}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse)
  }

  setUserAvatar(avatar) {
    return fetch(`${this._fetchLink}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleResponse)
  }
}

const api = new Api({
  link: 'http://127.0.0.1:3000',
  headers: { 'Content-Type': 'application/json' },
})

export default api
