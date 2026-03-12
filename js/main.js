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
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getRandomElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
}
let commentId = 1;
function createComment() {
  return {
    id: commentId++,
    avatar:: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: getRandomElement(Comments),
    name: getRandomElement(Names),
  };
}
function createComments() {
  const comments = [];
  const commentsCount = getRandomNumber(0, 30);
  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }


