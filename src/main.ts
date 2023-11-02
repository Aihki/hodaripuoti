import { showAdminTools, showSuperAdminTools } from './functions';

/**
 * Checks if user is admin and its status
 * 0 is regular user, 1 is chef or cashier, 2 is super admin
 * @returns role status - [0, 1, 2]
 */
const checkUserRole = (): void => {
  // TODO: get user role from db
  const userRole = 2; // Fixed to super admin
  if (userRole === 2) {
    showSuperAdminTools();
  } else if (userRole === 1) {
    showAdminTools();
  } else if (userRole === 0) {
    console.log('Regular user');
    const adminSection = document.querySelector('#adminSection') as HTMLElement;
    if (adminSection) {
      adminSection.style.display = 'none';
    }
  } else {
    console.log('ERROR: Users role is invalid');
  }
};

checkUserRole();
