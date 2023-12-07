import { addUserDataToModal, confirmModal } from './components';
import {
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
        console.log('ERROR: Button id is unvalid');
        return;
      }
      const users = await fetchData(fetchString);
      console.log(users);
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
      } else {
        console.log(button.className);
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
        console.log('token found render profile');
        //TODO: render profile
        const userData = await getUserData(token);
        const profileModal = addUserDataToModal(userData);
        modal.innerHTML = '';
        modal.insertAdjacentHTML('beforeend', profileModal);
        addModalCloseListener();
        addLogOutListener();
        addUpdateListener();
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
      console.log('close');
      (modal as any).close();
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
      console.log('close');
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
        console.log(formData);

        const changeRole = await fetchData(url + '/user/updateRole', options);
        console.log('changeRole', changeRole);
      } catch (e) {
        console.log('error', e);
        return;
      }
    }
  });
};

const viewActionHandler = (event: Event) => {
  const orderId = (event.currentTarget as HTMLElement)?.getAttribute(
    'data-order-id'
  );

  if (orderId !== null && orderId !== undefined) {
    // Call a function or perform an action with orderId
    console.log(`View clicked for order ID: ${orderId}`);

    const modal = document.querySelector('dialog');

    if (!modal) {
      return;
    }
    const viewOrderModal = 'Heree';

    modal.innerHTML = '';
    modal.insertAdjacentHTML('beforeend', viewOrderModal);
    (modal as any).showModal();
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
          `Oletko varma haluavasi ottaa tilauksen <strong>${orderId} vastaan</strong>?`
        );
        break;
      case 1: // In progress
        confirmModalHtml = confirmModal(
          `Oletko varma haluavasi merkata tilauksen <strong>${orderId} valmiiksi</strong>?`
        );
        break;
      default:
        console.log('Remove this btn');
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
      const result = await fetchData(url + '/order/changeOrderStatus', options);
      if (orderStatus === 0) {
        const orders = await fetchData(url + '/order/getFilteredOrders/' + 0);
        showAdminTools(role, orders);
      } else if (orderStatus === 1) {
        const orders = await fetchData(url + '/order/getFilteredOrders/' + 1);
        showAdminTools(role, orders);
      } else {
        showAdminTools(role);
        console.log('Order status is < 0 or status > 1');
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
};
