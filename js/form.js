import { checkValid, resetValidation } from './validation.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { sendPhoto} from './api.js';
import { showPopup, Popups } from './messages.js';
import { isEscapeKey } from './utils.js';

const SUBMIT_TEXTS = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const SUBMIT_BUTTON_STATUS = {
  DISABLED: true,
  ENABLED: false
};
const fileInputNode = document.querySelector('#upload-file');
const uploadOverlayNode = document.querySelector('.img-upload__overlay');
const uploadFormNode = document.querySelector('.img-upload__form');
const bodyNode = document.querySelector('body');
const uploadFormResetButtonNode = document.querySelector('#upload-cancel');
const hashtagInputNode = uploadFormNode.querySelector('.text__hashtags');
const commentInputNode = uploadFormNode.querySelector('.text__description');
const submitButtonNode = uploadFormNode.querySelector('#upload-submit');
const previewImageNode = document.querySelector('.img-upload__preview img');
const effectsPreviewsNodes = document.querySelectorAll('.effects__preview');

const onUploadFormResetButtonClick = () => {
  closeModalUploadForm();
};

const onDocumentKeydown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }
  evt.preventDefault();
  if (
    document.activeElement === hashtagInputNode ||
    document.activeElement === commentInputNode ||
    document.querySelector(`.${Popups.ERROR}`)
  ) {
    evt.stopPropagation();
    return;
  }
  closeModalUploadForm();
};

function closeModalUploadForm() {
  uploadOverlayNode.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFormResetButtonNode.removeEventListener('click', onUploadFormResetButtonClick);
  uploadFormNode.reset();
  fileInputNode.value = '';
  resetScale();
  resetEffects();
  resetValidation();
}

export const initUploadModal = () => {
  fileInputNode.addEventListener('change', () => {
    const file = fileInputNode.files[0];
    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    previewImageNode.src = imageUrl;
    effectsPreviewsNodes.forEach((previewNode) => {
      previewNode.style.backgroundImage = `url(${imageUrl})`;
    });
    uploadOverlayNode.classList.remove('hidden');
    bodyNode.classList.add('modal-open');
    uploadFormResetButtonNode.addEventListener('click', onUploadFormResetButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });

  document.activeElement.blur();
  const blockSubmitButton = (isBlocked = SUBMIT_BUTTON_STATUS.DISABLED) => {
    submitButtonNode.disabled = isBlocked;
    submitButtonNode.textContent = isBlocked
      ? SUBMIT_TEXTS.SENDING
      : SUBMIT_TEXTS.IDLE;
  };

  uploadFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!checkValid()) {
      return;
    }

    const formData = new FormData(uploadFormNode);
    blockSubmitButton(SUBMIT_BUTTON_STATUS.DISABLED);
    sendPhoto(formData)
      .then(() => {
        closeModalUploadForm();
        showPopup(Popups.SUCCESS);
      })
      .finally(() => {
        blockSubmitButton(SUBMIT_BUTTON_STATUS.ENABLED);
      })
      .catch(() => {
        showPopup(Popups.ERROR);
      });
  });
  initScale();
  initEffects();
};

