import { checkValid, resetValidation } from "./validation.js";
import { initScale, resetScale } from "./scale.js";
import { initEffects, resetEffects } from "./effects.js";
import { sendPhoto} from './api.js';
import { showPopup } from './messages.js';
import { Popups, SUBMIT_BUTTON_STATUS, SUBMIT_TEXTS } from "./constants.js";

const inputFile = document.querySelector('#upload-file');
const modalFormEditor = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const modalFormEditorResetBtn = document.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('#upload-submit');

const onModalFormEditorResetBtnClick = () => {
  closeModalFormEditor();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (document.activeElement === hashtagInput
      || document.activeElement === commentInput
      || document.querySelector(`.${Popups.ERROR}`)) {
      evt.stopPropagation();
    } else {
      closeModalFormEditor();
    }
  }
};

function closeModalFormEditor() {
  modalFormEditor.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  modalFormEditorResetBtn.removeEventListener('click', onModalFormEditorResetBtnClick);
  uploadForm.reset();
  inputFile.value = '';
  resetScale();
  resetEffects();
  resetValidation();
}

export const initUploadModal = () => {
  inputFile.addEventListener('change', () => {
    modalFormEditor.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    modalFormEditorResetBtn.addEventListener('click', onModalFormEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });

  const blockSubmitButton = (isBlocked = SUBMIT_BUTTON_STATUS.DISABLED) => {
    submitButton.disabled = isBlocked;
    submitButton.textContent = isBlocked
      ? SUBMIT_TEXTS.SENDING
      : SUBMIT_TEXTS.IDLE;
  };

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!checkValid()) {
      return;
    }

    const formData = new FormData(uploadForm);
    blockSubmitButton(SUBMIT_BUTTON_STATUS.DISABLED);
    sendPhoto(formData)
      .then(() => {
        closeModalFormEditor();
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

