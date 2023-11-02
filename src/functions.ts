import { userManagementModel } from './components';
import { User } from './interfaces/User';

// Dummy users array
const users: User[] = [
  {
    userId: 0,
    username: 'testi',
    email: 'testi@mail.com',
    role: 2,
    points: 0,
  },
  {
    userId: 1,
    username: 'Mikko',
    email: 'Mikko@mail.com',
    role: 1,
    points: 10,
  },
  {
    userId: 2,
    username: 'Mallikas',
    email: 'Mallikas@mail.com',
    role: 0,
    points: 20,
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
  const adminSection = document.querySelector('#adminSection');
  if (!adminSection) {
    console.log('ERROR: No admin section found');
    return;
  }

  const userManagamentHtml = userManagementModel(users);
  adminSection.innerHTML = '';
  adminSection.insertAdjacentHTML('beforeend', userManagamentHtml);
};
const showAdminTools = () => {};

export { showSuperAdminTools, showAdminTools };
