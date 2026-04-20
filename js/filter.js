import { renderPictures } from './cards.js';
import { debounce } from './utils.js';
import { FILTERS, PICTURES_COUNT } from './constants.js';

const imgFilters = document.querySelector('.img-filters');
const form = document.querySelector('.img-filters__form');

let localPhotos;

const debouncedRender = debounce(renderPictures);

export const initFilters = (pictures) => {
  localPhotos = [...pictures];
  imgFilters.classList.remove('img-filters--inactive');
};

const setActiveButton = (button) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const filterPhotos = {
  [FILTERS.DEFAULT]: () => localPhotos,
  [FILTERS.DISCUSSED]: () => [...localPhotos].sort((a, b) => b.comments.length - a.comments.length),
  [FILTERS.RANDOM]: () => [...localPhotos].sort(() => Math.random() - 0.5).slice(0, PICTURES_COUNT.RANDOM)
};

form.addEventListener('click', ({ target }) => {
  const button = target.closest('.img-filters__button');
  if (button) {
    setActiveButton(button);
    const sortedPhotos = filterPhotos[button.id]();
    debouncedRender(sortedPhotos);
  }
});

