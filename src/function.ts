import { url } from "./variables";
import { Beverage, Custom } from "./interfaces/Menu";

const getOptions = async (url: string, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error ${response.status} occured`);
  }
  const json = await response.json();
  return json;
};

const displayOptions = async () => {
  try {
    const options: Custom[] = await getOptions(url + "/custom");
    const productByType: { [key: string]: Custom[] } = {};

    options.forEach((option: Custom) => {
      if (!productByType[option.productType]) {
        productByType[option.productType] = [];
      }
      productByType[option.productType].push(option);
    });
    Object.keys(productByType).forEach((productType) => {
      const container = document.querySelector(`.${productType}-container`);
      if (container) {
        const title = document.createElement("h3");
        title.textContent = `Choose ${productType}`;
        container.appendChild(title);

        productByType[productType].forEach((option) => {
          const html = `
          <div class="checkbox-container custom-checkbox">
            <input type="checkbox" class="${productType}-checkbox" id="${option.id}" />
            <span style="margin-right: 10px;"></span> 
            <label for="${option.id}">${option.label}</label>
            <span class="price">${option.price}€</span>
          </div>
        `;
          container.innerHTML += html;
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

/* 
const displayBunOptions = async () => {
  const bunOptions = await getBunOptions();
  console.log(bunOptions);

  const bunContainer = document.querySelector(".bun-container");
  if (bunContainer) {
    const bunTitle = document.createElement("h3");
    bunTitle.textContent = "Choose bun";
    bunContainer.appendChild(bunTitle);

    bunOptions.forEach((option: any) => {
      const checkboxContainer = document.createElement("div");
      checkboxContainer.className = "checkbox-container custom-checkbox";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "bun-checkbox";
      input.id = option.id;

      const label = document.createElement("label");
      label.htmlFor = option.id;
      label.textContent = option.label;

      const price = document.createElement("span");
      price.className = "price";
      price.textContent = option.price + "€";

      label.appendChild(price);

      checkboxContainer.appendChild(input);
      checkboxContainer.appendChild(label);

      bunContainer.appendChild(checkboxContainer);
    });
    bunContainer.appendChild(bunContainer);
  }
};*/

const displayMenu = async () => {
  const menu = await getOptions(url + "/menu");

  const menuContainer = document.querySelector(".menu-container");
  if (menuContainer) {
    menu.forEach((option: any) => {
      const menuItemContainer = document.createElement("div");
      menuItemContainer.className = "menu-item-container";

      const img = document.createElement("img");
      img.className = "menu-food-image";
      img.src = option.image;
      img.alt = option.label;

      const title = document.createElement("h3");
      title.className = "menu-food-title";
      title.textContent = option.label;

      const ingredientsTitle = document.createElement("span");
      ingredientsTitle.className = "ingredients-title";
      ingredientsTitle.textContent = "Ingredients: ";

      const ingredients = document.createElement("p");
      ingredients.className = "menu-ingredients";
      ingredients.textContent = option.ingredient;

      const price = document.createElement("p");
      price.className = "menu-price";

      price.textContent = option.price + "€";

      const button = document.createElement("a");
      button.className = "add-to-cart-btn";
      button.textContent = "Lisää koriin";

      menuItemContainer.appendChild(img);
      menuItemContainer.appendChild(title);
      menuItemContainer.appendChild(ingredients);
      menuItemContainer.appendChild(price);
      menuItemContainer.appendChild(button);

      menuContainer.appendChild(menuItemContainer);
    });
  }
};

const displayBeverage = async () => {
  const beverage: Beverage[] = await getOptions(url + "/beverages");

  const beverageContainer = document.querySelector(".drink-container");
  if (beverageContainer) {
    beverage.forEach((option: Beverage) => {
      const html = `
      <div class='drink-item-container'>
        <h3 class='drink-title'>${option.label}</h3>
        <p class='drink-price'>${option.price}€</p>
        <a class='add-to-cart-btn'>Lisää koriin</a>
      </div>
      `;
      beverageContainer.innerHTML += html;
    });
  }
};

export { displayMenu, displayBeverage, displayOptions };
