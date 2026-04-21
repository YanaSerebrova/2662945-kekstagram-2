const Effects = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const DEFAULT_EFFECT = Effects.NONE;

const EffectsSettings = {
  [Effects.NONE]: {
    slider: {
      range: {
        min: 0,
        max: 100,
      },
      start: 80,
      step: 1,
      connect: 'lower',
    },
    style: '',
    units: ''
  },
  [Effects.CHROME]: {
    slider: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    },
    style: 'grayscale',
    units: ''
  },
  [Effects.SEPIA]: {
    slider: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    },
    style: 'sepia',
    units: ''
  },
  [Effects.MARVIN]: {
    slider: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1
    },
    style: 'invert',
    units: '%'
  },
  [Effects.PHOBOS]: {
    slider: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1
    },
    style: 'blur',
    units: 'px'
  },
  [Effects.HEAT]: {
    slider: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1
    },
    style: 'brightness',
    units: ''
  }
};

const uploadPreviewNode = document.querySelector('.img-upload__preview img');
const effectLevelNode = document.querySelector('.img-upload__effect-level');
const effectLevelSliderNode = document.querySelector('.effect-level__slider');
const effectsListNode = document.querySelector('.effects__list');

let currentEffect = DEFAULT_EFFECT;

const applyEffect = (value) => {
  if (currentEffect === Effects.NONE) {
    uploadPreviewNode.style.filter = '';
    return;
  }
  const { style, units } = EffectsSettings[currentEffect];
  uploadPreviewNode.style.filter = `${style}(${value}${units})`;
};

const initSlider = () => {
  noUiSlider.create(effectLevelSliderNode, EffectsSettings[Effects.NONE].slider);
  effectLevelSliderNode.noUiSlider.on('update', () => {
    const value = effectLevelSliderNode.noUiSlider.get();
    applyEffect(value);
  });
};

const setEffect = (effectName) => {
  currentEffect = effectName;

  if (effectName === Effects.NONE) {
    effectLevelNode.classList.add('hidden');
    uploadPreviewNode.style.filter = '';
    return;
  }

  effectLevelNode.classList.remove('hidden');
  const { slider } = EffectsSettings[currentEffect];
  effectLevelSliderNode.noUiSlider.updateOptions(slider, true);
};

const onEffectsChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    setEffect(evt.target.value);
  }
};

export const initEffects = () => {
  initSlider();
  effectLevelNode.classList.add('hidden');
  effectsListNode.addEventListener('change', onEffectsChange);
};

export const resetEffects = () => {
  setEffect(DEFAULT_EFFECT);
};
