import { renderPictures } from './cards.js';
import { getPhotos } from './api.js';
import { initUploadModal } from './form.js';
import { showAlert } from './utils.js';
import { initFilters } from './filter.js';
initUploadModal();

getPhotos()
  .then((photos) => {
    renderPictures(photos);
    initFilters(photos);
  })
  .catch(() => {
    showAlert();
  });
