export class UserInfo {
  constructor({ name, work, avatar}) {
    this._name = document.querySelector(name);
    this._work = document.querySelector(work);
    this._avatar = document.querySelector(avatar)
  }

  getUserInfo() {
    const res = {};
    res.name = this._name.textContent;
    res.work = this._work.textContent;
    return res;
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._work.textContent = about;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
