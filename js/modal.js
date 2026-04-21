import { isEscapeKey } from './utils.js';

const modalNode = document.querySelector('.big-picture');
const imageContainerNode = modalNode.querySelector('.big-picture__img');
const bigPictureImageNode = imageContainerNode.querySelector('img');
const likesCountNode = modalNode.querySelector('.likes-count');
const commentsShownCountNode = modalNode.querySelector('.social__comment-shown-count');
const commentsTotalCountNode = modalNode.querySelector('.social__comment-total-count');
const commentsListNode = modalNode.querySelector('.social__comments');
const captionNode = modalNode.querySelector('.social__caption');
const commentsLoaderNode = modalNode.querySelector('.comments-loader');
const closeButtonNode = modalNode.querySelector('.big-picture__cancel');
const COMMENTS_STEP = 5;

let shownCommentsCount = 0;
let currentPhoto = null;

const renderComments = (comments, count = 5) => {
  const start = shownCommentsCount;
  const end = Math.min(start + count, comments.length);
  const commentsSlice = comments.slice(start, end);

  commentsSlice.forEach((comment) => {
    const liNode = document.createElement('li');
    liNode.classList.add('social__comment');

    const imageNode = document.createElement('img');
    imageNode.classList.add('social__picture');
    imageNode.src = comment.avatar;
    imageNode.alt = comment.name;
    imageNode.width = 35;
    imageNode.height = 35;

    const textNode = document.createElement('p');
    textNode.classList.add('social__text');
    textNode.textContent = comment.message;

    liNode.append(imageNode, textNode);
    commentsListNode.append(liNode);
  });

  shownCommentsCount = end;
  commentsShownCountNode.textContent = shownCommentsCount;
};

const onCommentsLoaderClick = () => {
  if (!currentPhoto) {
    return;
  }

  renderComments(currentPhoto.comments, COMMENTS_STEP);

  if (shownCommentsCount >= currentPhoto.comments.length) {
    commentsLoaderNode.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  modalNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButtonNode.removeEventListener('click', onCloseButtonClick);
  commentsLoaderNode.removeEventListener('click', onCommentsLoaderClick);

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

  bigPictureImageNode.src = photo.url;
  likesCountNode.textContent = photo.likes;
  commentsShownCountNode.textContent = 0;
  commentsTotalCountNode.textContent = photo.comments.length;
  captionNode.textContent = photo.description;

  commentsListNode.innerHTML = '';

  renderComments(photo.comments, COMMENTS_STEP);

  if (photo.comments.length > shownCommentsCount) {
    commentsLoaderNode.classList.remove('hidden');
  } else {
    commentsLoaderNode.classList.add('hidden');
  }

  closeButtonNode.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderNode.addEventListener('click', onCommentsLoaderClick);
};

