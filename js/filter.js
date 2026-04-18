import { renderPictures } from './cards.js';
import { debounce } from './utils.js';

const FILTER = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');
const picturesContainer = document.querySelector('.pictures');

let currentFilter = FILTER.DEFAULT;
let photos = [];

const getRandomPhotos = (data) => {
  const shuffled = data.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (data) =>
  data.slice().sort((a, b) => b.comments.length - a.comments.length);

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case FILTER.RANDOM:
      return getRandomPhotos(photos);
    case FILTER.DISCUSSED:
      return getDiscussedPhotos(photos);
    default:
      return photos;
  }
};

const render = () => {
  picturesContainer.innerHTML = '';
  renderPictures(getFilteredPhotos());
};
const debouncedRender = debounce(render, DEBOUNCE_DELAY);

const setActiveButton = (button) => {
  filterButtons.forEach((btn) =>
    btn.classList.remove('img-filters__button--active')
  );
  button.classList.add('img-filters__button--active');
};

const onFilterClick = (evt) => {
  const button = evt.target.closest('.img-filters__button');
  if (!button) return;

  const filter = button.id;
  if (filter === currentFilter) return;
  currentFilter = filter;
  setActiveButton(button);
  debouncedRender();
};

export const initFilters = (loadedPhotos) => {
  photos = loadedPhotos.slice();
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterClick);
}
