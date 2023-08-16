import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = this.popup.querySelector('.popup__image');
    this.popupSubtitle = this.popup.querySelector('.popup__subtitle');
  }

  open(name, link) {
    this.popupImage.src = link;
    this.popupImage.alt = name;
    this.popupSubtitle.textContent = name;
    super.open();
  }
}