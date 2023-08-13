import '../pages/index.css';

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { initialCards } from "../constant/constant.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error'
};

const elements = document.querySelector('.elements');
const nameInput = document.querySelector('.popup__input_type_name');
const workInput = document.querySelector('.popup__input_type_work');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');

const userInfo = new UserInfo({ name: '.profile__name', work: '.profile__work' });

const setPopupEditFormValues = () => {
  const { name, work } = userInfo.getUserInfo();
  nameInput.value = name;
  workInput.value = work;
}

const handleCardClick = (name, link) => {
  popupCardImage.open(name, link);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard(placeInput.value, linkInput.value);
  popupAddFormValidation.toggleButtonState();
  popupAdd.close();
};

const handleProfileInfoUpdate = (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo({
    name: nameInput.value,
    work: workInput.value
  });
  popupEditFormValidation.toggleButtonState();
  popupEdit.close();
};

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

function createCard(name, link) {
  const card = new Card({ name, link }, '.card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(name, link) {
  const cardElement = createCard(name, link);
  elements.prepend(cardElement);
}

editButton.addEventListener('click', () => {
  setPopupEditFormValues();
  popupEdit.open();
});

addButton.addEventListener('click', () => {
  popupAdd.open();
});

const popupCardImage = new PopupWithImage('.popup_type_image');
popupCardImage.setEventListeners();

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card', handleCardClick);
    const cardElement = card.generateCard();
    cardsSection.addItem(cardElement);
  }
}, '.elements');

cardsSection.renderItems();

const popupAdd = new PopupWithForm('.popup_type_add', handleCardFormSubmit);
popupAdd.setEventListeners();
const popupAddForm = popupAdd.popup.querySelector('.popup__form');

const popupEdit = new PopupWithForm('.popup_type_edit', handleProfileInfoUpdate);
popupEdit.setEventListeners();
const popupEditForm = popupEdit.popup.querySelector('.popup__form_type_edit');

const popupEditFormValidation = new FormValidator(config, popupEditForm);
popupEditFormValidation.enableValidation();
const popupAddFormValidation = new FormValidator(config, popupAddForm);
popupAddFormValidation.enableValidation();