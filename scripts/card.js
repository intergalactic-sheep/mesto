import {
  popupPhoto,
  popupSubtitle,
  popupImage,
  openPopup,
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

  _handleLikeClick() {
    this._likeButton.classList.toggle('elements__like-button_active');
  }

  _handleDeleteCardAction() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleOpenImagePopup();
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCardAction();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__delete');
    this._setEventListeners();
    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = this._name;
    this._element.querySelector('.elements__text').textContent = this._name;

    return this._element;
  }
}

export { Card };