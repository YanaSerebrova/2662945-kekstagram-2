const photos = getPhoto(25);

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const renderPictures = () => {
  const fragment = document.createDocumentFragment();

photos.forEach((photo) => {
const pictureElement = pictureTemplate.cloneNode(true);
const img = pictureElement.querySelector('.picture__img');
const likes = pictureElement.querySelector('.picture__likes');
const comments = pictureElement.querySelector('.picture__comments');

img.src = photo.url;
img.alt = photo.description;
likes.textContent = photo.likes;
comments.textContent = photo.comments.length;

fragment.appendChild(pictureElement);
  });

picturesContainer.appendChild(fragment);
};

renderPictures();
