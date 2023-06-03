const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');

const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');

let nameInput = document.querySelector('.popup__name');
let workInput = document.querySelector('.popup__work');

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

popupForm.addEventListener('submit', saveChanges);

function editOpen() {
  popup.classList.add('popup__opened');
  setPopupInputValue();
}

editButton.addEventListener('click', editOpen);

function editClose() {
  popup.classList.remove('popup__opened');
}

closeButton.addEventListener('click', editClose);
