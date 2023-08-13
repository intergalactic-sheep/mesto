import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this.submit = submit;
  }

  _getInputValues() {
    const inputs = this.popup.querySelectorAll('.popup__input');
    const inputValues = Array.from(inputs).reduce((values, input) => {
      values[input.name] = input.value;
      return values;
    }, {});

    return inputValues;
  }

  setEventListeners() {
    const form = this.popup.querySelector('.popup__form');

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submit(evt);
    });

    super.setEventListeners();
  }

  close() {
    super.close();
    const form = this.popup.querySelector('.popup__form');
    form.reset();
  }
}
