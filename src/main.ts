import * as L from "leaflet";
import { displayBeverage, displayChefchoice, displayOptions } from "./function";

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
displayBeverage();
displayOptions();

const map = L.map("map").setView([60.1699, 24.9384], 8);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

const marker = L.marker([60.202990343063924, 24.93619952897825]).addTo(map);
marker
  .bindPopup("<b>Hodaripuoti</b><br>Parhaan hodarit tapahtumissa!")
  .openPopup();
