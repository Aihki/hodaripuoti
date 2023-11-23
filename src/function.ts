import { url } from "./variables";
import { Beverages, ChefChoice, Ingredients } from "./interfaces/Menu";

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
    const options: Ingredients[] = await getOptions(url + "/custom/products");
    console.log(options);
    const productByType: { [key: string]: Ingredients[] } = {};

    options.forEach((option: Ingredients) => {
      if (!productByType[option.topping_type]) {
        productByType[option.topping_type] = [];
      }
      productByType[option.topping_type].push(option);
    });
    Object.keys(productByType).forEach((productType) => {
      const container = document.querySelector(`.${productType}-container`);
      if (container) {
        const title = document.createElement("h3");
        title.textContent = `Valitse ${productType}`;
        container.appendChild(title);

        productByType[productType].forEach((option) => {
          const html = `
          <div class="checkbox-container custom-checkbox">
          <input type="checkbox" class="${productType}-checkbox" id="${option.topping_id}" />
          <span style="margin-right: 10px;"></span> 
          <label for="${option.topping_id}">${option.topping_name}</label>
          <span class="price">${option.price}€</span>
          </div>
        `;
          container.insertAdjacentHTML("beforeend", html);
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const displayChefchoice = async () => {
  try {
    const allProducts: ChefChoice[] = await getOptions(url + "/menu/chef");

    const menuContainer = document.querySelector(".menu-container");
    if (menuContainer) {
      allProducts.forEach((option: ChefChoice) => {
        const html = `
          <div class="menu-item-container">
            <h3 class="menu-food-title">${option.hotdog_name}</h3>
            <p class = "menu-ingredients ">${option.toppings}</p>
            <p class="menu-price">Price: $${option.base_price}</p>
            <a class='add-to-cart-btn'>Lisää koriin</a>
          </div>
        `;
        menuContainer.insertAdjacentHTML("beforeend", html);
      });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const displayBeverage = async () => {
  try {
    const allProducts: Beverages[] = await getOptions(url + "/beverage");

    const beverageContainer = document.querySelector(".drink-container");
    if (beverageContainer) {
      allProducts.forEach((option: Beverages) => {
        const html = `
            <div class='drink-item-container'>
              <h3 class='drink-title'>${option.beverage_name}</h3>
              <p class='drink-price'>${option.beverage_price}€</p>
              <a class='add-to-cart-btn'>Lisää koriin</a>
            </div>
          `;
        beverageContainer.insertAdjacentHTML("beforeend", html);
      });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export { displayChefchoice, displayBeverage, displayOptions };
