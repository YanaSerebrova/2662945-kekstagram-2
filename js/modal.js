

const modalNode = document.querySelector('.big-picture');
const imgContainer = modalNode.querySelector('.big-picture__img');
const bigPictureImg = imgContainer.querySelector('img');
const likesCount = modalNode.querySelector('.likes-count');
const commentsShownCount = modalNode.querySelector('.social__comment-shown-count');
const commentsTotalCount = modalNode.querySelector('.social__comment-total-count');
const commentsList = modalNode.querySelector('.social__comments');
const caption = modalNode.querySelector('.social__caption');
const commentCount = modalNode.querySelector('.social__comment-count');
const commentsLoader = modalNode.querySelector('.comments-loader');
const closeButton = modalNode.querySelector('.big-picture__cancel');


const closeBigPicture = () => {
  modalNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
     evt.preventDefault();
    closeBigPicture();
  }
}

const onCloseButtonClick = () => {
  closeBigPicture();
};

const renderComments = (comments) => {
  commentsList.textContent = '';
  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;

    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = comment.message;

    commentElement.append(img);
    commentElement.append(text);
    commentsList.append(commentElement);
  });
};


export const openModal = (photo) => {
  modalNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsShownCount.textContent = photo.comments.length;
  commentsTotalCount.textContent = photo.comments.length;
  caption.textContent = photo.description;

  renderComments(photo.comments);
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

