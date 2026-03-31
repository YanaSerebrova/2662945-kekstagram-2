import { openModal } from './modal.js';

const picturesContainerNode = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

export const renderPictures = (photos) => {
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

    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      openModal(photo);
    });

    fragment.appendChild(picture);
  });

  picturesContainerNode.appendChild(fragment);
};
