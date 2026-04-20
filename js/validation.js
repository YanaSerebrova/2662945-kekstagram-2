import { MAX_DESCRIPTION_LENGTH, MAX_HASHTAGS } from "./constants";

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text-error',
});

pristine.addValidator(
  hashtagInput,
  (value) => {
    if (!value.trim()) {
      return true;
    }
    const tags = value.trim().split(/\s+/);
    return tags.length <= MAX_HASHTAGS;
  },
  `Допустимо максимум ${MAX_HASHTAGS} хэштегов`
);

pristine.addValidator(
  hashtagInput,
  (value) => {
    if (!value.trim()) {
      return true;
    }
    const tags = value.trim().toLowerCase().split(/\s+/);
    return new Set(tags).size === tags.length;
  },
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  hashtagInput,
  (value) => {
    if (!value.trim()) {
      return true;
    }

    const tags = value.trim().split(/\s+/);
    const pattern = /^#[a-zа-яё0-9]{1,19}$/i;

    return tags.every((tag) => pattern.test(tag));
  },
  'Сообщение может содержать только # + буквы/цифры (до 20 символов)'
);

pristine.addValidator(
  commentInput,
  (value) => value.length <= MAX_DESCRIPTION_LENGTH,
  `Максимальная длина комментария - ${MAX_DESCRIPTION_LENGTH} символов`
);
export const checkValid = () => pristine.validate();

export const resetValidation = () => {
  pristine.reset();
};
