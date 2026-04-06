const inputFile = document.querySelector('#upload-file');
const modalFormEditor = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const modalFormEditorResetBtn = document.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text-error',
});


const validateHashtags = (value) => {
  if (!value.trim()) return true;
  const tags = value.trim().toLowerCase().split(/\s+/);
  if (tags.length > 5) return false;
  const uniqueTags = new Set(tags);
  if (uniqueTags.size !== tags.length) return false;
  const pattern = /^#[a-zа-яё0-9]{1,19}$/i;
  return tags.every(tag => pattern.test(tag));
};
pristine.addValidator(hashtagInput, validateHashtags, 'Макс. 5 хэштегов, без повторов, # + буквы/цифры');
pristine.addValidator(commentInput, (value) => value.length <= 140, 'Макс. 140 символов');

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
  inputFile.value = '';
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
    if (pristine.validate()) {
      uploadForm.submit();
    }
  });
};


