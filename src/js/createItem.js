// функция создания и добавления на страницу блока с элементами, содержащими свойства героя
export function createBlockItemPropsHero(list, data, element, key, nameObject) {
  const blockProps = document.createElement('div');
  const propsHero = document.createElement('p');
  propsHero.innerHTML = `<strong>${key}:</strong>`;

  blockProps.appendChild(propsHero);
  list.appendChild(blockProps);

  data.forEach((object) => {
    for (const keyObject in object) {
      element[key].forEach((url) => {
        if (url === object[keyObject]) {
          const descPropsHero = document.createElement('p');
          descPropsHero.textContent = object[nameObject];
          blockProps.appendChild(descPropsHero);
        }
      });
    }
  });
}

// функция создания и добавления на страницу элемента, содержащего свойства героя
export function createItemPropsHero(key, object, nameObject, item) {
  const descPropsHero = document.createElement('p');
  descPropsHero.innerHTML = `<strong>${key}:</strong> ${object[nameObject]}`;
  item.appendChild(descPropsHero);
}