
const PHOTOS_COUNT = 25;
const Likes = {
  MIN: 15,
  MAX: 200
};
const CommentsCount = {
  MIN: 0,
  MAX: 30
};
const Names = [
  'Мария',
  'Юля',
  'Павел',
  'Антон',
  'Катя',
  'Даша'
];

const Descriptions = [
  'Вид на горы',
  'Горный пейзаж',
  'Прогулка по лесу',
  'Вид на озеро',
  'Закат',
  'Вечерняя прогулка'
];

const Comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export const getRandomNumber = (min, max) => {
  const left = Math.ceil(Math.min(min, max));
  const right = Math.floor(Math.max(min,max));
  const random = Math.random() * (right - left + 1) + left;
  return Math.floor(random);
};

const getRandomElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

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

const getPhotos = (count) => Array.from({ length: count }, (_, i) => getPhoto(i + 1));

console.log(getPhotos(PHOTOS_COUNT));
