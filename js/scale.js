
export const initScaleControls = (previewImage, scaleInput, biggerBtn, smallerBtn) => {

  let scale = 1;
  const STEP = 0.25;

  const updateScale = () => {
    previewImage.style.transform = `scale(${scale})`;
    scaleInput.value = Math.round(scale * 100);
  };

  const onBiggerClick = () => {
    if (scale < 1) {
      scale += STEP;
      if (scale > 1) scale = 1;
      updateScale();
    }
  };

  const onSmallerClick = () => {
    if (scale > 0.25) {
      scale -= STEP;
      if (scale < 0.25) scale = 0.25;
      updateScale();
    }
  };

  const resetScale = () => {
    scale = 1;
    updateScale();
  };

  biggerBtn.addEventListener('click', onBiggerClick);
  smallerBtn.addEventListener('click', onSmallerClick);

  return { resetScale };
};
