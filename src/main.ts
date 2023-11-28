import * as L from 'leaflet';
import { displayBeverage, displayChefchoice, displayOptions } from './function';
import {
  fetchData,
  getToken,
  getUserData,
  showAdminTools,
  showSuperAdminTools,
} from './functions';
import { runAppStarterListeners } from './listeners';
import { url } from './variables';

const burger: HTMLElement | null = document.querySelector('.burgermenu');
const navMenu: HTMLElement | null = document.querySelector('.nav-menu');

if (burger && navMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach((n) =>
    n.addEventListener('click', () => {
      burger.classList.remove('active');
      navMenu.classList.remove('active');
    })
  );
}

const checkbox: HTMLInputElement | null = document.getElementById(
  'checkbox'
) as HTMLInputElement;

if (checkbox) {
  checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark');
  });
}

let slideIndex: number = 0;
const slides: NodeListOf<Element> =
  document.querySelectorAll('.custom-container');
const prevButton: HTMLElement | null = document.querySelector('.prev');
const nextButton: HTMLElement | null = document.querySelector('.next');

function showSlide(n: number): void {
  slides.forEach((slide: Element) => {
    (slide as HTMLElement).style.display = 'none';
  });

  (slides[n] as HTMLElement).style.display = '';
}

showSlide(slideIndex);

prevButton?.addEventListener('click', () => {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  showSlide(slideIndex);
});

nextButton?.addEventListener('click', () => {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
});

displayChefchoice();
displayBeverage();
displayOptions();

const map = L.map('map').setView([60.1699, 24.9384], 8);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

/**
 * Checks if user is admin and its status
 * 0 is regular user, 1 is chef or cashier, 2 is super admin
 * @returns role status - [0, 1, 2]
 */
const checkUserRole = async (): Promise<void> => {
  const token = getToken();
  if (token !== null) {
    const user = await getUserData(token);
    console.log(user.role);
    const userRole = user.role; // Fixed to super admin
    if (userRole === 2) {
      showSuperAdminTools();
    } else if (userRole === 1) {
      showAdminTools();
    } else if (userRole === 0) {
      console.log('Regular user');
      const adminSection = document.querySelector(
        '#adminSection'
      ) as HTMLElement;
      if (adminSection) {
        adminSection.style.display = 'none';
      }
    } else {
      console.log('ERROR: Users role is invalid');
    }
  } else {
    console.log('Un registered user');
    const adminSection = document.querySelector('#adminSection') as HTMLElement;
    if (adminSection) {
      adminSection.style.display = 'none';
    }
  }
};

runAppStarterListeners();
checkUserRole();

export { checkUserRole };
