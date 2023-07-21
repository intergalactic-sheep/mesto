import {
  popupPhoto,
  popupSubtitle,
  popupImage,
  popupImageCloseButton,
  openPopup, closePopup
} from './index.js';

class Card {

  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);

    return cardElement;
  }

  _handleOpenImagePopup() {
    popupPhoto.src = this._link;
    popupPhoto.alt = this._name;
    popupSubtitle.textContent = this._name;
    openPopup(popupImage);
  }

  _handleCloseImagePopup() {
    closePopup(popupImage);
  }

  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenImagePopup();
    });

    popupImageCloseButton.addEventListener('click', () => {
      this._handleCloseImagePopup();
    });

    this._element.querySelector('.elements__like-button').addEventListener('click', () => {
      this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
    });

    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._element.remove();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = this._name;
    this._element.querySelector('.elements__text').textContent = this._name;

    return this._element;
  }
}

export { Card };