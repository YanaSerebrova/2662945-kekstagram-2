import { COMMENTS_STEP } from './constants.js';
import { isEscapeKey } from './utils.js';

const modalNode = document.querySelector('.big-picture');
const imgContainer = modalNode.querySelector('.big-picture__img');
const bigPictureImg = imgContainer.querySelector('img');
const likesCount = modalNode.querySelector('.likes-count');
const commentsShownCount = modalNode.querySelector('.social__comment-shown-count');
const commentsTotalCount = modalNode.querySelector('.social__comment-total-count');
const commentsList = modalNode.querySelector('.social__comments');
const caption = modalNode.querySelector('.social__caption');
const commentsLoader = modalNode.querySelector('.comments-loader');
const closeButton = modalNode.querySelector('.big-picture__cancel');

let shownCommentsCount = 0;
let currentPhoto = null;

const renderComments = (comments, count = 5) => {
  const start = shownCommentsCount;
  const end = Math.min(start + count, comments.length);

  for (let i = start; i < end; i++) {
    const comment = comments[i];

    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;

    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = comment.message;

    li.append(img, text);
    commentsList.append(li);
  }

  shownCommentsCount = end;
  commentsShownCount.textContent = shownCommentsCount;
};

const onCommentsLoaderClick = () => {
  if (!currentPhoto) {
    return;
  }

  renderComments(currentPhoto.comments, COMMENTS_STEP);

  if (shownCommentsCount >= currentPhoto.comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  modalNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);

  shownCommentsCount = 0;
  currentPhoto = null;
};

function onCloseButtonClick(){
  closeBigPicture();
}

function onDocumentKeydown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export const openModal = (photo) => {
  shownCommentsCount = 0;
  currentPhoto = photo;

  modalNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsShownCount.textContent = 0;
  commentsTotalCount.textContent = photo.comments.length;
  caption.textContent = photo.description;

  commentsList.innerHTML = '';

  renderComments(photo.comments, COMMENTS_STEP);

  if (photo.comments.length > shownCommentsCount) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

