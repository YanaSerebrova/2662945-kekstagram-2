const uploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;
const DEFAULT_SCALE = 100;

const setScale = (value) => {
  scaleControlValue.value = `${value}%`;
  const scaleValue = value / 100;
uploadPreview.style.transform = `scale(${scaleValue})`;
}

const onSmallerClick = () => {
  const currentValue = parseInt(scaleControlValue.value);
  setScale(Math.max(currentValue - STEP, MIN_SCALE));
};

const onBiggerClick = () => {
  const currentValue = parseInt(scaleControlValue.value);
  setScale(Math.min(currentValue + STEP, MAX_SCALE));
};

export const initScale = () => {
  setScale(DEFAULT_SCALE);
  scaleSmallerBtn.addEventListener('click', onSmallerClick);
  scaleBiggerBtn.addEventListener('click', onBiggerClick);
};

export const resetScale = () => {
  setScale(DEFAULT_SCALE);
};
