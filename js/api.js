const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

export const getPhotos = () => fetch(BASE_URL + Route.GET_DATA)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });

export const sendPhoto = (body) => fetch(BASE_URL + Route.SEND_DATA, {
  method: 'POST',
  body,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка отправки данных');
    }
  });

