import {
  addUserDataToModal,
  infoModal,
  loginFormModal,
  orderManagementModel,
  registerFormModal,
  thankYouPopUp,
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
  addDarkModeListener,
  addLogOutListener,
  addModalCloseListener,
  addOrderFilterListeners,
  addProfileOrderTrListener,
  addUpdateListener,
  addUserManageFormSubmitListener,
  addUserManageNavListener,
  checkActionHandler,
  openProfile,
  viewActionHandler,
} from './listeners';
import { url } from './variables';
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
/**
 * Get token from local storage
 * @returns - Token
 */
const getToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  return token;
};

/**
 * Check users role and rights to admin content
 */
const checkUserRole = async (): Promise<void> => {
  try {
    const token = getToken();
    if (token !== null) {
      const user = await getUserData(token);
      const userRole = user.role;
      if (userRole > 0) {
        showAdminTools(userRole);
      } else if (userRole === 0) {
        const adminSection = document.querySelector(
          '#adminSection'
        ) as HTMLElement;
        if (adminSection) {
          adminSection.style.display = 'none';
        }
      }
    } else {
      const adminSection = document.querySelector(
        '#adminSection'
      ) as HTMLElement;
      if (adminSection) {
        adminSection.style.display = 'none';
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

/**
 * Get user data from server with bearer token
 * @param token -
 * @returns - User object
 */
const getUserData = async (token: string): Promise<User> => {
  const options: RequestInit = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return await fetchData(url + '/auth/me', options);
};

/**
 * Shows admin tools based on user role (1 or 2)
 * Adds listeners for admin tool functions
 * @param role - users role
 * @param incomingOrders - filtered order list
 */
const showAdminTools = async (role: number, incomingOrders?: any) => {
  const adminSection = document.querySelector(
    '#adminSection'
  ) as HTMLDivElement;
  if (!adminSection) {
    return;
  }

  // Get all orders or filtered arrays
  let orders;
  if (!incomingOrders) {
    // Get orders
    orders = await fetchData(url + '/order');
  } else {
    orders = incomingOrders;
  }

  // Add orderManagemtnHtml to html page and add listeners
  const orderManagementHtml = orderManagementModel(orders);
  adminSection.innerHTML = '';
  adminSection.insertAdjacentHTML('beforeend', orderManagementHtml);
  addOrderFilterListeners(role);
  updateOrderInfoBtnAmount();

  // if user role is 2 show superadmin tools, add listeners
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

  // show adminSection
  adminSection.style.display = 'block';
};

/**
 * Add admin menu filter button's counts
 */
const updateOrderInfoBtnAmount = async () => {
  // get counts from database
  const counts = await fetchData(url + '/order/ordersCounts');
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

/**
 * Add register or login form to modal.
 * Show modal and add form listeners
 * @param isLogin - boolean, if (true) render login form. else render register form
 */
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

/**
 * Get register form values, validate data and post to server
 */
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
  const registerData = await fetchData(url + '/user', options);

  if (registerData.error) {
    const authForm = document.querySelector('#authForm');
    const hasChildWithClass =
      authForm?.querySelector(':last-child.invalid-mail-or-pwd') !== null;
    if (!hasChildWithClass) {
      console.log('here');
      const wrongPassOrMailHtml =
        '<div class="invalid-mail-or-pwd"><p>Väärä sähköposti tai salasana</p></div>';
      authForm?.insertAdjacentHTML('beforeend', wrongPassOrMailHtml);
    } else {
      console.log('here');
      authForm?.querySelector(':last-child.invalid-mail-or-pwd')?.remove();
      const wrongPassOrMailHtml =
        '<div class="invalid-mail-or-pwd"><p>Väärä sähköposti tai salasana</p></div>';
      authForm?.insertAdjacentHTML('beforeend', wrongPassOrMailHtml);
    }
    return;
  }

  renderForms(true);
};
/**
 * Get login form values, validate data and post to server
 * Add token to local storage
 */
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
  if (loginData.error) {
    const authForm = document.querySelector('#authForm');
    const hasChildWithClass =
      authForm?.querySelector(':last-child.invalid-mail-or-pwd') !== null;
    if (!hasChildWithClass) {
      const wrongPassOrMailHtml =
        '<div class="invalid-mail-or-pwd"><p>Väärä sähköposti tai salasana</p></div>';
      authForm?.insertAdjacentHTML('beforeend', wrongPassOrMailHtml);
    }
    return;
  }

  localStorage.setItem('token', loginData.token);
  (document.querySelector('dialog') as any)?.close(); // close modal
  checkUserRole();
};

/**
 * Add register or login form to modal.
 * Show modal and add form listeners
 * @param email - email string
 * @param password - password string
 * @param username - Optional username string
 * @return - Returns boolean if validation successfull or failed
 */
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

/**
 * Update user management table
 * @param users - Users array
 * @return - Returns boolean if validation successfull or failed
 */
const updateUserManagementTable = (users: User[]) => {
  const userManagementTableContainer = document.querySelector(
    '.user-management-table-container'
  );
  if (!userManagementTableContainer) {
    return;
  }
  const userManagementHtml = updateUserManagementModel(users);
  userManagementTableContainer.innerHTML = '';
  userManagementTableContainer.insertAdjacentHTML(
    'beforeend',
    userManagementHtml
  );
};

/**
 * Add info text to modal and show info
 * @param text - Info's text
 */
const showInfoModal = (text: string) => {
  const modal = document.querySelector('dialog');
  if (!modal) {
    return;
  }
  const infoModalHtml = infoModal(text);
  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', infoModalHtml);
};

/**
 * Create order, insert hotdogs (link to order), link toppings, update totalprice
 * Show modal and add form listeners
 * @param hotdogOrder - Array of all hotdog objects
 * @param total_price - Base total price. Updated later in script (calculated in database so customer can not inspect element)
 */
const createNewOrder = async (
  hotdogOrder: Hotdog[],
  total_price: number
): Promise<CreateOrderResponse | null | void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    return;
  }
  const userData = await getUserData(token);
  const user_id = userData.user_id;

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
      } catch (error) {
        console.error('Error creating hotdog:', (error as Error).message);
        // Return an error message to the customer
        return { error: 'Failed to create hotdog' };
      }
    } else {
      // if hotdog does exist(menu item), just send the hotdog_id
      hotdog_id = hotdog.hotdog_id;
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
    try {
      const ordersHotdogs = await fetchData(
        url + '/order/orderHotdogs',
        ordersHotdogsOptions
      );
      if (!ordersHotdogs) {
        throw new Error('Failed to create orderHotdogs');
      }
      if (hotdog.hotdog_id !== null && order_id) {
        calculateTotal(order_id);
      }
    } catch (error) {
      console.error('Error creating orderHotdogs:', (error as Error).message);
      // Return an error message to the customer
      return { error: 'Failed to create orderHotdogs' };
    }

    // Handle hotdog_toppings creation
    if (hotdog.hotdog_id === null) {
      const hotdogToppingsOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hotdog_id, topping_ids: hotdog.toppings }),
      } as RequestInit;
      try {
        const hotdogToppings = await fetchData(
          url + '/hotdog/hotdogToppings',
          hotdogToppingsOptions
        );
        if (!hotdogToppings) {
          throw new Error('Failed to create hotdogToppings');
        }
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
    }
  });
  const message = document.querySelector('.message') as HTMLElement;
  if (!message) {
    return;
  }
  message.style.display = 'flex';
  const thankYou: string = thankYouPopUp('Kiitos tilauksestasi!');
  message.innerHTML = '';
  message.insertAdjacentHTML('beforeend', thankYou);
  openProfile();
};

/**
 * Get all hotdogs in order from database, calculate price and update total_price to database
 * @param order_id - Orders ID
 */
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

    countedPriceResponse.forEach((hotdog: HotdogPrices) => {
      if (hotdog.hotdog_name === 'Custom') {
        countedPrice += parseFloat(hotdog.total_topping_price);
      } else {
        countedPrice += parseFloat(hotdog.hotdog_base_price);
      }
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

/**
 * Get data from form and update user data, add listeners and reload profile
 */
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
  await fetchData(url + '/user/' + userData.user_id, options);
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
  addDarkModeListener();
  checkForUserTheme();
};

const checkForUserTheme = () => {
  const theme = localStorage.getItem('theme');
  const checkbox = document.querySelector('#checkbox');
  if (theme === 'dark') {
    document.body.classList.add('dark');
    if (checkbox) {
      (checkbox as HTMLInputElement).checked = true;
    }
  }
};

// On start get users role
checkUserRole();
checkForUserTheme();

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
  checkForUserTheme,
};
