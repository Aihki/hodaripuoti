import { confirmModal } from './components';
import {
  fetchData,
  getToken,
  renderForms,
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
        console.log('here');
      });
      button.classList.add('user-manage-active');
      switch (button.id) {
        case 'userManageAllWorkersBtn':
          const allStaff = await fetchData(url + '/user/role/1');
          updateUserManagementTable(allStaff);
          break;
        case 'userManageSAdminBtn':
          const superAdmins = await fetchData(url + '/user/role/2');
          updateUserManagementTable(superAdmins);
          break;
        case 'userManageCounterBtn':
          const otherStaff = await fetchData(url + '/user');
          updateUserManagementTable(otherStaff);
          break;
        case 'userManageAllBtn':
          const allUsers = await fetchData(url + '/user');
          updateUserManagementTable(allUsers);
          break;
        default:
          console.log('ERROR: Button id is unvalid');
          break;
      }
    });
  });
};

const addProfileBtnListener = () => {
  const profileButtons = document.querySelectorAll('#profileButton');
  profileButtons.forEach((profileButton) => {
    profileButton.addEventListener('click', () => {
      // TODO: check if user is logged in
      const token = getToken();
      if (token) {
        console.log('token found render profile');
        //TODO: render profile
        return;
      }
      renderForms(true);
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
const addOrderActionsListeners = () => {
  // Login form mode listener
  const checkActionBtns = document.querySelectorAll('#checkActionBtn');
  if (checkActionBtns.length <= 0) {
    return;
  }
  const viewActionBtns = document.querySelectorAll('#viewActionBtn');
  if (viewActionBtns.length <= 0) {
    return;
  }
  checkActionBtns.forEach((checkActionBtn) => {
    const modal = document.querySelector('dialog');
    if (!modal) {
      return;
    }
    checkActionBtn?.addEventListener('click', () => {
      const confirmModalHtml = confirmModal(
        'Oletko varma haluavasi merkata tilauksen <strong>valmiiksi</strong>?'
      );

      modal.innerHTML = '';
      modal.insertAdjacentHTML('beforeend', confirmModalHtml);
      (modal as any).showModal();
      const confirmYesBtn = document.querySelector('#confirmYesBtn');
      if (!confirmYesBtn) {
        return;
      }
      confirmYesBtn.addEventListener('click', () => {
        // TODO: Change orders status to completed
        console.log('order completed');
        (modal as any).close();
      });
    });
  });
  viewActionBtns.forEach((viewActionBtn) => {
    const modal = document.querySelector('dialog');
    if (!modal) {
      return;
    }
    viewActionBtn?.addEventListener('click', () => {
      const viewOrderModal = '';

      modal.innerHTML = '';
      modal.insertAdjacentHTML('beforeend', viewOrderModal);
      (modal as any).showModal();
    });
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

export {
  runAppStarterListeners,
  addAuthFormListeners,
  addUserManageNavListener,
  addOrderActionsListeners,
  addUserManageFormSubmitListener,
};
