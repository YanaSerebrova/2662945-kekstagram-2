import { renderPictures } from './cards.js'
import { getPhotos } from './api.js';
import { initUploadModal } from './form.js';
import { showAlert } from './utils.js';
initUploadModal();

getPhotos()
  .then((photos) => {
    renderPictures(photos);
  })
  .catch(() => {
    showAlert();
  });
