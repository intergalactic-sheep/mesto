const root = document.querySelector('.page');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddButton = popupAdd.querySelector('.popup__save-button');
const popupImage = document.querySelector('.popup_type_image');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupAddForm = popupAdd.querySelector('.popup__form');

const elements = document.querySelector('.elements');
const card = document.querySelector('#card').content;

const nameInput = document.querySelector('.popup__input_type_name');
const workInput = document.querySelector('.popup__input_type_work');
const linkInput = document.querySelector('.popup__input_type_link');
const placeInput = document.querySelector('.popup__input_type_place');

const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');

const popupPhoto = popupImage.querySelector('.popup__image');
const popupSubtitle = popupImage.querySelector('.popup__subtitle');

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

const renderCard = (place, link) => {
  const cardElement = createCard(place, link);
  elements.prepend(cardElement);
};

function createCard (place, link) {
  const cardElement = card.querySelector('.elements__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardTitle = cardElement.querySelector('.elements__text');

  cardImage.src = link;
  cardImage.alt = place;
  cardTitle.textContent = place;

  cardImage.addEventListener('click', () => {
    popupPhoto.src = link;
    popupPhoto.alt = place;
    popupSubtitle.textContent = place;
    openPopup(popupImage);
  });

  return cardElement;
};

function disableSubmitButton(buttonElement) {
  buttonElement.disabled = 'disabled';
  buttonElement.classList.add('popup__save-button_disabled');
};

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(placeInput.value, linkInput.value);
  popupAddForm.reset();
  disableSubmitButton(popupAddButton);
  closePopup(popupAdd);
};

function likeInteractionIfRequired(evt) {
  if (evt.target.classList.contains('elements__like-button')) {
    evt.target.classList.toggle('elements__like-button_active');
  }
};

function deleteCardIfRequired(evt) {
  if (evt.target.classList.contains('elements__delete')) {
    evt.target.closest('.elements__item').remove();
  };
};

initialCards.reverse().forEach((item) => {
  renderCard(item.name, item.link);
});

elements.addEventListener('click', likeInteractionIfRequired);
elements.addEventListener('click', deleteCardIfRequired);
editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
popupEditForm.addEventListener('submit', saveEditPopupChanges);
popupAddForm.addEventListener('submit', handleCardFormSubmit);