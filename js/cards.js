import { openModal } from './modal.js';

const picturesContainerNode = document.querySelector('.pictures');
const pictureTemplateNode = document.querySelector('#picture').content.querySelector('.picture');

const clearPictures = () => {
  picturesContainerNode.querySelectorAll('.picture').forEach((element) => element.remove());
};

export const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();
  clearPictures();

  photos.forEach((photo) => {
    const pictureNode = pictureTemplateNode.cloneNode(true);
    const imageNode = pictureNode.querySelector('.picture__img');
    const likesNode = pictureNode.querySelector('.picture__likes');
    const commentsNode = pictureNode.querySelector('.picture__comments');

    imageNode.src = photo.url;
    imageNode.alt = photo.description;
    likesNode.textContent = photo.likes;
    commentsNode.textContent = photo.comments.length;


    pictureNode.addEventListener('click', (evt) => {
      evt.preventDefault();
      openModal(photo);
    });

    fragment.appendChild(pictureNode);
  });

  picturesContainerNode.appendChild(fragment);
};
