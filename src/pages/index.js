import '../pages/index.css';

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { config, configApi } from "../utils/constant.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Api } from '../components/Api';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

let userId = null;
const api = new Api(configApi);

const userInfo = new UserInfo({ name: '.profile__name', work: '.profile__work', avatar: '.profile__pic' });

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setUserAvatar(data.avatar);
    userId = data._id;
  })
  .catch((err) => console.log(err));

const handleCardFormSubmit = (data) => {
  popupAdd.loadingForm(true);
  api.addCard(data)
    .then((res) => {
      renderCard(res);
      data.myId = userId;
      popupAdd.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAdd.loadingForm(false, 'Создать');
    });
};

const handleProfileInfoUpdate = ({ name, about }) => {
  popupEdit.loadingForm(true);
  api.changeUserInfo({ name, about })
    .then(({ name, about }) => {
      userInfo.setUserInfo(name, about);
      popupEdit.close();
    })
  popupEdit.loadingForm(false, 'Сохранить');
};

const handleAvatarChangeSubmit = (data) => {
  api.editAvatar(data).then(({ avatar }) => userInfo.setUserAvatar(avatar)).catch((err) => console.log(err));
  popupAvatar.close();
};

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');

const createCard = (data) => {
  const card = new Card({
    data: data,
    userId: userId,
    handleCardClick: (name, link) => {
      popupCardImage.open(name, link);
    },
    handleLikeClick: () => {
      if (card.isLike()) {
        api.deleteLike(card.getId())
          .then((res) => {
            card.likeCard(res.likes.length);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api.setLike(card.getId())
          .then((res) => {
            card.likeCard(res.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleCardDelete: () => {
      popupConfirm.open(card);
    }
  }, '.card');
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(data) {
  const cardElement = createCard(data);
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

const popupConfirm = new PopupWithConfirmation('.popup_type_confirm', (cardInstance) => {
  popupConfirm.loadingConfirm(true);
  api.deleteCard(cardInstance.getId())
    .then(() => {
      cardInstance.deleteCard();
      popupConfirm.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupConfirm.loadingConfirm(false)
    })
})
popupConfirm.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_type_avatar', handleAvatarChangeSubmit);
popupAvatar.setEventListeners();
const popupAvatarForm = document.forms['avatar-form'];
const popupAvatarFormValidation = new FormValidator(config, popupAvatarForm);
popupAvatarFormValidation.enableValidation();

const cardsSection = new Section({
  renderer: (item) => {
    cardsSection.addItem(createCard(item));
  }
}, '.elements');

api.getInitialCards().then(cards => cardsSection.renderItems(cards))
  .catch((err) => console.log(err));

editButton.addEventListener('click', () => {
  api.getUserInfo().then((res) => popupEdit.setInputValues(res)).catch((err) => console.log(err));
  popupEditFormValidation.resetValidation();
  popupEdit.open();
});

addButton.addEventListener('click', () => {
  popupAddFormValidation.resetValidation();
  popupAdd.open();
});

avatarButton.addEventListener('click', () => {
  popupAvatarFormValidation.resetValidation();
  popupAvatar.open();
});