import { isEscapeKey } from './utils.js';

export const Popups = {
  ERROR: 'error',
  SUCCESS: 'success'
};

const successTemplateNode = document.querySelector('#success').content.querySelector('.success');
const errorTemplateNode = document.querySelector('#error').content.querySelector('.error');

const templates = {
  [Popups.ERROR]: errorTemplateNode,
  [Popups.SUCCESS]: successTemplateNode
};

export const showPopup = (type) => {
  const popupNode = templates[type].cloneNode(true);
  document.body.append(popupNode);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      popupNode.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  popupNode.addEventListener('click', ({ target }) => {
    if (target.classList.contains(type) || target.classList.contains(`${type}__button`)) {
      popupNode.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);

};

