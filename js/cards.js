import { getPhotos } from "./photos.js";

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

export const renderPictures = () => {
  const photos = getPhotos(25);
  console.log('Всего фоток:', photos.length);
  const fragment = document.createDocumentFragment();

photos.forEach((photo) => {
const picture = pictureTemplate.cloneNode(true);
const img = picture.querySelector('.picture__img');
const likes = picture.querySelector('.picture__likes');
const comments = picture.querySelector('.picture__comments');

img.src = photo.url;
img.alt = photo.description;
likes.textContent = photo.likes;
comments.textContent = photo.comments.length;

fragment.appendChild(picture);
  });

picturesContainer.appendChild(fragment);
};

