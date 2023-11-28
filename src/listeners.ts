import { confirmModal } from './components';
import { renderForms } from './functions';

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
    button.addEventListener('click', () => {
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
          // TODO: Call get function in backend or filter it on frontend
          break;
        case 'userManageSAdminBtn':
          // TODO: Call get function in backend or filter it on frontend
          break;
        case 'userManageChefBtn':
          // TODO: Call get function in backend or filter it on frontend
          break;
        case 'userManageCounterBtn':
          // TODO: Call get function in backend or filter it on frontend
          break;
        case 'userManageAllBtn':
          // TODO: Call get function in backend or filter it on frontend
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
      renderForms(null);
    });
  });
};

const addAuthFormListeners = () => {
  // Login form mode listener
  const formModeCheckbox = document.querySelector(
    '#formModeCheckbox'
  ) as HTMLInputElement;

  formModeCheckbox?.addEventListener('change', () => {
    if (formModeCheckbox.checked) {
      renderForms(false); // send FALSE if REGISTER form
    } else {
      renderForms(true); // send TRUE if LOGIN form
    }
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

export {
  runAppStarterListeners,
  addAuthFormListeners,
  addUserManageNavListener,
  addOrderActionsListeners,
};
