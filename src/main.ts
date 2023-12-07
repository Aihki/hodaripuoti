import * as L from "leaflet";
import { displayChefchoice, displayOptions } from "./function";
import { fetchData, showAdminTools, showSuperAdminTools } from "./functions";
import { runAppStarterListeners } from "./listeners";
import { customIngredients } from "./function";
import { Hotdog } from "./interfaces/Order";
import { Location } from "./interfaces/Location";

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

const locations: Location[] = [
  {
    name: "Hodaripuoti",
    address: "Messukeskus",
    city: "Helsinki",
    coords: [60.20322568649935, 24.93696528041362] as [number, number],
    popupText:
      "<b>Hodaripuoti</b><br>Messukeskus , Helsinki<br>Parhaat hodarit tapahtumissa!",
  },
  {
    name: "Ravintola Hodaripuoti",
    address: "Helsingin katu 4",
    city: "Espoo",
    coords: [60.187394224490475, 24.959375673402533] as [number, number],
    popupText:
      "<b>Hodaripuoti </b><br>Helsingin katu 4, Helsinki<br>Herkullisia annoksia!, avaamme pian!",
  },
];

const map = L.map("map").setView([60.1699, 24.9384], 8);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

locations.forEach((location: Location) => {
  const marker: L.Marker = L.marker(location.coords).addTo(map);
  marker.bindPopup(location.popupText).openPopup();
});
const locationSelect = document.getElementById(
  "location-select"
) as HTMLSelectElement;

locations.forEach((location: Location) => {
  const option = document.createElement("option");
  option.value = location.name;
  option.textContent = `${location.name} - ${location.address}, ${location.city}`;
  locationSelect.appendChild(option);
});

locationSelect.addEventListener("change", () => {
  const selectedLocation = locationSelect.value;

  const selectedCoords = locations.find(
    (loc: Location) => loc.name === selectedLocation
  )?.coords;
  if (selectedCoords) {
    console.log("Valitun toimipaikan koordinaatit:", selectedCoords);
  }
});
/**
 * Checks if user is admin and its status
 * 0 is regular user, 1 is chef or cashier, 2 is super admin
 * @returns role status - [0, 1, 2]
 */
const checkUserRole = (): void => {
  // TODO: get user role from db
  const userRole = 2; // Fixed to super admin
  if (userRole === 2) {
    showSuperAdminTools();
  } else if (userRole === 1) {
    showAdminTools();
  } else if (userRole === 0) {
    console.log("Regular user");
    const adminSection = document.querySelector("#adminSection") as HTMLElement;
    if (adminSection) {
      adminSection.style.display = "none";
    }
  } else {
    console.log("ERROR: Users role is invalid");
  }
};

runAppStarterListeners();
checkUserRole();

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
  const cartItems: HTMLElement | null = document.querySelector(".cart-content");

  if (cartItems) {
    while (cartItems.hasChildNodes()) {
      console.log(cartItems.firstChild);
      if (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
      }
    }
    console.log(cart);
    updateCartTotal();
  }
};
const removeCartItem = (event: Event) => {
  const buttonClicked = event.target as HTMLElement;
  if (buttonClicked.parentElement) {
    buttonClicked.parentElement.remove();
    updateCartTotal();
  }
};
const quantityChanged = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.setAttribute("data-quantity", input.value);
  const quantityString = input.getAttribute("data-quantity");
  let quantity = parseInt(quantityString || "0", 10);
  console.log("quantity", quantity);
  if (quantity < 0) {
    console.log("quantity < 0", quantity);
    quantity = 0;
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
        acc += ingredient.price;
        return acc;
      },
      0
    );
    const customTitle = "Custom Hotdog";
    if (!customPrice || !customTitle) {
      return;
    }

    const ingredients = Object.keys(customIngredients).join(", ");
    console.log(customIngredients);

    if (customPrice && customTitle) {
      addItemToCart(customTitle, customPrice.toFixed(2) + "€, ", ingredients);
      updateCartTotal();
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

    // const menuCartItem = await fetchData(url + "")

    if (titleElement && priceElement && parsedId && ingredientsElement) {
      const title = titleElement.textContent || "";
      const price = priceElement.textContent || "";
      const id = parsedId;
      const ingredients = ingredientsElement.textContent || "";
      console.log(title, price, id, ingredients);
      allCartItems.push({ hotdog_id: id, ordersHotdogsAmount: 1 });
      const menu = { id, title, price, ingredients };
      console.log(menu);
      addItemToCart(title, price, ingredients);
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

  const cartBoxContent = `
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-product-price">${price}</div>
    <input type="number" class="cart-product-quantity" value="1">
    </div>
  
  <div class="cart-product-ingredients">${ingredients}</div>
  <i class="fa-solid fa-trash cart-remove"></i>
`;
  cartShopBox.innerHTML = cartBoxContent;

  cartItems.appendChild(cartShopBox);

  const cartRemove = cartShopBox.querySelector(".cart-remove");
  const cartQuantity = cartShopBox.querySelector(".cart-product-quantity");

  if (cartRemove) {
    cartRemove.addEventListener("click", removeCartItem);
  }

  if (cartQuantity) {
    cartQuantity.addEventListener("change", quantityChanged);
  }
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

const ready = () => {
  const removeCartItemButtons = document.querySelectorAll(".cart-remove");
  removeCartItemButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });

  const quantityInputs = document.querySelectorAll(".cart-product-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", quantityChanged);
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
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
