import { url } from "./variables";
import { ChefChoice, CustomIngredient, Ingredients } from "./interfaces/Menu";

const getOptions = async (url: string, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error ${response.status} occured`);
  }
  const json = await response.json();
  return json;
};
let customIngredients: { [key: string]: CustomIngredient } = {};

const displayOptions = async () => {
  try {
    const options: Ingredients[] = await getOptions(url + "/ingridients");
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
          <input type="Checkbox" class="productChekcbox" id="Topping-${option.topping_id}" />
          <span style="margin-right: 10px;"></span> 
          <label for="Topping-${option.topping_id}">${option.topping_name}</label>
          <span class="price">${option.price}€</span>
      </div>
            `;
          container.insertAdjacentHTML("beforeend", html);
        });
        const checkboxes: NodeListOf<HTMLInputElement> =
          container.querySelectorAll(".productChekcbox");

        checkboxes.forEach((checkbox: HTMLInputElement) => {
          checkbox.addEventListener("change", (event: Event) => {
            const targetCheckbox = event.target as HTMLInputElement;
            const id = targetCheckbox.id.split("-")[1];
            const parsedId = parseInt(id, 10);
            const priceElement =
              targetCheckbox.nextElementSibling?.nextElementSibling
                ?.nextElementSibling;
            const productName =
              priceElement?.previousElementSibling?.textContent;
            const price = parseFloat(priceElement?.textContent || "0");

            if (targetCheckbox.checked) {
              customIngredients[productName || ""] = {
                price,
                toppingId: parsedId,
              };
            } else {
              delete customIngredients[productName || ""];
            }

            let totalSum = 0;
            Object.values(customIngredients).forEach((ingredient) => {
              totalSum += ingredient.price;
              const totalBox = document.querySelector(".total");
              if (totalBox) {
                totalBox.textContent = `Total Sum: ${totalSum.toFixed(2)}`;
              }
              const addToCartButton = document.querySelector(
                ".add-custom-to-cart-btn"
              );
              if (addToCartButton) {
                addToCartButton.addEventListener("click", () => {
                  checkboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                    customIngredients = {};
                  });
                });
              }
            });
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const displayChefchoice = async () => {
  try {
    const allProducts: ChefChoice[] = await getOptions(url + "/menu");

    const menuContainer = document.querySelector(".menu-container");
    if (menuContainer) {
      allProducts.forEach((option: ChefChoice) => {
        const html = `
          <div class="menu-item-container">
            <h3 class="menu-food-title" id="Menu-${option.custom_id}">${option.hotdog_name}</h3>
            <p class = "menu-ingredients ">${option.toppings}</p>
            <p class="menu-price">${option.base_price}€</p>
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

/* const displayBeverage = async () => {
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
}; */

export { displayChefchoice, displayOptions, customIngredients };
