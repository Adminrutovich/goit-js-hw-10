import { fetchBreeds, fetchCatByBreed } from "./cats_api";
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';


const select = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const loadError = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
let arrBreedsId = [];
loader.hidden = false;

fetchBreeds().then(data => {
    data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
        new SlimSelect({
            select: select,
            data: arrBreedsId,
        });
    })

.catch((err) => console.log(err));

select.addEventListener("change", creatingAPageAfterSelectingABreed);

function creatingAPageAfterSelectingABreed(event){
    const breadId = event.currentTarget.value;

    // Показываем сообщение о загрузке
    loader.removeAttribute("hidden");

    // Очищаем содержимое элемента .cat-info
    catInfo.innerHTML = '';

    fetchCatByBreed(breadId)
    .then((data) => { 
        // Убираем атрибут hidden у элемента catInfo
        catInfo.removeAttribute("hidden");
        // Вставляем данные в catInfo
        catInfo.insertAdjacentHTML("beforeend", createMarkup(data));
    })
    .catch((err) => console.log(err))
    .finally(() => {
        // Скрываем сообщение о загрузке после завершения запроса
        loader.setAttribute("hidden", "true");
    });
}

function createMarkup(arr) {
    return arr
      .map(({ url, breeds }) => {
        const breed = breeds[0];
        return `
          <div class="box-img"><img src="${url}" alt="${breed.name}" width="400px"></div>
          <div class="box">
            <h1>${breed.name}</h1>
            <p>${breed.description}</p>
            <p><b>Temperament: </b>${breed.temperament}</p>
          </div>`;
      })
      .join("");
  }
