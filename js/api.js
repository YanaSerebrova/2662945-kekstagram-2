const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

export const getPhotos = () => {
  return fetch(BASE_URL + Route.GET_DATA)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      return response.json();
    });
};

export const sendPhoto = (formData) => {
  return fetch(BASE_URL + Route.SEND_DATA, {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка отправки данных');
    }
  });
};
