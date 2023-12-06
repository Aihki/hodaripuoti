import { Order } from './interfaces/Order';
import { User } from './interfaces/User';
const userManagementModel = (users: User[]): string => {
  let html = `
    <div class="admin-container">
        <div class="user-management-nav">
        <a id="userManageAllBtn" class="user-manage-nav-btn user-manage-active">Kaikki</a>
            <a id="userManageAllWorkersBtn" class="user-manage-nav-btn">Kaikki työntekijät</a>
            <a id="userManageSAdminBtn" class="user-manage-nav-btn">S-ylläpito</a>
            <a id="userManageCounterBtn" class="user-manage-nav-btn">Työntekijät</a>
        </div>
        <div class="user-management-table-container">
            <table>
            <tr class="sticky-row">
                <th>ID</th>
                <th>Käyttäjänimi</th>
                <th>Sähköposti</th>
                <th>Pisteet</th>
                <th>Rooli</th>
            </tr>
        `;
  users.forEach((user: User) => {
    const { user_id, username, email, role, points } = user;

    const formId = `form_${user_id}`;
    const inputId = `roleInput_${user_id}`;

    html += `
              <tr>
                <td><p>${user_id}</p></td>
                <td><p>${username}</p></td>
                <td><p>${email}</p></td>
                <td><p>${points}</p></td>
                <td>
                  <form id="${formId}">
                    <input id="${inputId}" value="${role}">
                    <button type="submit">Go</button>
                  </form>
  
                </td>
              </tr>
              `;
  });
  html += `</table></div>`;

  return html;
};
const updateUserManagementModel = (users: User[]): string => {
  const userManagementTableContainer = document.querySelector(
    '.user-management-table-container'
  );
  if (userManagementTableContainer) {
    userManagementTableContainer.innerHTML = '';
  }
  let html = `
            <table>
            <tr class="sticky-row">
                <th>ID</th>
                <th>Käyttäjänimi</th>
                <th>Sähköposti</th>
                <th>Pisteet</th>
                <th>Rooli</th>
            </tr>
        `;
  users.forEach((user: User) => {
    const { user_id, username, email, role, points } = user;
    html += `
              <tr>
                <td><p>${user_id}</p></td>
                <td><p>${username}</p></td>
                <td><p>${email}</p></td>
                <td><p>${points}</p></td>
                <td><p>${role}</p><div class="dropdown-here"></div></td>
              </tr>
              `;
  });
  html += `</table></div>`;
  return html;
};
const orderManagementModel = (order: Order[]): string => {
  let inProgressCount: number = 0;
  let readyCount: number = 0;
  let recievedCount: number = 0;
  order.forEach((currentOrder: Order) => {
    // Status, 0 = recieved, 1 = in progress, 2 = completed
    switch (currentOrder.status) {
      case 0:
        recievedCount++;
        break;
      case 1:
        inProgressCount++;
        break;
      case 2:
        readyCount++;
        break;
      default:
        console.log('status is unvalid');
    }
  });
  let html = `
    <div class="admin-orders-container">
        <div class="orders-nav">
            <h2>Orders</h2>
        </div>
        <div class="orders-info-container">
            <div class="order-info-button order-info-btn-orders">
              <i class="fa-solid fa-bag-shopping"></i>
              <div class="order-info">
                <p class="order-amount">${order.length}</p>
                <p class="order-filter-text">Tilaukset</p>
              </div>
            </div>
            <div class="order-info-button order-info-btn-in-progress">
              <i class="fa-regular fa-clock"></i>
              <div class="order-info">
                <p class="order-amount">${inProgressCount}</p>
                <p class="order-filter-text">Työn alla</p>
              </div>
            </div>
            <div class="order-info-button order-info-btn-completed">
              <i class="fa-solid fa-check"></i>
              <div class="order-info">
                <p class="order-amount">${readyCount}</p>
                <p class="order-filter-text">Valmiit</p>
              </div>
            </div>
            <div class="order-info-button order-info-btn-recieved">
              <i class="fa-solid fa-box"></i>
              <div class="order-info">
                <p class="order-amount">${recievedCount}</p>
                <p class="order-filter-text">Vastaanotetut</p>
              </div>
            </div>
        </div>
        <div class="orders-container">
            <table>
            <tr class="sticky-row">
                <th>Tilauksen ID</th>
                <th>Tilaaja</th>
                <th>Hinta</th>
                <th>Tilattu</th>
                <th>Tila</th>
                <th>Toiminnot</th>
            </tr>
        `;
  order.forEach((order: Order) => {
    const { order_id, status, order_date, total_price, user_id } = order;
    const originalDate = new Date(order_date);
    const formattedDate = originalDate.toLocaleString('fi-FI', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    let statusString: string;
    let statusStringClass: string;
    switch (status) {
      case 0:
        statusString = 'Vastaanotettu';
        statusStringClass = 'recieved';
        break;
      case 1:
        statusString = 'Työn alla';
        statusStringClass = 'in-progress';
        break;
      case 2:
        statusString = 'Valmis';
        statusStringClass = 'completed';
        break;
      default:
        statusString = 'Kelpuuton';
        statusStringClass = 'unvalid';
        console.log('status is unvalid');
    }
    html += `
              <tr>
                <td><p>${order_id}</p></td>
                <td><p>${user_id}</p></td>
                <td><p>${total_price}€</p></td>
                <td><p>${formattedDate}</p></td>
                <td><div class="status-container status-container-${statusStringClass}"><p>${statusString}: ${status}</p></div></td>
                <td>
                  <div class="actions-container">
                  <div class="status-container-recieved action-btn viewActionBtn" data-order-id="${
                    order.order_id
                  }" data-order-status="${order.status}">
                  <i class="fa-regular fa-eye"></i>
                </div>
                ${
                  status !== 2
                    ? `
                <div class="status-container-completed action-btn checkActionBtn" data-order-id="${order.order_id}" data-order-status="${order.status}">
                  <i class="fa-solid fa-check"></i>
                </div>`
                    : ''
                }
                  </div>
                </td>
              </tr>
              `;
  });
  html += `</table></div>`;
  return html;
};
const loginFormModal = (): string => {
  let html = `
  <div class="forms-container">
    <div class="forms-top-container">
    <h2 id="loginH2">Kirjaudu</h2>
    <button class="dialog-close-button" id="dialogCloseButton">X</button>
    </div>
    <form method="dialog" id="authForm">
    <input type="email" id="emailInput" name="email" class="modal-input" autocomplete="email" placeholder="Sähköposti" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"><br>
    <input type="password" id="passwordInput" name="password" class="modal-input" placeholder="Salasana" required minlength="8"><br>
    <button class="form-button" type="submit" value="submit" id="loginButton">Kirjaudu</button>
    </form>

    <div class="form-button-a-container"> 
      <a href="#" class="form-button-a" id="changeFormToRegisterBtn">Luo käyttäjä</a>
    </div>
    </div> `;
  return html;
};
const registerFormModal = (): string => {
  let html = `
  <div class="forms-container">
    <div class="forms-top-container">
    <h2 id="loginH2">Luo käyttäjä</h2>
    <button class="dialog-close-button" id="dialogCloseButton">X</button>
    </div>
    <form method="dialog" id="authForm">
    <input type="email" id="emailInput" name="email" class="modal-input" autocomplete="email" placeholder="Sähköposti" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" ><br>
    <input type="text" id="usernameInput" name="username" class="modal-input" autocomplete="name" placeholder="Käyttäjätunnus" minlength="3" maxlength="40" required><br>
    <input type="password" id="passwordInput" name="password" class="modal-input" placeholder="Salasana" required minlength="8"><br>
    <button class="form-button" type="submit" value="submit" id="loginButton">Luo käyttäjä</button>
    </form>
    <div class="form-button-a-container"> 
    <a href="#" class="form-button-a" id="changeFormToLoginBtn">Kirjaudu sisään</a>
    </div>
  </div> `;
  return html;
};
const updateForm = (isLoginForm: boolean): void => {
  const form = document.querySelector('#authForm');
  if (!form) {
    return;
  }
  form.innerHTML = '';
  const newForm = `
      <input type="text" id="usernameInput" name="username" class="modal-input" autocomplete="name" placeholder="Käyttäjätunnus" minlenght="3" required><br>
      ${
        isLoginForm
          ? ''
          : `<input type="email" id="emailInput" name="email"  class="modal-input" autocomplete="email" placeholder="Sähköposti" required><br>`
      }
      <input type="password" id="passwordInput" name="password" class="modal-input" placeholder="Salasana"  required><br>
      <button class="form-button" type="submit" value="submit" id="${
        isLoginForm ? 'loginButton' : 'registerButton'
      }">${isLoginForm ? 'Kirjaudu' : 'Luo käyttäjä'}</button>`;
  form.insertAdjacentHTML('beforeend', newForm);
  const loginH2 = document.querySelector('#loginH2');
  if (!loginH2) {
    return;
  }
  loginH2.textContent = `${isLoginForm ? 'Kirjaudu' : 'Luo Käyttäjä'}`;
};
const confirmModal = (modaltext: string): string => {
  let html = `
  <div class="confirm-modal-container">
    <div class="forms-top-container">
      <h2>${modaltext}</h2>
    </div>
    <form method="dialog" id="confirmForm">
      <button class="form-button form-button-cancel" id="dialogCloseButton">Peru</button>
      <button class="form-button" id="confirmYesBtn">Kyllä</button>
    </form>
  </div> `;
  return html;
};
const infoModal = (modaltext: string): string => {
  let html = `
  <div class="confirm-modal-container">
    <div class="forms-top-container">
      <h2>${modaltext}</h2>
    </div>
    <button class="form-button form-button-cancel" id="dialogCloseButton">Peru</button>
  </div> `;
  return html;
};

export {
  userManagementModel,
  registerFormModal,
  loginFormModal,
  updateForm,
  orderManagementModel,
  confirmModal,
  updateUserManagementModel,
  infoModal,
};
