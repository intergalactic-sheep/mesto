const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');

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

  console.log(typeof cardElement.querySelector)

  elements.append(cardElement);
});

let nameInput = document.querySelector('.popup__input_type_name');
let workInput = document.querySelector('.popup__input_type_work');

function setPopupInputValue() {
  nameInput.value = profileName.textContent;
  workInput.value = profileWork.textContent;
}

function setProfileValue() {
  profileName.textContent = nameInput.value;
  profileWork.textContent = workInput.value;
}

function saveChanges(evt) {
  evt.preventDefault();
  setProfileValue();
  editClose();
}

function editOpen() {
  popup.classList.add('popup_opened');
  setPopupInputValue();
}

function editClose() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', editClose);
editButton.addEventListener('click', editOpen);
popupForm.addEventListener('submit', saveChanges);
