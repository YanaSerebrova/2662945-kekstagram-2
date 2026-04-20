import { DEFAULT_EFFECT, EFFECTS, EffectsSettings } from './constants.js';

const uploadPreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

let currentEffect = DEFAULT_EFFECT;

const applyEffect = (value) => {
  if (currentEffect === EFFECTS.NONE) {
    uploadPreview.style.filter = '';
    return;
  }
  const { style, units } = EffectsSettings[currentEffect];
  uploadPreview.style.filter = `${style}(${value}${units})`;
};

const initSlider = () => {
  noUiSlider.create(effectLevelSlider, EffectsSettings[EFFECTS.NONE].slider);
  effectLevelSlider.noUiSlider.on('update', () => {
    const value = effectLevelSlider.noUiSlider.get();
    applyEffect(value);
  });
};

const setEffect = (effectName) => {
  currentEffect = effectName;

  if (effectName === EFFECTS.NONE) {
    effectLevel.classList.add('hidden');
    uploadPreview.style.filter = '';
    return;
  }

  effectLevel.classList.remove('hidden');
  const { slider } = EffectsSettings[currentEffect];
  effectLevelSlider.noUiSlider.updateOptions(slider);
};

const onEffectsChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    setEffect(evt.target.value);
  }
};

export const initEffects = () => {
  initSlider();
  effectLevel.classList.add('hidden');
  effectsList.addEventListener('change', onEffectsChange);
};

export const resetEffects = () => {
  setEffect(DEFAULT_EFFECT);
};
