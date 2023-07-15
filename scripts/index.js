const root = document.querySelector('.page');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddButton = popupAdd.querySelector('.popup__save-button');
const popupImage = document.querySelector('.popup_type_image');
const popupImageCloseButton = document.querySelector('.popup__close-button');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupAddForm = popupAdd.querySelector('.popup__form');

const elements = document.querySelector('.elements');

const nameInput = document.querySelector('.popup__input_type_name');
const workInput = document.querySelector('.popup__input_type_work');
const linkInput = document.querySelector('.popup__input_type_link');
const placeInput = document.querySelector('.popup__input_type_place');

const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');

const popupPhoto = popupImage.querySelector('.popup__image');
const popupSubtitle = popupImage.querySelector('.popup__subtitle');

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
    popupPhoto.src = '';
    popupSubtitle.textContent = '';
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

function renderCard(name, link, templateSelector) {
  const card = new Card (name, link, templateSelector);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
}

initialCards.reverse().forEach((item) => {
  renderCard(item.name, item.link, '.card');
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(placeInput.value, linkInput.value, '.card');
  popupAddForm.reset();
  disableSubmitButton(popupAddButton);
  closePopup(popupAdd);
};

function openPopup(item) {
  item.classList.add('popup_opened');
  item.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupByEscButton);
};

function closePopup(item) {
  item.classList.remove('popup_opened');
  item.removeEventListener('click', closePopupByClick);
  document.removeEventListener('keydown', closePopupByEscButton);
};

function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
    closePopup(evt.currentTarget);
  }
};

function closePopupByEscButton(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

function setEditPopupInputValues() {
  nameInput.value = profileName.textContent;
  workInput.value = profileWork.textContent;
};

function setProfileInfoValues() {
  profileName.textContent = nameInput.value;
  profileWork.textContent = workInput.value;
};

function saveEditPopupChanges(evt) {
  evt.preventDefault();
  setProfileInfoValues();
  closePopup(popupEdit);
};

function openEditPopup() {
  openPopup(popupEdit);
  setEditPopupInputValues();
};

function openAddPopup() {
  openPopup(popupAdd);
};

function disableSubmitButton(buttonElement) {
  buttonElement.disabled = 'disabled';
  buttonElement.classList.add('popup__save-button_disabled');
};

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
popupEditForm.addEventListener('submit', saveEditPopupChanges);
popupAddForm.addEventListener('submit', handleCardFormSubmit);