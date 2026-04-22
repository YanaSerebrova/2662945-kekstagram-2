import { renderPictures } from './cards.js';
import { debounce } from './utils.js';

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const PICTURES_COUNT = {
  RANDOM: 10
};

const imageFiltersNode = document.querySelector('.img-filters');
const formNode = document.querySelector('.img-filters__form');

let localPhotos;

const debouncedRender = debounce(renderPictures);

export const initFilters = (pictures) => {
  localPhotos = [...pictures];
  imageFiltersNode.classList.remove('img-filters--inactive');
};

const setActiveButton = (filterButtonNode) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  filterButtonNode.classList.add('img-filters__button--active');
};

const filterPhotos = {
  [Filters.DEFAULT]: () => localPhotos,
  [Filters.DISCUSSED]: () => [...localPhotos].sort((a, b) => b.comments.length - a.comments.length),
  [Filters.RANDOM]: () => [...localPhotos].sort(() => Math.random() - 0.5).slice(0, PICTURES_COUNT.RANDOM)
};

formNode.addEventListener('click', ({ target }) => {
  const filterButtonNode = target.closest('.img-filters__button');
  if (filterButtonNode && localPhotos) {
    setActiveButton(filterButtonNode);
    const sortedPhotos = filterPhotos[filterButtonNode.id]();
    debouncedRender(sortedPhotos);
  }
});

