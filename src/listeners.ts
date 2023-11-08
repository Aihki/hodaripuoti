import { renderForms } from './functions';

/**
 * Runs all wanted listeners when application starts
 */
const runAppStarterListeners = () => {
  addUserManageNavListener();
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
      console.log('here');
      switch (button.id) {
        case 'userManageAllWorkersBtn':
          !button.classList.contains('user-manage-active')
            ? button.classList.add('user-manage-active')
            : button.classList.add('');
          // TODO: Call get function in backend or filter it on frontend
          break;
        case 'userManageSAdminBtn':
          !button.classList.contains('user-manage-active')
            ? button.classList.add('user-manage-active')
            : button.classList.add('');
          // TODO: Call get function in backend or filter it on frontend
          break;
        case 'userManageChefBtn':
          !button.classList.contains('user-manage-active')
            ? button.classList.add('user-manage-active')
            : button.classList.add('');
          // TODO: Call get function in backend or filter it on frontend
          break;
        case 'userManageCounterBtn':
          !button.classList.contains('user-manage-active')
            ? button.classList.add('user-manage-active')
            : button.classList.add('');
          // TODO: Call get function in backend or filter it on frontend
          break;
        case 'userManageAllBtn':
          !button.classList.contains('user-manage-active')
            ? button.classList.add('user-manage-active')
            : button.classList.add('');
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
export { runAppStarterListeners, addAuthFormListeners };
