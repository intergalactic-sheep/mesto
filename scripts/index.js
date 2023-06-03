const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');
const popup = document.querySelector('.popup');

function editOpen() {
  popup.classList.add('popup__opened');
}

editButton.addEventListener('click', editOpen);

function editClose() {
  popup.classList.remove('popup__opened');
}

closeButton.addEventListener('click', editClose);


