export const showSuccess = () => {
  const template = document.querySelector('#success').content.cloneNode(true);
  document.body.append(template);
};

export const showError = () => {
  const template = document.querySelector('#error').content.cloneNode(true);
  document.body.append(template);
};
