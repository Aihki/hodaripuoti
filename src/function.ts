import { url } from './variables';
import { ChefChoice, CustomIngredient, Ingredients } from './interfaces/Menu';
import { fetchData } from './functions';

const getOptions = async (url: string, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error ${response.status} occured`);
  }
  const json = await response.json();
  return json;
};
let customIngredients: CustomIngredient[] = [];

const displayOptions = async () => {
  try {
    const options: Ingredients[] = await getOptions(url + '/ingridients');
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
        const title = document.createElement('h3');
        title.textContent = `Valitse ${productType}`;
        container.appendChild(title);

        productByType[productType].forEach((option) => {
          const html = `
          <div class="checkbox-container custom-checkbox">
          <input type="Checkbox" class="productChekcbox" id="Topping-${option.topping_id}" />
          <span style="margin-right: 10px;"></span> 
          <label for="Topping-${option.topping_id}">${option.topping_name}</label>
          <span class="price">${option.topping_price}€</span>
      </div>
            `;
          container.insertAdjacentHTML('beforeend', html);
        });
        const checkboxes: NodeListOf<HTMLInputElement> =
          container.querySelectorAll('.productChekcbox');

        checkboxes.forEach((checkbox: HTMLInputElement) => {
          checkbox.addEventListener('change', (event: Event) => {
            const targetCheckbox = event.target as HTMLInputElement;
            const id = targetCheckbox.id.split('-')[1];
            const parsedId = parseInt(id, 10);
            const priceElement =
              targetCheckbox.nextElementSibling?.nextElementSibling
                ?.nextElementSibling;
            const productName =
              priceElement?.previousElementSibling?.textContent;
            const price = parseFloat(priceElement?.textContent || '0');

            if (targetCheckbox.checked) {
              customIngredients.push({
                topping_name:
                  typeof productName === 'string' ? productName : undefined,
                topping_price: price,
                topping_id: parsedId,
              });
            }

            let totalSum = 0;
            Object.values(customIngredients).forEach((ingredient) => {
              totalSum += ingredient.topping_price;
              const totalBox = document.querySelector('.total');
              if (totalBox) {
                console.log(totalSum);
                totalBox.textContent = `Total Sum: ${totalSum.toFixed(2)}`;
              }
              const addToCartButton = document.querySelector(
                '.add-custom-to-cart-btn'
              );
              if (addToCartButton) {
                addToCartButton.addEventListener('click', () => {
                  checkboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                    customIngredients = [];
                    /*    if (totalBox) {
                      totalSum = 0;
                      totalBox.textContent = `Total Sum: ${totalSum.toFixed(
                        2
                      )}`;
                    } */
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
    const allProducts: ChefChoice[] = await getOptions(url + '/menu');

    const menuContainer = document.querySelector('.menu-container');
    if (menuContainer) {
      const nonCustomProducts = allProducts.filter(
        (option) => option.hotdog_name !== 'Custom'
      );

      nonCustomProducts.forEach(async (option: ChefChoice) => {
        const toppings = await fetchData(
          url + '/hotdog/hotdogToppings/' + option.hotdog_id
        );
        let toppingString = '';
        if (!toppings) {
          toppingString = 'Ei lisukkeita';
        } else {
          toppings.forEach((ingredient: any, index: number) => {
            if (index === toppings.length - 1) {
              toppingString += ingredient.topping_name;
            } else {
              toppingString += ingredient.topping_name + ', ';
            }
          });
        }
        const html = `
          <div class="menu-item-container">
            <h3 class="menu-food-title" id="Menu-${option.hotdog_id}">${option.hotdog_name}</h3>
            <p class = "menu-ingredients ">${toppingString}</p>
            <p class="menu-price">${option.base_price}€</p>
            <a class='add-to-cart-btn'>Lisää koriin</a>
          </div>
        `;
        menuContainer.insertAdjacentHTML('beforeend', html);
      });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
export { displayChefchoice, displayOptions, customIngredients };
