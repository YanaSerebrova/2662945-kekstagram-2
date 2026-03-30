const modalNode = document.querySelector('.big-picture');

export const openModal = (picture) => {
    console.log(picture);

    modalNode.classList.remove('hidden');
}

