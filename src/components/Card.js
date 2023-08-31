export class Card {
  constructor({ data, userId, handleCardClick, handleLikeClick, handleCardDelete }, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._creatorId = data.owner._id;
    this._userId = userId;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this.handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);

    return cardElement;
  }

  likeCard(count) {
    this._likeButton.classList.toggle('elements__like-button_active');
    this._likesCount.textContent = count;
  }

  isLike() {
    return this._likeButton.classList.contains('elements__like-button_active');
  }

  showLike() {
    this._likes.forEach((element) => {
      if (element._id === this._userId) {
        this._likeButton.classList.add('elements__like-button_active');
      }
    });
  }

  _deleteButtonToggler() {
    if (this._userId === this._creatorId) {
      this._deleteButton.style.display = 'block';
    } else {
      this._deleteButton.style.display = 'none';
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener('click', () => {
      this.handleCardDelete(this._element);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._likesCount = this._element.querySelector('.elements__like-count');
    this._deleteButton = this._element.querySelector('.elements__delete');
    this._setEventListeners();
    this._deleteButtonToggler();
    this.showLike();
    this._likesCount.textContent = this._likes.length;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.elements__text').textContent = this._name;

    return this._element;
  }

  getId() {
    return this._id;
  }
}
