import { Popups } from './constants.js';
import { isEscapeKey } from './utils.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const templates = {
  [Popups.ERROR]: errorTemplate,
  [Popups.SUCCESS]: successTemplate
};

export const showPopup = (type) => {
  const popup = templates[type].cloneNode(true);
  document.body.append(popup);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      popup.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  popup.addEventListener('click', ({ target }) => {
    if (target.classList.contains(type) || target.classList.contains(`${type}__button`)) {
      popup.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);

};

