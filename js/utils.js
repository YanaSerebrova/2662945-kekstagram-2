const alertTemplateNode = document.querySelector('#data-error').content.querySelector('.data-error');
const bodyNode = document.body;
const DELAY = 5000;

export const showAlert = () => {
  const alertNode = alertTemplateNode.cloneNode(true);
  bodyNode.append(alert);
  setTimeout(() => {
    alertNode.remove();
  }, DELAY);
};
export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const isEscapeKey = (evt) => evt.key === 'Escape';
