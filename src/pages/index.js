import '../pages/index.css';

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { initialCards, config } from "../utils/constant.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

const nameInput = document.querySelector('.popup__input_type_name');
const workInput = document.querySelector('.popup__input_type_work');

const userInfo = new UserInfo({ name: '.profile__name', work: '.profile__work' });

const setPopupEditFormValues = () => {
  const { name, work } = userInfo.getUserInfo();
  nameInput.value = name;
  workInput.value = work;
}

const handleCardClick = (name, link) => {
  popupCardImage.open(name, link);
};

const handleCardFormSubmit = (data) => {
  renderCard(data);
  popupAdd.close();
};

const handleProfileInfoUpdate = ({ name, work }) => {
  userInfo.setUserInfo(name, work);
  popupEdit.close();
};

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

function createCard(name, link) {
  const card = new Card({ name, link }, '.card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard({ name, link }) {
  const cardElement = createCard(name, link);
  cardsSection.prependItem(cardElement);
}

const popupAdd = new PopupWithForm('.popup_type_add', handleCardFormSubmit);
popupAdd.setEventListeners();
const popupAddForm = document.forms['add-form'];

const popupEdit = new PopupWithForm('.popup_type_edit', handleProfileInfoUpdate);
popupEdit.setEventListeners();
const popupEditForm = document.forms['edit-form'];

const popupEditFormValidation = new FormValidator(config, popupEditForm);
popupEditFormValidation.enableValidation();
const popupAddFormValidation = new FormValidator(config, popupAddForm);
popupAddFormValidation.enableValidation();

const popupCardImage = new PopupWithImage('.popup_type_image');
popupCardImage.setEventListeners();

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link);
    cardsSection.addItem(card);
  }
}, '.elements');

cardsSection.renderItems();

editButton.addEventListener('click', () => {
  setPopupEditFormValues();
  popupEditFormValidation.resetValidation();
  popupEdit.open();
});

addButton.addEventListener('click', () => {
  popupAddFormValidation.resetValidation();
  popupAddFormValidation.toggleButtonState();
  popupAdd.open();
});