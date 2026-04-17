const uploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;
const DEFAULT_SCALE = 100;

let currentValue = DEFAULT_SCALE;

const setScale = () => {
  scaleControlValue.value = `${currentValue}%`;
  uploadPreview.style.transform = `scale(${currentValue / 100}%`;
}

const onSmallerClick = () => {
  currentValue = Math.max(currentValue - STEP, MIN_SCALE);
  setScale();
};

const onBiggerClick = () => {
  currentValue = Math.min(currentValue + STEP, MAX_SCALE);
  setScale();
};

export const initScale = () => {
  setScale();
  scaleSmallerBtn.addEventListener('click', onSmallerClick);
  scaleBiggerBtn.addEventListener('click', onBiggerClick);
};

export const resetScale = () => {
  currentValue = DEFAULT_SCALE;
  setScale(DEFAULT_SCALE);
};
