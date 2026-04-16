import { renderPictures } from './cards.js'
import { getPhotos } from './api.js';
import { initUploadModal } from './form.js';
initUploadModal();

getPhotos()
  .then((photos) => {
    renderPictures(photos);
  })
  .catch(() => {
    console.error('Ошибка загрузки');
  });
