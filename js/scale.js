const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;
const DEFAULT_SCALE = 100;

const uploadPreviewNode = document.querySelector('.img-upload__preview img');
const scaleControlValueNode = document.querySelector('.scale__control--value');
const scaleSmallerButtonNode = document.querySelector('.scale__control--smaller');
const scaleBiggerButtonNode = document.querySelector('.scale__control--bigger');

let currentValue = DEFAULT_SCALE;

const setScale = () => {
  scaleControlValueNode.value = `${currentValue}%`;
  uploadPreviewNode.style.transform = `scale(${currentValue / 100})`;
};

const onSmallerButtonClick = () => {
  currentValue = Math.max(currentValue - STEP, MIN_SCALE);
  setScale();
};

const onBiggerButtonClick = () => {
  currentValue = Math.min(currentValue + STEP, MAX_SCALE);
  setScale();
};

export const initScale = () => {
  setScale();
  scaleSmallerButtonNode.addEventListener('click', onSmallerButtonClick);
  scaleBiggerButtonNode.addEventListener('click', onBiggerButtonClick);
};

export const resetScale = () => {
  currentValue = DEFAULT_SCALE;
  setScale();
};
