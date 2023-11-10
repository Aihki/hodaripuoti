import * as L from "leaflet";
import {
  displayBeverage,
  displayBunOptions,
  displayMenu,
  displaySauceOptions,
  displaySausageOptions,
  displayToppingsOptions,
} from "./function";

const burger: HTMLElement | null = document.querySelector(".burgermenu");
const navMenu: HTMLElement | null = document.querySelector(".nav-menu");

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

displayBunOptions();
displaySausageOptions();
displayToppingsOptions();
displaySauceOptions();
displayMenu();
displayBeverage();

const map = L.map("map").setView([60.1699, 24.9384], 8);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);
