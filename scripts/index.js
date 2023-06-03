const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');
const popup = document.querySelector('.popup');

function editOpen() {
  popup.classList.add('popup__opened');
}

editButton.addEventListener('click', editOpen);

function editClose(evt) {
  popup.classList.remove('popup__opened');
}

closeButton.addEventListener('click', editClose);

function saveChanges(evt) {
  let name = document.querySelector('.profile__name');
  let work = document.querySelector('.profile__work');
  let popupName = document.querySelector('.popup__name');
  popupName = name;
  let popupWork = document.querySelector('.popup__work');
  popupWork = work;

  name.textContent = `${popupName.value}`;
  work.textContent = `${popupWork.value}`;
}

saveButton.addEventListener('click', saveChanges, editClose);

