import { displayChefchoice, displayOptions } from "./function";
import { runAppStarterListeners } from "./listeners";
import { customIngredients } from "./function";
import { Hotdog } from "./interfaces/Order";
import { createNewOrder, fetchData } from "./functions";
import { url } from "./variables";

const burger: HTMLElement | null = document.querySelector(".burgermenu");
const navMenu: HTMLElement | null = document.querySelector(".nav-menu");
let allCartItems: Hotdog[] = [];

if (burger && navMenu) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      burger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );
}

const checkbox: HTMLInputElement | null = document.getElementById(
  "checkbox"
) as HTMLInputElement;

if (checkbox) {
  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });
}
const isPartiallyVisible = (el: Element): boolean => {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= windowHeight && rect.bottom >= 0;
};

const handleScroll = () => {
  const menuItems = document.querySelectorAll<Element>(
    "#menu .menu-item-container"
  );

  menuItems.forEach((item) => {
    if (isPartiallyVisible(item)) {
      item.classList.add("reveal");
    }
  });
};

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);

let slideIndex: number = 0;
const slides: NodeListOf<Element> =
  document.querySelectorAll(".custom-container");
const prevButton: HTMLElement | null = document.querySelector(".prev");
const nextButton: HTMLElement | null = document.querySelector(".next");

function showSlide(n: number): void {
  slides.forEach((slide: Element) => {
    (slide as HTMLElement).style.display = "none";
  });

  (slides[n] as HTMLElement).style.display = "";
}

showSlide(slideIndex);

prevButton?.addEventListener("click", () => {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  showSlide(slideIndex);
});

nextButton?.addEventListener("click", () => {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
});

displayChefchoice();
displayOptions();

/**
 * Checks if user is admin and its status
 * 0 is regular user, 1 is chef or cashier, 2 is super admin
 * @returns role status - [0, 1, 2]
 */

runAppStarterListeners();

const cartIcon: HTMLElement | null = document.querySelector("#cart-icon");
const cart: HTMLElement | null = document.querySelector(".cart");
const closeCart: HTMLElement | null = document.querySelector("#cart-close");

if (cartIcon && cart && closeCart) {
  cartIcon.addEventListener("click", () => {
    if (cart) {
      cart.classList.add("active");
    }
  });

  closeCart.addEventListener("click", () => {
    if (cart) {
      cart.classList.remove("active");
    }
  });
}

const purchaseClicked = (cart: object) => {
  console.log(cart);
  const cartItems: HTMLElement | null = document.querySelector(".cart-content");
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }
  if (allCartItems.length > 0) {
    console.log(allCartItems);
    createNewOrder(allCartItems, 100);
  }
};

const removeCartItem = (event: Event) => {
  const buttonClicked = event.target as HTMLElement;
  if (buttonClicked.parentElement) {
    const indexToDelete = buttonClicked.getAttribute("data-hotdog-index");
    if (!indexToDelete) {
      return;
    }

    const deleteIndex = parseInt(indexToDelete);

    const hotdogRemoveButtons = document.querySelectorAll(
      "[data-hotdog-index]"
    );
    hotdogRemoveButtons.forEach((btn) => {
      const currentBtnIndex = btn.getAttribute("data-hotdog-index");
      if (!currentBtnIndex) {
        return;
      }

      const currentIndex = parseInt(currentBtnIndex);
      if (currentIndex > deleteIndex) {
        btn.setAttribute("data-hotdog-index", (currentIndex - 1).toString());
      }
    });

    buttonClicked.parentElement.remove();
    allCartItems.splice(deleteIndex, 1);
    console.log(allCartItems);
    updateCartTotal();
  }
};

const quantityChanged = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.setAttribute("data-quantity", input.value);
  const quantityString = input.getAttribute("data-quantity");
  let quantity = parseInt(quantityString || "0", 10);
  console.log(quantity);
  if (quantity < 0) {
    console.log("quantity < 0", quantity);
    quantity = 0;
    input.setAttribute("data-quantity", quantity.toString());
    input.value = "0";
  }
  updateCartTotal();
};

const addToCartClicked = async (event: Event) => {
  const button = event.target as HTMLElement;
  const menuItem = button.closest(".menu-item-container") as HTMLElement | null;
  const customItem = button.closest(".total-box") as HTMLElement | null;

  if (customItem) {
    const customPrice = Object.values(customIngredients).reduce(
      (acc, ingredient) => {
        acc += ingredient.topping_price;
        return acc;
      },
      0
    );
    const customTitle = "Custom Hotdog";
    if (!customPrice || !customTitle) {
      return;
    }

    /*   const ingredients = Object.keys(customIngredients).join(", "); */
    console.log("name", customIngredients[0].topping_name);

    if (customPrice && customTitle) {
      let toppingString = "";
      customIngredients.forEach((ingredient, index) => {
        if (index === customIngredients.length - 1) {
          toppingString += ingredient.topping_name;
        } else {
          toppingString += ingredient.topping_name + ", ";
        }
      });
      addItemToCart(customTitle, customPrice.toFixed(2) + "€, ", toppingString);
      updateCartTotal();
      const topping_ids = customIngredients.map(
        (ingredient) => ingredient.topping_id
      );

      console.log(
        "customIngredients",
        customIngredients,
        "topping_ids",
        topping_ids
      );
      allCartItems.push({
        hotdog_id: null,
        ordersHotdogsAmount: 1, // TODO: quantity
        base_price: 1.0,
        toppings: topping_ids,
      });
    }
  }
  if (menuItem) {
    const titleElement = menuItem.querySelector(".menu-food-title");
    const priceElement = menuItem.querySelector(".menu-price");
    const ingredientsElement = menuItem.querySelector(".menu-ingredients");
    if (!titleElement || !priceElement || !ingredientsElement) {
      return;
    }
    const menuId = titleElement.id.split("-")[1];
    const parsedId = parseInt(menuId, 10);

    const menuCartItem = await fetchData(url + "/hotdog/" + menuId);
    const hotdog_id = menuCartItem[0].hotdog_id;
    const toppings = await fetchData(url + "/hotdog/hotdogToppings/" + menuId);
    let toppingString = "";
    toppings.forEach((ingredient, index: number) => {
      if (index === toppings.length - 1) {
        toppingString += ingredient.topping_name;
      } else {
        toppingString += ingredient.topping_name + ", ";
      }
    });

    if (titleElement && priceElement && parsedId && ingredientsElement) {
      const title = titleElement.textContent || "";
      const price = priceElement.textContent || "";

      allCartItems.push({ hotdog_id: hotdog_id, ordersHotdogsAmount: 1 }); // TODO: quantity
      /*     console.log(menu); */
      addItemToCart(title, price, toppingString);

      updateCartTotal();
    }
  }
};

document.addEventListener("click", (event: Event) => {
  const target = event.target as HTMLElement;
  if (target && target.classList.contains("add-to-cart-btn")) {
    addToCartClicked(event);
  }
});

const addItemToCart = (title: string, price: string, ingredients: string) => {
  const cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  const cartItems = document.querySelector(
    ".cart-content"
  ) as HTMLElement | null;

  if (!cartItems) {
    return;
  }

  const cartItemNames = cartItems.querySelectorAll(".cart-product-title");
  let customHotdogCount = 0;
  console.log(customHotdogCount);
  for (let i = 0; i < cartItemNames.length; i++) {
    console.log(cartItemNames[i]);
    if ((cartItemNames[i] as HTMLElement).innerText === "Custom Hotdog") {
      customHotdogCount++;
    } else if ((cartItemNames[i] as HTMLElement).innerText === title) {
      return;
    }
  }

  const dataHotdogIndex = allCartItems.length - 1;
  const cartBoxContent = `
  <div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-product-price">${price}</div>
  <input type="number" class="cart-product-quantity" value="1">
  </div>

<div class="cart-product-ingredients">${ingredients}</div>
<i class="fa-solid fa-trash cart-remove"  data-hotdog-index="${dataHotdogIndex}"></i>
`;

  cartShopBox.innerHTML = cartBoxContent;

  cartItems.appendChild(cartShopBox);

  const cartRemove = cartShopBox.querySelectorAll(".cart-remove");
  const cartQuantity = cartShopBox.querySelectorAll(".cart-product-quantity");
  /*   const productQuantity = cartShopBox.querySelectorAll(
    ".cart-product-quantity"
  ); */

  if (cartRemove) {
    cartRemove.forEach((remove) => {
      remove.addEventListener("click", removeCartItem);
    });
  }
  /*   if (cartQuantity) {
    cartRemove.forEach((cartRemoveBtn) => {
      cartRemoveBtn.addEventListener("change", quantityChanged);
    });
  } */
  if (cartQuantity)
    cartQuantity.forEach((quantity) => {
      quantity.addEventListener("change", quantityChanged);
    });
};

const updateCartTotal = () => {
  const cartContent = document.querySelector(
    ".cart-content"
  ) as HTMLElement | null;
  if (!cartContent) {
    return;
  }

  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  let total = 0;

  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i] as HTMLElement;
    const priceElement = cartBox.querySelector(
      ".cart-product-price"
    ) as HTMLElement | null;
    const quantityElement = cartBox.querySelector(
      ".cart-product-quantity"
    ) as HTMLInputElement | null;

    if (priceElement && quantityElement) {
      const priceText = priceElement.innerText.replace("€", "");
      const price = parseFloat(priceText);
      const quantity = parseFloat(quantityElement.value);
      total += price * quantity;
    }
  }

  const cartTotalPrice = document.querySelector(".cart-total-price");
  if (cartTotalPrice) {
    cartTotalPrice.textContent = total.toFixed(2) + "€";
  }
};

const removeCartItemButtons = document.querySelectorAll(".cart-remove");
removeCartItemButtons.forEach((button) => {
  button.addEventListener("click", removeCartItem);
});

const addToCartButtons = document.querySelectorAll(
  ".add-to-cart-btn, .add-custom-to-cart-btn"
);
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCartClicked);
});

const purchaseButton = document.querySelectorAll(".cart-checkout")[0] as
  | HTMLElement
  | undefined;
if (purchaseButton) {
  purchaseButton.addEventListener("click", (allCartItems) => {
    purchaseClicked(allCartItems);
  });
}
const quantityInputs = document.querySelectorAll(".cart-product-quantity");
quantityInputs.forEach((input) => {
  input.addEventListener("change", quantityChanged);
});
