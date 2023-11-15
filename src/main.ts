import * as L from "leaflet";
import { displayBeverage, displayMenu, displayOptions } from "./function";

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

displayMenu();
displayBeverage();
displayOptions();

const map = L.map("map").setView([60.1699, 24.9384], 8);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);
