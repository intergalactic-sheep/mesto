const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const saveButton = document.querySelector('.popup__save-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupForm = document.querySelector('.popup__form');
const root = document.querySelector('.page');

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

initialCards.forEach(function (item) {
  const elements = document.querySelector('.elements');
  const card = document.querySelector('#card').content;

  const cardElement = card.querySelector('.elements__item').cloneNode(true);

  cardElement.querySelector('.elements__image').src = item.link;
  cardElement.querySelector('.elements__image').alt = item.name;
  cardElement.querySelector('.elements__text').textContent = item.name;

  elements.append(cardElement);
});

let nameInput = document.querySelector('.popup__input_type_name');
let workInput = document.querySelector('.popup__input_type_work');

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

  if (closeButton.classList.contains('popup__close-button')) {
    closeButton.closest('.popup').classList.remove('popup_opened');
  }
};

function addcard(placeValue, linkValue) {
  const elements = document.querySelector('.elements');
  const card = document.querySelector('#card').content;

  const cardElement = card.querySelector('.elements__item').cloneNode(true);

  cardElement.querySelector('.elements__image').src = linkValue;
  cardElement.querySelector('.elements__image').alt = placeValue;
  cardElement.querySelector('.elements__text').textContent = placeValue;

  elements.append(cardElement);
};


root.addEventListener('click', popupClose);
editButton.addEventListener('click', editOpen);
popupForm.addEventListener('submit', saveChanges);
addButton.addEventListener('click', addOpen);




// .addEventListener('click', function () {
//   const place = document.querySelector('.popup__input_type_place');
//   const link = document.querySelector('.popup__input_type_place');

//   addCard(place.value, link.value);
// });

