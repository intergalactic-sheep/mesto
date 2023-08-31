import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmSubmit) {
    super(popupSelector);
    this._handleConfirmSubmit = () => handleConfirmSubmit(this._cardInfo);
    this._form = this.popup.querySelector('.popup__form');
    this._formSubmitButton = this._form.querySelector('.popup__save-button');
    this._cardInfo = {};
  }

  open(card) {
    this._cardInfo = card;
    super.open();
  }

  loadingConfirm(isTrue) {
    if (isTrue) {
      this._formSubmitButton.textContent = 'Удаление...';
    } else {
      this._formSubmitButton.textContent = 'Да';
    }
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmSubmit(this._cardInfo);
    })
    super.setEventListeners();
  }
}