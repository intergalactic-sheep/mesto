import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./constant.js";


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error'
}

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddButton = popupAdd.querySelector('.popup__save-button');
const popupEditButton = popupEdit.querySelector('.popup__save-button');
const popupEditForm = popupEdit.querySelector('.popup__form_type_edit');
const popupAddForm = popupAdd.querySelector('.popup__form');
export const popupImage = document.querySelector('.popup_type_image');
export const popupPhoto = popupImage.querySelector('.popup__image');
export const popupSubtitle = popupImage.querySelector('.popup__subtitle');
export const popupImageCloseButton = popupImage.querySelector('.popup__close-button');

const elements = document.querySelector('.elements');

const nameInput = document.querySelector('.popup__input_type_name');
const workInput = document.querySelector('.popup__input_type_work');
const linkInput = document.querySelector('.popup__input_type_link');
const placeInput = document.querySelector('.popup__input_type_place');

const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');

const popupEditFormValidation = new FormValidator(config, popupEditForm);
popupEditFormValidation.enableValidation();
const popupAddFormValidation = new FormValidator(config, popupAddForm);
popupAddFormValidation.enableValidation();

function createCard(name, link, templateSelector) {
  const card = new Card(name, link, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(name, link, templateSelector) {
  const cardElement = createCard(name, link, templateSelector);
  elements.prepend(cardElement);
}

initialCards.reverse().forEach((item) => {
  renderCard(item.name, item.link, '.card');
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(placeInput.value, linkInput.value, '.card');
  popupAddForm.reset();
  popupAddFormValidation._toggleButtonState();
  closePopup(popupAdd);
};

export function openPopup(item) {
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
  popupEditFormValidation._toggleButtonState();
  closePopup(popupEdit);
};

function openEditPopup() {
  openPopup(popupEdit);
  setEditPopupInputValues();
};

function openAddPopup() {
  openPopup(popupAdd);
};

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
popupEditForm.addEventListener('submit', saveEditPopupChanges);
popupAddForm.addEventListener('submit', handleCardFormSubmit);