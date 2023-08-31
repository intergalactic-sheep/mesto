export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _onResponse(res) {
    return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData))
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: '3d23ae3c-67fe-4f74-82f2-392199df013e'
      }
    })
      .then(this._onResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._onResponse);
  }

  changeUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: '3d23ae3c-67fe-4f74-82f2-392199df013e',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(this._onResponse);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._onResponse);
  };

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._onResponse);
  }

  setLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._onResponse);
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._onResponse);
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: '3d23ae3c-67fe-4f74-82f2-392199df013e',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._onResponse);
  }
}
