import { apiUrl } from "./variables";

const getBunOptions = async () => {
  try {
    const response = await fetch(apiUrl + "/bun");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};
const getBsausageOptions = async () => {
  try {
    const response = await fetch(apiUrl + "/sausage");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};
const getToppingsOptions = async () => {
  try {
    const response = await fetch(apiUrl + "/toppings");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};
const getSauceOptions = async () => {
  try {
    const response = await fetch(apiUrl + "/sauce");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};
const getMenu = async () => {
  try {
    const response = await fetch(apiUrl + "/menu");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};
const getBeverage = async () => {
  try {
    const response = await fetch(apiUrl + "/beverages");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

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
};

const displaySausageOptions = async () => {
  const sausageOptions = await getBsausageOptions();
  console.log(sausageOptions);

  const sausageContainer = document.querySelector(".sausage-container");
  if (sausageContainer) {
    const sausageTitle = document.createElement("h3");
    sausageTitle.textContent = "Choose sausage";
    sausageContainer.appendChild(sausageTitle);

    sausageOptions.forEach((option: any) => {
      const checkboxContainer = document.createElement("div");
      checkboxContainer.className = "checkbox-container custom-checkbox";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "sausage-checkbox";
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

      sausageContainer.appendChild(checkboxContainer);
    });
    sausageContainer.appendChild(sausageContainer);
  }
};

const displayToppingsOptions = async () => {
  const toppingsOptions = await getToppingsOptions();
  console.log(toppingsOptions);

  const toppingsContainer = document.querySelector(".toppings-container");
  if (toppingsContainer) {
    const toppingsTitle = document.createElement("h3");
    toppingsTitle.textContent = "Choose toppings";
    toppingsContainer.appendChild(toppingsTitle);

    toppingsOptions.forEach((option: any) => {
      const checkboxContainer = document.createElement("div");
      checkboxContainer.className = "checkbox-container custom-checkbox";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "toppings-checkbox";
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

      toppingsContainer.appendChild(checkboxContainer);
    });
    toppingsContainer.appendChild(toppingsContainer);
  }
};

const displaySauceOptions = async () => {
  const sauceOptions = await getSauceOptions();
  console.log(sauceOptions);

  const sauceContainer = document.querySelector(".sauce-container");
  if (sauceContainer) {
    const sauceTitle = document.createElement("h3");
    sauceTitle.textContent = "Choose sauce";
    sauceContainer.appendChild(sauceTitle);

    sauceOptions.forEach((option: any) => {
      const checkboxContainer = document.createElement("div");
      checkboxContainer.className = "checkbox-container custom-checkbox";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "sauce-checkbox";
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

      sauceContainer.appendChild(checkboxContainer);
    });
    sauceContainer.appendChild(sauceContainer);
  }
};

const displayMenu = async () => {
  const menu = await getMenu();
  console.log(menu);

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
    menuContainer.appendChild(menuContainer);
  }
};

const displayBeverage = async () => {
  const beverage = await getBeverage();
  console.log(beverage);

  const beverageContainer = document.querySelector(".drink-container");
  if (beverageContainer) {
    beverage.forEach((option: any) => {
      const beverageItemContainer = document.createElement("div");
      beverageItemContainer.className = "drink-item-container";

      const img = document.createElement("img");
      img.className = "drink-image";
      img.src = option.image;
      img.alt = option.label;

      const title = document.createElement("h3");
      title.className = "drink-title";
      title.textContent = option.label;

      const price = document.createElement("p");
      price.className = "drink-price";
      price.textContent = option.price + "€";

      const button = document.createElement("a");
      button.className = "add-to-cart-btn";
      button.textContent = "Lisää koriin";

      beverageItemContainer.appendChild(img);
      beverageItemContainer.appendChild(title);
      beverageItemContainer.appendChild(price);
      beverageItemContainer.appendChild(button);

      beverageContainer.appendChild(beverageItemContainer);
    });
    beverageContainer.appendChild(beverageContainer);
  }
};
export {
  displayBunOptions,
  displaySausageOptions,
  displayToppingsOptions,
  displaySauceOptions,
  displayMenu,
  displayBeverage,
};
