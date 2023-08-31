export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error'
};

export const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    authorization: '3d23ae3c-67fe-4f74-82f2-392199df013e',
    "Content-Type": "application/json"
  }
};

