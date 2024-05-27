// функция появления модального окна при нажатии на ссылку
export function openModal(link, title, list, modal, object, titleObject) {
  link.onclick = (e) => {
    e.preventDefault();
    title.innerHTML = '';
    list.innerHTML = '';

    modal.style.display = 'block';
    modal.style.top = `${window.innerHeight / 2}px`;
    modal.style.left = `${window.innerWidth / 2}px`;

    title.textContent = object[titleObject];

    for (let key in object) {
      if (key === 'pilots') {
        const item = document.createElement('li');
        item.classList.add('modal__item');
        item.innerHTML = `<strong>${key}:</strong> ${object[key].length}`;

        list.appendChild(item);
      } else if (
        (key !== 'name') &
        (key !== 'films') &
        (key !== 'created') &
        (key !== 'edited') &
        (key !== 'url')
      ) {
        const item = document.createElement('li');
        item.classList.add('modal__item');
        item.innerHTML = `<strong>${key}:</strong> ${object[key]}`;

        list.appendChild(item);
      }
    }
  };
}

// функция закрытия модального окна при нажатии на крестик
export function closeModal(closeButton, modal) {
  closeButton.onclick = () => {
    modal.style.display = 'none';
  };
}