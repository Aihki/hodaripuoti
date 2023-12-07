import {
  formModal,
  orderManagementModel,
  updateForm,
  userManagementModel,
} from "./components";
import { Order } from "./interfaces/Order";
import { User } from "./interfaces/User";
import {
  addAuthFormListeners,
  addOrderActionsListeners,
  addUserManageNavListener,
} from "./listeners";
import { url } from "./variables";

// Dummy users array
const users: User[] = [
  {
    userId: 0,
    username: "testi",
    email: "testi@mail.com",
    role: 2,
    points: 0,
  },
  {
    userId: 1,
    username: "Mikko",
    email: "Mikko@mail.com",
    role: 1,
    points: 10,
  },
  {
    userId: 2,
    username: "Mallikas",
    email: "Mallikas@mail.com",
    role: 0,
    points: 20,
  },
  {
    userId: 3,
    username: "Petteri",
    email: "Petteri@mail.com",
    role: 1,
    points: 50,
  },
  {
    userId: 4,
    username: "Puankuono",
    email: "Puankuono@mail.com",
    role: 0,
    points: 25,
  },
  {
    userId: 5,
    username: "Joni",
    email: "Joni@mail.com",
    role: 2,
    points: 10,
  },
];
const orders: Order[] = [
  {
    orderID: 1,
    status: 0,
    orderDate: "2023-01-01T12:34:56",
    info: "Dummy info",
    products: [
      {
        hotdogID: 1,
        toppings: [],
        basePrice: 1.5,
      },
    ],
  },
  {
    orderID: 2,
    status: 2,
    orderDate: "2023-01-01T12:34:56",
    info: "Dummy info",
    products: [
      {
        hotdogID: 1,
        toppings: [],
        basePrice: 1.5,
      },
    ],
  },
  {
    orderID: 3,
    status: 3,
    orderDate: "2023-01-01T12:34:56",
    info: "Dummy info",
    products: [
      {
        hotdogID: 1,
        toppings: [],
        basePrice: 1.5,
      },
    ],
  },
  {
    orderID: 4,
    status: 1,
    orderDate: "2023-01-01T12:34:56",
    info: "Dummy info",
    products: [
      {
        hotdogID: 1,
        toppings: [],
        basePrice: 1.5,
      },
    ],
  },
];

/**
 * Fetch data from url, returns as json
 * @param url - url to fetch data
 * @param options - optional options
 * @returns - Returns response from api as json
 */
const fetchData = async (url: string, options = {}): Promise<any> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error ${response.status} occured`);
  }
  const json = await response.json();
  return json;
};

const showSuperAdminTools = (): void => {
  const adminSection = document.querySelector("#adminSection");
  if (!adminSection) {
    console.log("ERROR: No admin section found");
    return;
  }

  const userManagamentHtml = userManagementModel(users);
  const orderManagementHtml = orderManagementModel(orders);
  adminSection.innerHTML = "";
  adminSection.insertAdjacentHTML("beforeend", userManagamentHtml);
  adminSection.insertAdjacentHTML("beforeend", orderManagementHtml);
  addUserManageNavListener();
  addOrderActionsListeners();
};

const renderForms = (isLogin: boolean | null): void => {
  const modal = document.querySelector("dialog");
  if (!modal) {
    return;
  }
  if (isLogin === null || isLogin === undefined) {
    const authDialog: string = formModal(true);
    modal.innerHTML = "";
    modal.insertAdjacentHTML("beforeend", authDialog);
    const form = document.querySelector("#authForm");

    form?.addEventListener("submit", (evt) => {
      evt.preventDefault();
      formLogin();
    });

    addAuthFormListeners();
    (modal as any)?.showModal();
  } else {
    updateForm(isLogin);
    const form = document.querySelector("#authForm");
    form?.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (isLogin) {
        formLogin();
      } else {
        formRegister();
      }
    });
  }
};
const formRegister = async (): Promise<void> => {
  const username = (
    document.querySelector("#usernameInput") as HTMLInputElement
  ).value;
  const email = (document.querySelector("#emailInput") as HTMLInputElement)
    .value;
  const password = (
    document.querySelector("#passwordInput") as HTMLInputElement
  ).value;
  const formData = {
    username: username,
    password: password,
    email: email,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  console.log("Register");
  // TODO: post data to backend, store token to localstorage
  // const postData = await fetchData(url + '/users', options);
  // localStorage.setItem('token', loginData.token);
};
const formLogin = async (): Promise<void> => {
  const username = (
    document.querySelector("#usernameInput") as HTMLInputElement
  ).value;
  const password = (
    document.querySelector("#passwordInput") as HTMLInputElement
  ).value;
  const formData = {
    username: username,
    password: password,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  // TODO: post data to backend, store token to localstorage
  // const loginData = await fetchData(url + '/auth/login', options);
  // localStorage.setItem('token', loginData.token);
  console.log("Login");
};

const showAdminTools = () => {
  const adminSection = document.querySelector("#adminSection");
  if (!adminSection) {
    console.log("ERROR: No admin section found");
    return;
  }

  const orderManagementHtml = orderManagementModel(orders);
  adminSection.innerHTML = "";
  adminSection.insertAdjacentHTML("beforeend", orderManagementHtml);
  addOrderActionsListeners();
};

export { showSuperAdminTools, showAdminTools, renderForms, fetchData };
