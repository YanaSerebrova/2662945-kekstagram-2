const DELAY = 5000;

const alertTemplateNode = document.querySelector('#data-error').content.querySelector('.data-error');
const bodyNode = document.body;

export const showAlert = () => {
  const alertNode = alertTemplateNode.cloneNode(true);
  bodyNode.append(alertNode);
  setTimeout(() => {
    alertNode.remove();
  }, DELAY);
};
export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
  };
};

export const isEscapeKey = (evt) => evt.key === 'Escape';
