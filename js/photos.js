import {getRandomNumber, getRandomElement} from './util.js'
let commentId = 1;

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomElement(Comments),
  name: getRandomElement(Names),
});

const getComments = () => {
  const count = getRandomNumber(CommentsCount.MIN, CommentsCount.MAX);
  const comments = [];
  for (let i = 1; i <= count; i++) {
    comments.push(createComment())
  }
  return comments;
};

const getPhoto = (k) => ({
  id: k,
  url: `photos/${k}.jpg`,
  description: getRandomElement(Descriptions),
  likes: getRandomNumber(Likes.MIN, Likes.MAX),
  comments: getComments()
});

export const getPhotos = (count) => Array.from({ length: count }, (_, i) => getPhoto(i + 1));

console.log(getPhotos(PHOTOS_COUNT));
