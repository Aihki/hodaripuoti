import {
  addUserDataToModal,
  infoModal,
  loginFormModal,
  orderManagementModel,
  registerFormModal,
  updateUserManagementModel,
  userManagementModel,
} from './components';
import {
  CreateOrderResponse,
  FetchDataResponse,
  Hotdog,
  HotdogPrices,
} from './interfaces/Order';
import { User } from './interfaces/User';
import {
  addAuthFormListeners,
  addBackButtonListener,
  addLogOutListener,
  addModalCloseListener,
  addOrderFilterListeners,
  addProfileOrderTrListener,
  addUpdateListener,
  addUserManageFormSubmitListener,
  addUserManageNavListener,
  checkActionHandler,
  viewActionHandler,
} from './listeners';
import { url } from './variables';

// const testHotdogsOrder: Hotdog[] = [
//   {
//     hotdog_id: null,
//     base_price: 1.0,
//     ordersHotdogsAmount: 1,
//     toppings: [1, 2, 4, 21],
//   },
//   {
//     // Menu hotdogs dont need toppings or base_price
//     hotdog_id: 1,
//     ordersHotdogsAmount: 3,
//   },
//   {
//     // Menu hotdogs dont need toppings or base_price
//     hotdog_id: 3,
//     ordersHotdogsAmount: 2,
//   },
//   {
//     hotdog_id: null,
//     base_price: 1.0,
//     ordersHotdogsAmount: 4,
//     toppings: [2, 4, 19, 20, 22],
//   },
// ];

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
  try {
    const json = await response.json();
    return json;
  } catch (error: any) {
    throw new Error(`Error parsing JSON: ${error.message}`);
  }
};
const getToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('token not found');
    return null;
  }
  return token;
};
const checkUserRole = async (): Promise<void> => {
  try {
    const token = getToken();
    if (token !== null) {
      const user = await getUserData(token);
      console.log(user.role);
      const userRole = user.role; // Fixed to super admin
      if (userRole > 0) {
        showAdminTools(userRole);
      } else if (userRole === 0) {
        console.log('Regular user');
        const adminSection = document.querySelector(
          '#adminSection'
        ) as HTMLElement;
        if (adminSection) {
          adminSection.style.display = 'none';
        }
      } else {
        console.log('ERROR: User role is invalid');
      }
    } else {
      console.log('Unregistered user');
      const adminSection = document.querySelector(
        '#adminSection'
      ) as HTMLElement;
      if (adminSection) {
        adminSection.style.display = 'none';
      }
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle the error as needed
  }
};

const getUserData = async (token: string): Promise<User> => {
  const options: RequestInit = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return await fetchData(url + '/auth/me', options);
};

const showAdminTools = async (role: number, incomingOrders?: any) => {
  const adminSection = document.querySelector(
    '#adminSection'
  ) as HTMLDivElement;
  if (!adminSection) {
    console.log('ERROR: No admin section found');
    return;
  }

  // Get orders
  let orders;
  if (!incomingOrders) {
    orders = await fetchData(url + '/order');
  } else {
    orders = incomingOrders;
  }

  const orderManagementHtml = orderManagementModel(orders);
  adminSection.innerHTML = '';
  adminSection.insertAdjacentHTML('beforeend', orderManagementHtml);
  addOrderFilterListeners(role);
  updateOrderInfoBtnAmount();

  if (role === 2) {
    // Get users
    const users = await fetchData(url + '/user');
    const userManagamentHtml = userManagementModel(users);
    adminSection.insertAdjacentHTML('beforeend', userManagamentHtml);
    addUserManageNavListener();
    addUserManageFormSubmitListener();
  }

  // Remove existing event listeners (if any)
  document.querySelectorAll('.viewActionBtn').forEach((btn) => {
    btn.removeEventListener('click', viewActionHandler);
  });

  document.querySelectorAll('.checkActionBtn').forEach((btn) => {
    btn.removeEventListener('click', (event) =>
      checkActionHandler(role, event)
    );
  });

  // Add new event listeners
  document.querySelectorAll('.viewActionBtn').forEach((btn) => {
    btn.addEventListener('click', viewActionHandler);
  });

  document.querySelectorAll('.checkActionBtn').forEach((btn) => {
    btn.addEventListener('click', (event) => checkActionHandler(role, event));
  });

  adminSection.style.display = 'block';
};
const updateOrderInfoBtnAmount = async () => {
  const counts = await fetchData(url + '/order/ordersCounts');
  console.log(counts);
  if (counts.length < 1) {
    return;
  }
  const orderInfoBtnOrders = document
    .querySelector('.order-info-btn-orders')
    ?.querySelector('.order-amount');
  const orderInfoBtnRecieved = document
    .querySelector('.order-info-btn-recieved')
    ?.querySelector('.order-amount');
  const orderInfoBtnCompleted = document
    .querySelector('.order-info-btn-completed')
    ?.querySelector('.order-amount');
  const orderInfoBtnInProgress = document
    .querySelector('.order-info-btn-in-progress')
    ?.querySelector('.order-amount');
  const orderInfoBtnPickedUp = document
    .querySelector('.order-info-btn-picked-up')
    ?.querySelector('.order-amount');
  if (
    !orderInfoBtnCompleted ||
    !orderInfoBtnInProgress ||
    !orderInfoBtnOrders ||
    !orderInfoBtnRecieved ||
    !orderInfoBtnPickedUp
  ) {
    return;
  }
  orderInfoBtnCompleted.innerHTML = counts[0].completedCount;
  orderInfoBtnInProgress.innerHTML = counts[0].inProgressCount;
  orderInfoBtnOrders.innerHTML = counts[0].totalOrders;
  orderInfoBtnRecieved.innerHTML = counts[0].recievedCount;
  orderInfoBtnPickedUp.innerHTML = counts[0].pickedUpCount;
};

const renderForms = (isLogin: boolean | null): void => {
  const modal = document.querySelector('dialog');
  if (!modal) {
    return;
  }
  if (isLogin === true) {
    const authDialog: string = loginFormModal();
    modal.innerHTML = '';
    modal.insertAdjacentHTML('beforeend', authDialog);
    const form = document.querySelector('#authForm');

    form?.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formLogin();
    });

    addAuthFormListeners();
    (modal as any)?.showModal();
  } else {
    const authDialog: string = registerFormModal();
    modal.innerHTML = '';
    modal.insertAdjacentHTML('beforeend', authDialog);

    const form = document.querySelector('#authForm');
    form?.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formRegister();
    });
    addAuthFormListeners();
  }
};

const formRegister = async (): Promise<void> => {
  const username = (
    document.querySelector('#usernameInput') as HTMLInputElement
  ).value;
  const email = (document.querySelector('#emailInput') as HTMLInputElement)
    .value;
  const password = (
    document.querySelector('#passwordInput') as HTMLInputElement
  ).value;
  const formData = {
    username: username,
    password: password,
    email: email,
  };

  if (!validateData(email, password, username)) {
    alert('Invalid input fields');
    return;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  const postData = await fetchData(url + '/user', options);
  console.log('LoginData:', postData);
  renderForms(true);
};
const formLogin = async (): Promise<void> => {
  const email = (document.querySelector('#emailInput') as HTMLInputElement)
    .value;
  const password = (
    document.querySelector('#passwordInput') as HTMLInputElement
  ).value;
  const formData = {
    email: email,
    password: password,
  };

  if (!validateData(email, password, null)) {
    alert('Invalid input fields');
    return;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  const loginData = await fetchData(url + '/auth/login', options);

  localStorage.setItem('token', loginData.token);
  console.log('LoginData:', loginData);
  (document.querySelector('dialog') as any)?.close(); // close modal
  checkUserRole();
};

const validateData = (
  email: string,
  password: string,
  username: string | null
) => {
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  // Validate password
  if (password.length < 8) {
    return false;
  }

  // validate username if username is sent
  if (username !== null && username.length < 3 && username.length > 40) {
    return false;
  }
  return true;
};

const updateUserManagementTable = (users: User[]) => {
  const userManagementTableContainer = document.querySelector(
    '.user-management-table-container'
  );
  if (!userManagementTableContainer) {
    console.log('ERROR: No admin section found');
    return;
  }
  const userManagementHtml = updateUserManagementModel(users);
  userManagementTableContainer.innerHTML = '';
  userManagementTableContainer.insertAdjacentHTML(
    'beforeend',
    userManagementHtml
  );
};
const showInfoModal = (text: string) => {
  const modal = document.querySelector('dialog');
  if (!modal) {
    return;
  }
  const infoModalHtml = infoModal(text);
  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', infoModalHtml);
};

// create order, insert hotdogs (link to order), link toppings, update totalprice
const createNewOrder = async (
  hotdogOrder: Hotdog[],
  total_price: number
): Promise<CreateOrderResponse | null | void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }
  const userData = await getUserData(token);
  const user_id = userData.user_id;
  let debugString: string = ''; // TODO: Remove this
  // Handle order creation
  const orderOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, total_price }),
  };
  let order_id: number | undefined;
  try {
    const orderResponse = (await fetchData(
      url + '/order',
      orderOptions
    )) as FetchDataResponse;
    if (!orderResponse || !orderResponse.order_id) {
      throw new Error('Failed to create order');
    }
    order_id = orderResponse.order_id;
    debugString += 'order_id' + order_id;
  } catch (error) {
    console.error('Error creating order:', (error as Error).message);
    // Return an error message to the customer
    return { error: 'Failed to create order' };
  }
  // for each hotdog in order
  hotdogOrder.forEach(async (hotdog) => {
    let hotdog_id: number | undefined;
    const ordersHotdogsAmount = hotdog.ordersHotdogsAmount;

    // if hotdog does not exist yet (is not menu item)
    if (hotdog.hotdog_id === null) {
      const base_price = hotdog.base_price;
      if (!base_price) {
        throw new Error('hotdog.base_price is undefined');
      }
      // Handle hotdog creation
      const hotdogOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hotdog_name: 'Custom', base_price }),
      };
      try {
        const hotdogResponse = (await fetchData(
          url + '/hotdog',
          hotdogOptions
        )) as FetchDataResponse;
        if (!hotdogResponse || !hotdogResponse.hotdog_id) {
          throw new Error('Failed to create hotdog');
        }
        hotdog_id = hotdogResponse.hotdog_id;
        debugString += ' hotdog_id' + hotdog_id;
      } catch (error) {
        console.error('Error creating hotdog:', (error as Error).message);
        // Return an error message to the customer
        return { error: 'Failed to create hotdog' };
      }
    } else {
      // if hotdog does exist, do not create new just send the hotdog_id

      hotdog_id = hotdog.hotdog_id;
      debugString += ' hotdog_id' + hotdog_id;
    }

    // Handle orders_hotdogs creation
    const ordersHotdogsOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id,
        hotdog_id,
        amount: ordersHotdogsAmount,
      }),
    } as RequestInit;
    let orderHotdogsId: number | undefined;
    try {
      const ordersHotdogs = await fetchData(
        url + '/order/orderHotdogs',
        ordersHotdogsOptions
      );
      if (!ordersHotdogs) {
        throw new Error('Failed to create orderHotdogs');
      }
      orderHotdogsId = ordersHotdogs.insertId;
      debugString += ' orderHotdogsId' + orderHotdogsId;
    } catch (error) {
      console.error('Error creating orderHotdogs:', (error as Error).message);
      // Return an error message to the customer
      return { error: 'Failed to create orderHotdogs' };
    }

    // Handle hotdog_toppings creation
    if (hotdog.hotdog_id === null) {
      let hotdogToppingsId;
      const hotdogToppingsOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hotdog_id, topping_ids: hotdog.toppings }),
      } as RequestInit;
      try {
        console.log('CREATING HOTDOG TOPPINGS');
        const hotdogToppings = await fetchData(
          url + '/hotdog/hotdogToppings',
          hotdogToppingsOptions
        );
        if (!hotdogToppings) {
          throw new Error('Failed to create hotdogToppings');
        }
        hotdogToppingsId = hotdogToppings.message;
        debugString += ' hotdog_id ' + hotdog_id;
        if (order_id) {
          calculateTotal(order_id);
        }
      } catch (error) {
        console.error(
          'Error creating hotdogToppings:',
          (error as Error).message
        );
        // Return an error message to the customer
        return { error: 'Failed to create hotdogToppings' };
      }
    } else {
      console.log('NOT CREATING HOTDOG TOPPINGS');
    }
  });

  console.log('Order done');
  console.log(debugString);
};
const calculateTotal = async (order_id: number) => {
  // Handle total price calculation and total_price updating
  let countedPrice: number = 0;
  try {
    const countedPriceResponse = await fetchData(
      url + '/order/orderTotalPrice/' + order_id
    );

    if (!countedPriceResponse) {
      throw new Error('Failed to get order');
    }
    console.log('order', order_id, countedPriceResponse);

    countedPriceResponse.forEach((hotdog: HotdogPrices) => {
      console.log('hotdog', hotdog);
      if (hotdog.hotdog_name === 'Custom') {
        console.log('custom', parseFloat(hotdog.total_price));
        countedPrice += parseFloat(hotdog.total_topping_price);
      } else {
        countedPrice += parseFloat(hotdog.hotdog_base_price);
        console.log(parseFloat(hotdog.hotdog_base_price));
      }
      console.log('updated', countedPrice);
    });
    // handle total price updating
    const totalPriceOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        total_price: countedPrice,
        order_id,
      }),
    };
    try {
      const ordersTotalPrice = await fetchData(
        url + '/order/orderTotalPrice',
        totalPriceOptions
      );
      if (!ordersTotalPrice) {
        throw new Error('Failed to PUT ordersTotalPrice');
      }
    } catch (error) {
      console.error(
        'Error creating ordersTotalPrice:',
        (error as Error).message
      );
      // Return an error message to the customer
      return { error: 'Failed to create ordersTotalPrice' };
    }
  } catch (error) {
    console.error('Error creating order:', (error as Error).message);
    // Return an error message to the customer
    return { error: 'Failed to create order' };
  }
};

const formUpdate = async (): Promise<void> => {
  const username = (
    document.querySelector('#usernameInput') as HTMLInputElement
  ).value;
  const password = (
    document.querySelector('#passwordInput') as HTMLInputElement
  ).value;
  const modal = document.querySelector('dialog');
  const token = localStorage.getItem('token');
  if (!token || !modal) {
    return;
  }
  const formData = {
    username: username,
    password: password,
  };
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(formData),
  };
  const userData = await getUserData(token);
  const updateData = await fetchData(
    url + '/user/' + userData.user_id,
    options
  );
  const orders = await fetchData(
    url + '/order/getMyOrders/' + userData.user_id
  );
  const profileModal = addUserDataToModal(userData, orders);
  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', profileModal);
  addModalCloseListener();
  addLogOutListener();
  addUpdateListener();
  addProfileOrderTrListener();
  addBackButtonListener();
};

checkUserRole();

export {
  updateUserManagementTable,
  showAdminTools,
  renderForms,
  fetchData,
  getToken,
  getUserData,
  createNewOrder,
  checkUserRole,
  showInfoModal,
  formUpdate,
  validateData,
};
