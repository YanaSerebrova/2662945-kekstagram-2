import { checkValid, resetValidation } from "./validation.js";

const inputFile = document.querySelector('#upload-file');
const modalFormEditor = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const modalFormEditorResetBtn = document.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const onModalFormEditorResetBtnClick = () => {
  closeModalFormEditor();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
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
  resetValidation();
}

export const initUploadModal = () => {
  inputFile.addEventListener('change', () => {
    modalFormEditor.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    modalFormEditorResetBtn.addEventListener('click', onModalFormEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (checkValid()) {
      uploadForm.submit();
    }
  });
};


