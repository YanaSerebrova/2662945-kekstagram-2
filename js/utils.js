import { DELAY } from './constants.js';

const alertTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const body = document.body;

export const getRandomNumber = (min, max) => {
  const left = Math.ceil(Math.min(min, max));
  const right = Math.floor(Math.max(min, max));
  const random = Math.random() * (right - left + 1) + left;
  return Math.floor(random);
};

export const getRandomElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export const showAlert = () => {
  const alert = alertTemplate.cloneNode(true);
  body.append(alert);
  setTimeout(() => {
    alert.remove();
  }, DELAY);
}