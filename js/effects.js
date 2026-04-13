const uploadPreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

let currentEffect = 'none';

const applyEffect = (value) => {
  if (currentEffect === 'none') {
    uploadPreview.style.filter = '';
  }

  if (currentEffect === 'chrome') {
    uploadPreview.style.filter = `grayscale(${value})`;
  }

  if (currentEffect === 'sepia') {
    uploadPreview.style.filter = `sepia(${value})`;
  }

  if (currentEffect === 'marvin') {
    uploadPreview.style.filter = `invert(${value}%)`;
  }

  if (currentEffect === 'phobos') {
    uploadPreview.style.filter = `blur(${value}px)`;
  }

  if (currentEffect === 'heat') {
    uploadPreview.style.filter = `brightness(${value})`;
  }
};

const initSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    const value = effectLevelSlider.noUiSlider.get();
    applyEffect(value);
  });
};

const setEffect = (effectName) => {
  currentEffect = effectName;

  if (effectName === 'none') {
    effectLevel.classList.add('hidden');
    uploadPreview.style.filter = '';
    return;
  }

  effectLevel.classList.remove('hidden');

  if (effectName === 'chrome' || effectName === 'sepia') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: { min: 0, max: 1 },
      step: 0.1,
    });
    effectLevelSlider.noUiSlider.set(1);
  }

  if (effectName === 'marvin') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: { min: 0, max: 100 },
      step: 1,
    });
    effectLevelSlider.noUiSlider.set(100);
  }

  if (effectName === 'phobos') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: { min: 0, max: 3 },
      step: 0.1,
    });
    effectLevelSlider.noUiSlider.set(3);
  }

  if (effectName === 'heat') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: { min: 1, max: 3 },
      step: 0.1,
    });
    effectLevelSlider.noUiSlider.set(3);
  }
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
  currentEffect = 'none';
  uploadPreview.style.filter = '';
  effectLevel.classList.add('hidden');
  effectLevelSlider.noUiSlider.set(100);
};
