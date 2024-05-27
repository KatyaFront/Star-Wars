import { urls } from './src/js/urls';
import { fetchAllData } from './src/js/fetchData';
import { createItemPropsHero, createBlockItemPropsHero } from './src/js/createItem';
import { openModal, closeModal } from './src/js/modal';
import './src/styles/normalize.css';
import './src/styles/style.css';

// получаем доступ к html-элементам
const heroList = document.getElementById('list');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal__close');
const modalList = document.getElementById('modal__list');
const modalTitle = document.getElementById('modal__title');

(async () => {
  // массив с полученными данными
  const arrayData = await fetchAllData(urls);

  // деструктуризация масива
  const [
    peopleData,
    planetsData,
    filmsData,
    speciesData,
    vehiclesData,
    starshipsData,
  ] = arrayData;

  // функция отрисовки элементов на странице
  function addData() {
    // перебор элементов массива (каждый элемент - это объект с данными: имя, цвет волос, глаз, авто и др.)
    peopleData.forEach((element) => {
      // создаём элемент списка, в каждом элементе будет отражен один герой со всеми характеристиками
      const itemHeroList = document.createElement('li');
      itemHeroList.classList.add('list__item');

      // перебор свойств в элементе массива (объекте)
      for (const key in element) {
        // создаём условие, в зависимости от названия свойств в элементе массива (объекте), будем выводить разные значения
        switch (key) {
          // если название свойства name, то:
          case 'name':
            const nameHero = document.createElement('h2');
            nameHero.classList.add('title');
            nameHero.textContent = element[key];
            itemHeroList.appendChild(nameHero);
            break;

          // если название свойства homeworld, то:
          case 'homeworld':
            planetsData.forEach((object) => {
              for (const keyObject in object) {
                if (object[keyObject] === element[key]) {
                  createItemPropsHero(
                    'homeworld',
                    object,
                    'name',
                    itemHeroList
                  );
                }
              }
            });
            break;

          // если название свойства films, то:
          case 'films':
            if (element[key].length > 0) {
              createBlockItemPropsHero(
                itemHeroList,
                filmsData,
                element,
                'films',
                'title'
              );
            }
            break;

          // если название свойства species, то:
          case 'species':
            if (element[key].length > 0) {
              createBlockItemPropsHero(
                itemHeroList,
                speciesData,
                element,
                'species',
                'name'
              );
            }
            break;

          // если название свойства vehicles, то:
          case 'vehicles':
            if (element[key].length > 0) {
              const blockProps = document.createElement('div');
              const propsHero = document.createElement('p');
              propsHero.innerHTML = `<strong>${key}:</strong>`;

              blockProps.appendChild(propsHero);
              itemHeroList.appendChild(blockProps);

              vehiclesData.forEach((object) => {
                for (const keyObject in object) {
                  element[key].forEach((url) => {
                    if (url === object[keyObject]) {
                      const descPropsHero = document.createElement('a');
                      descPropsHero.textContent = object.name;

                      openModal(
                        descPropsHero,
                        modalTitle,
                        modalList,
                        modal,
                        object,
                        'name'
                      );

                      closeModal(modalClose, modal);

                      blockProps.appendChild(descPropsHero);
                    }
                  });
                }
              });
            }
            break;

          // если название свойства starships, то:
          case 'starships':
            if (element[key].length > 0) {
              createBlockItemPropsHero(
                itemHeroList,
                starshipsData,
                element,
                'starships',
                'name'
              );
            }
            break;

          // иначе:
          default:
            if ((key !== 'created') & (key !== 'edited') & (key !== 'url')) {
              createItemPropsHero(key, element, key, itemHeroList);              
            }
        }
      }
      // добавляем элементы списка в список
      heroList.appendChild(itemHeroList);
    });
  }

  addData();
})();
