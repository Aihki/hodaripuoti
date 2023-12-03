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
  let html = `
    <div class="admin-orders-container">
        <div class="orders-nav">
            <h2>Orders</h2>
        </div>
        <div class="orders-info-container">
            <div class="order-info-button order-info-btn-orders">
              <i class="fa-solid fa-bag-shopping"></i>
              <div class="order-info">
                <p class="order-amount">4</p>
                <p class="order-filter-text">Tilaukset</p>
              </div>
            </div>
            <div class="order-info-button order-info-btn-in-progress">
              <i class="fa-regular fa-clock"></i>
              <div class="order-info">
                <p class="order-amount">3</p>
                <p class="order-filter-text">Työn alla</p>
              </div>
            </div>
            <div class="order-info-button order-info-btn-completed">
              <i class="fa-solid fa-check"></i>
              <div class="order-info">
                <p class="order-amount">2</p>
                <p class="order-filter-text">Valmiit</p>
              </div>
            </div>
            <div class="order-info-button order-info-btn-recieved">
              <i class="fa-solid fa-box"></i>
              <div class="order-info">
                <p class="order-amount">2</p>
                <p class="order-filter-text">Vastaanotetut</p>
              </div>
            </div>
        </div>
        <div class="orders-container">
            <table>
            <tr class="sticky-row">
                <th>Tilauksen ID</th>
                <th>Tilaaja</th>
                <th>Tietoja</th>
                <th>Tuotteita (kpl)</th>
                <th>Tilattu</th>
                <th>Tila</th>
                <th>Toiminnot</th>
            </tr>
        `;
  order.forEach((order: Order) => {
    const { orderID, status, orderDate, info, products } = order;
    // Status, 0 = recieved, 1 = in progress, 2 = completed
    let statusString;
    let statusStringClass;
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
                <td><p>${orderID}</p></td>
                <td><p>Tilaaja</p></td>
                <td><p>${info}</p></td>
                <td><p>${products.length}</p></td>
                <td><p>${orderDate}</p></td>
                <td><div class="status-container status-container-${statusStringClass}"><p>${statusString}: ${status}</p></div></td>
                <td>
                  <div class="actions-container">
                    <div class="status-container-recieved action-btn" id="viewActionBtn"><i class="fa-regular fa-eye"></i></div>
                    <div class="status-container-completed action-btn" id="checkActionBtn"><i class="fa-solid fa-check"></i></div>
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
    <button class="form-button" type="submit" value="submit" id="loginButton">Kirjaudu</button>
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

export {
  userManagementModel,
  registerFormModal,
  loginFormModal,
  updateForm,
  orderManagementModel,
  confirmModal,
  updateUserManagementModel,
};
