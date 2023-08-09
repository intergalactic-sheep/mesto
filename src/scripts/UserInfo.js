export class UserInfo {
  constructor({ name, work }) {
    this._name = document.querySelector(name);
    this._work = document.querySelector(work);
  }

  getUserInfo() {
    const res = {};
    res.name = this._name.textContent;
    res.work = this._work.textContent;
    return res;
  }

  setUserInfo({ name, work }) {
    this._name.textContent = name;
    this._work.textContent = work;
  }
}