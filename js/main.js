import { renderPictures } from './cards.js';
import { PHOTOS_COUNT } from './data.js';
import { getPhotos } from './photos.js';
import { initUploadModal } from './form.js';
initUploadModal();

const photos = getPhotos(PHOTOS_COUNT);
renderPictures(photos);
