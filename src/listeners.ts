import {
  addUserDataToModal,
  adminOrderViewModal,
  confirmModal,
  orderReviewModal,
} from './components';
import {
  checkForUserTheme,
  fetchData,
  formUpdate,
  getToken,
  getUserData,
  renderForms,
  showAdminTools,
  showInfoModal,
  updateUserManagementTable,
} from './functions';
import { url } from './variables';

/**
 * Runs all wanted listeners when application starts
 */
const runAppStarterListeners = () => {
  addProfileBtnListener();
};

const addUserManageNavListener = () => {
  const userManageNavButtons = document.querySelectorAll(
    '.user-manage-nav-btn'
  );
  if (userManageNavButtons.length <= 0) {
    return;
  }
  userManageNavButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const activeBtns = document.querySelectorAll('.user-manage-active');
      activeBtns.forEach((btn) => {
        if (!btn.classList.contains('user-manage-active')) {
          return;
        }
        btn.classList.remove('user-manage-active');
      });
      button.classList.add('user-manage-active');
      let fetchString: string | null = '';
      switch (button.id) {
        case 'userManageAllWorkersBtn':
          fetchString = url + '/user/workers';
          break;
        case 'userManageSAdminBtn':
          fetchString = url + '/user/role/2';
          break;
        case 'userManageCounterBtn':
          fetchString = url + '/user/role/1';
          break;
        case 'userManageAllBtn':
          fetchString = url + '/user';
          break;
        default:
          fetchString == null;
          break;
      }
      if (fetchString === null) {
        return;
      }
      const users = await fetchData(fetchString);
      if (users) {
        updateUserManagementTable(users);
      } else {
        showInfoModal('No users found');
      }
    });
  });
};
const addOrderFilterListeners = (role: number) => {
  const orderInfoButtons = document.querySelectorAll('.order-info-button');
  if (orderInfoButtons.length <= 0) {
    return;
  }
  orderInfoButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      let fetchUrl: string | null = '';

      // Use classList.contains() to check if the class is present
      if (button.classList.contains('order-info-btn-orders')) {
        fetchUrl = url + '/order';
      } else if (button.classList.contains('order-info-btn-in-progress')) {
        fetchUrl = url + '/order/getFilteredOrders/1';
      } else if (button.classList.contains('order-info-btn-completed')) {
        fetchUrl = url + '/order/getFilteredOrders/2';
      } else if (button.classList.contains('order-info-btn-recieved')) {
        fetchUrl = url + '/order/getFilteredOrders/0';
      } else if (button.classList.contains('order-info-btn-picked-up')) {
        fetchUrl = url + '/order/getFilteredOrders/3';
      } else {
        fetchUrl = null;
      }

      if (fetchUrl !== null) {
        const orderList = await fetchData(fetchUrl);
        showAdminTools(role, orderList);
      }
    });
  });
};

const addProfileBtnListener = () => {
  const profileButtons = document.querySelectorAll('#profileButton');
  profileButtons.forEach((profileButton) => {
    profileButton.addEventListener('click', async () => {
      const modal = document.querySelector('dialog');
      const token = getToken();
      if (modal && token !== null) {
        const userData = await getUserData(token);
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
        (modal as any).showModal();
        return;
      }
      renderForms(true);
    });
  });
};
const addModalCloseListener = () => {
  const modal = document.querySelector('dialog');
  if (!modal) {
    return;
  }
  const modalCloseButtons = document.querySelectorAll('#dialogCloseButton');
  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      (modal as any).close();
    });
  });
};
const addBackButtonListener = () => {
  const backBtn = document.querySelector('#backButton');
  if (!backBtn) {
    return;
  }

  backBtn.addEventListener('click', () => {
    const rotatingCard = document.querySelector('.rotating-card');
    if (rotatingCard?.classList.contains('show-back')) {
      rotatingCard?.classList.remove('show-back');
    }
  });
};
const addProfileOrderTrListener = () => {
  const profileTrs = document.querySelectorAll('.profile-order-tr');
  if (!profileTrs || profileTrs.length < 1) {
    return;
  }
  profileTrs.forEach((button) => {
    button.addEventListener('click', async () => {
      const orderId = button.getAttribute('data-order-id');
      const rotatingCard = document.querySelector('.rotating-card');

      const order = await fetchData(url + '/order/orderHotdogs/' + orderId);

      const orderReviewModalHtml = orderReviewModal(order);
      const backMainContent = document.querySelector('.back-main-content');

      if (!backMainContent) {
        return;
      }
      backMainContent.innerHTML = '';
      backMainContent.insertAdjacentHTML('beforeend', orderReviewModalHtml);
      if (rotatingCard?.classList.contains('show-back') === false) {
        rotatingCard.classList.add('show-back');
      }
    });
  });
};
const addLogOutListener = () => {
  const logOutBtns = document.querySelectorAll('#logOutButton');
  const adminSection = document.querySelector('#adminSection');
  logOutBtns.forEach((logOutBtn) => {
    logOutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      renderForms(true);
      if (!adminSection) {
        return;
      }
      adminSection.innerHTML = '';
    });
  });
};

const addAuthFormListeners = () => {
  // Login form mode listener
  const changeFormToLoginBtn = document.querySelector(
    '#changeFormToLoginBtn'
  ) as HTMLInputElement;
  const changeFormToRegisterBtn = document.querySelector(
    '#changeFormToRegisterBtn'
  ) as HTMLInputElement;

  changeFormToLoginBtn?.addEventListener('click', () => {
    renderForms(true);
  });
  changeFormToRegisterBtn?.addEventListener('click', () => {
    renderForms(false);
  });

  // Modal cose listener
  const modal = document.querySelector('dialog');
  if (!modal) {
    return;
  }
  const modalCloseButtons = document.querySelectorAll('#dialogCloseButton');
  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      (modal as any).close();
    });
  });
};

const addUserManageFormSubmitListener = () => {
  const userManagementTableContainer = document.querySelector(
    '.user-management-table-container'
  );

  userManagementTableContainer?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (event.target && (event.target as HTMLElement).tagName === 'FORM') {
      const form = event.target as HTMLFormElement;
      const formId = form.id;
      const user_id = parseInt(formId.split('_')[1], 10);
      const input = form.querySelector('input') as HTMLInputElement;
      const updatedRole = parseInt(input.value, 10);

      // validate role
      if (isNaN(updatedRole) || updatedRole < 0 || updatedRole > 2) {
        return alert('Invalid role');
      }
      try {
        const formData = {
          user_id: user_id,
          role: updatedRole,
        };
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        };

        await fetchData(url + '/user/updateRole', options);
      } catch (e) {
        return;
      }
    }
  });
};

const viewActionHandler = async (event: Event) => {
  const orderId = (event.currentTarget as HTMLElement)?.getAttribute(
    'data-order-id'
  );

  if (orderId !== null && orderId !== undefined) {
    // Call a function or perform an action with orderId

    const modal = document.querySelector('dialog');

    if (!modal) {
      return;
    }
    const orderHotdogs = await fetchData(
      url + '/order/orderHotdogs/' + orderId
    );
    const hotdogAndToppings = await fetchData(
      url + '/order/hotdogsAndToppings/' + orderId
    );

    if (orderHotdogs.message || hotdogAndToppings.message) {
      return;
    }
    const viewOrderModal = adminOrderViewModal(orderHotdogs, hotdogAndToppings);

    modal.innerHTML = '';
    modal.insertAdjacentHTML('beforeend', viewOrderModal);
    (modal as any).showModal();
    addModalCloseListener();
  }
};

const checkActionHandler = (role: number, event: Event) => {
  const orderIdString = (event.currentTarget as HTMLElement)?.getAttribute(
    'data-order-id'
  );
  const orderId = orderIdString ? parseInt(orderIdString, 10) : null;
  const orderStatusString = (event.currentTarget as HTMLElement)?.getAttribute(
    'data-order-status'
  );
  const orderStatus = orderStatusString
    ? parseInt(orderStatusString, 10)
    : null;
  const modal = document.querySelector('dialog');
  if (!modal) {
    return;
  }
  if (
    orderId !== null &&
    orderId !== undefined &&
    orderStatus !== null &&
    orderStatus !== undefined
  ) {
    // Call a function or perform an action with orderId
    let confirmModalHtml: string = '';
    switch (orderStatus) {
      case 0: // Recieved
        confirmModalHtml = confirmModal(
          `Oletko varma haluavasi ottaa tilauksen <strong class="text-in-progress">${orderId} vastaan</strong>?`
        );
        break;
      case 1: // In progress
        confirmModalHtml = confirmModal(
          `Oletko varma haluavasi merkata tilauksen <strong class="text-ready">${orderId} valmiiksi</strong>?`
        );
        break;
      case 2: // Ready
        confirmModalHtml = confirmModal(
          `Oletko varma haluavasi merkata tilauksen <strong class="text-picked-up">${orderId} noudetuksi</strong>?`
        );
        break;
      default:
        break;
    }

    modal.innerHTML = '';
    modal.insertAdjacentHTML('beforeend', confirmModalHtml);
    const confirmYesBtn = document.querySelector('#confirmYesBtn');
    if (!confirmYesBtn) {
      return;
    }
    confirmYesBtn.addEventListener('click', async () => {
      const formData = {
        status: orderStatus + 1,
        order_id: orderId,
      };
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };
      await fetchData(url + '/order/changeOrderStatus', options);
      if (orderStatus === 0) {
        const orders = await fetchData(url + '/order/getFilteredOrders/' + 1);
        showAdminTools(role, orders);
      } else if (orderStatus === 1) {
        const orders = await fetchData(url + '/order/getFilteredOrders/' + 2);
        showAdminTools(role, orders);
      } else if (orderStatus === 2) {
        const orders = await fetchData(url + '/order/getFilteredOrders/' + 3);
        showAdminTools(role, orders);
      } else {
        showAdminTools(role);
      }
      (modal as any).close();
    });
    (modal as any).showModal();
  }
};
const addUpdateListener = () => {
  const updateForm = document.querySelector('#updateForm');
  updateForm?.addEventListener('submit', (evt) => {
    evt.preventDefault();
    formUpdate();
  });
};
const addDarkModeListener = () => {
  const checkbox: HTMLInputElement | null = document.getElementById(
    'checkbox'
  ) as HTMLInputElement;

  if (checkbox) {
    checkbox.addEventListener('change', () => {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  }
};

const openProfile = () => {
  const message = document.querySelector(".message-btn") as HTMLElement;
  if (!message) {
    return;
  }

  message.addEventListener("click", async () => {
    const messageBox = document.querySelector(".message") as HTMLElement;
    if (!messageBox) {
      return;
    }
    messageBox.style.display = "none";
    const modal = document.querySelector("dialog");
    const token = getToken();
    if (modal && token !== null) {
      const userData = await getUserData(token);
      const orders = await fetchData(
        url + "/order/getMyOrders/" + userData.user_id
      );

      const profileModal = addUserDataToModal(userData, orders);
      modal.innerHTML = "";
      modal.insertAdjacentHTML("beforeend", profileModal);
      addModalCloseListener();
      addLogOutListener();
      addUpdateListener();
      addProfileOrderTrListener();
      addBackButtonListener();
      addDarkModeListener();
      (modal as any).showModal();
      return;
    }
    renderForms(true);
  });
};

runAppStarterListeners();

export {
  runAppStarterListeners,
  addAuthFormListeners,
  addUserManageNavListener,
  addUserManageFormSubmitListener,
  viewActionHandler,
  checkActionHandler,
  addOrderFilterListeners,
  addModalCloseListener,
  addLogOutListener,
  addUpdateListener,
  addProfileOrderTrListener,
  addBackButtonListener,
  addDarkModeListener,
  openProfile,
};
