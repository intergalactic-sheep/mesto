const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const saveButton = popupEdit.querySelector('.popup__save-button');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupAddForm = popupAdd.querySelector('.popup__form');
const root = document.querySelector('.page');

const elements = document.querySelector('.elements');
const card = document.querySelector('#card').content;

const nameInput = document.querySelector('.popup__input_type_name');
const workInput = document.querySelector('.popup__input_type_work');
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


initialCards.forEach((item) => {
  const cardElement = card.querySelector('.elements__item').cloneNode(true);

  cardElement.querySelector('.elements__image').src = item.link;
  cardElement.querySelector('.elements__image').alt = item.name;
  cardElement.querySelector('.elements__text').textContent = item.name;

  elements.append(cardElement);
});

function setPopupInputValue() {
  nameInput.value = profileName.textContent;
  workInput.value = profileWork.textContent;
};

function setProfileValue() {
  profileName.textContent = nameInput.value;
  profileWork.textContent = workInput.value;
};

function saveChanges(evt) {
  evt.preventDefault();
  setProfileValue();
  popupClose();
};

function editOpen() {
  popupEdit.classList.add('popup_opened');
  setPopupInputValue();
};

function addOpen() {
  popupAdd.classList.add('popup_opened');
};

function popupClose(evt) {
  const closeButton = evt.target;

  if (closeButton.classList.contains('button')) {
    closeButton.closest('.popup').classList.remove('popup_opened');
  }
};

function createCard() {
  const newCard = card.querySelector('.elements__item').cloneNode(true);
  const placeInput = document.querySelector('.popup__input_type_place');
  const linkInput = document.querySelector('.popup__input_type_link');

  newCard.querySelector('.elements__image').src = linkInput.value;
  newCard.querySelector('.elements__image').alt = placeInput.value;
  newCard.querySelector('.elements__text').textContent = placeInput.value;

  elements.prepend(newCard);

  placeInput.value = '';
  linkInput.value = '';
};

function addCard(evt) {
  evt.preventDefault();
  createCard();
  popupClose();
};


root.addEventListener('click', popupClose);
editButton.addEventListener('click', editOpen);
addButton.addEventListener('click', addOpen);
popupEditForm.addEventListener('submit', saveChanges);
popupAddForm.addEventListener('submit', addCard);
