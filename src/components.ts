import { HotdogsAndToppings, Order, orderHotdogs } from './interfaces/Order';
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
    html += `
              <tr>
                <td><p>${user_id}</p></td>
                <td><p>${username}</p></td>
                <td><p>${email}</p></td>
                <td><p>${points}</p></td>
                <td><p>${role}</p></td>
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
                <p class="order-amount">0</p>
                <p class="order-filter-text">Tilaukset</p>
              </div>
            </div>
            <div class="order-info-button order-info-btn-recieved">
              <i class="fa-solid fa-box"></i>
              <div class="order-info">
                <p class="order-amount">0</p>
                <p class="order-filter-text">Vastaanotetut</p>
              </div>
            </div>
            <div class="order-info-button order-info-btn-in-progress">
              <i class="fa-regular fa-clock"></i>
              <div class="order-info">
                <p class="order-amount">0</p>
                <p class="order-filter-text">Työn alla</p>
              </div>
            </div>
            <div class="order-info-button order-info-btn-completed">
              <i class="fa-solid fa-check"></i>
              <div class="order-info">
                <p class="order-amount">0</p>
                <p class="order-filter-text">Valmiit</p>
              </div>
            </div>
            <div class="order-info-button order-info-btn-picked-up">
              <i class="fa-solid fa-check"></i>
              <div class="order-info">
                <p class="order-amount">0</p>
                <p class="order-filter-text">Noudetut</p>
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
      case 3:
        statusString = 'Noudettu';
        statusStringClass = 'picked-up';
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
                  status !== 3
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
const orderReviewModal = (order: orderHotdogs[]): string => {
  const { order_id, order_date, status } = order[0];
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
    case 3:
      statusString = 'Noudettu';
      statusStringClass = 'picked-up';
      break;
    default:
      statusString = 'Kelpuuton';
      statusStringClass = 'unvalid';
      console.log('status is unvalid');
  }
  let html = `
  <div class="order-review-container">
    <div class="order-review-top">
      <div class="order-id-container"><h2>${order_id}</h2></div>
    </div>
    <div class="order-review-bottom">
    <p>Tilattu: ${formattedDate}</p>
    <div class="status-container status-container-${statusStringClass}"><p>${statusString}</p></div>
    </div>
  </div> `;
  return html;
};
const addUserDataToModal = (user: User, orders?: Order[]): string => {
  let html = `
  <div class="dialog-profile-container">
    <div class="dialog-profile-main-container">
      <div class="dialog-profile-main">
      <div class="rotating-card">
        <div class="rotating-card-front profile-item-container">
          <h2 class="profile-username">Hei ${user.username}!</h2>
          <form method="dialog" id="updateForm">
            <input type="text" name="username" id="usernameInput" class="modal-input" autocomplete="name" placeholder="${user.username}" value="${user.username}" minlenght="3" required></input><br>
            <input type="password" name="password" id="passwordInput" name="password" class="modal-input" autocomplete="password" placeholder="Password" minlenght=8" required></input>
            <button class="form-button" type="submit" value="submit" id="saveProfileButton">Tallenna</button>
          </form>
        </div>
        <div class="rotating-card-back">
          <div class="back-main-content">
          </div>
          <div class="back-bottom-content">
            <button class="back-button" id="backButton"><i class="fa-solid fa-arrow-right-arrow-left"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="dialog-profile-settings profile-side profile-item-container">
    <div class="profile-setting-top profile-top">
      <h3>Sivusto asetukset</h3>
      <button class="dialog-close-button" id="dialogCloseButton">X</button>
    </div><hr>
    <div class="profile-setting-main">
      <button class="form-button" id="logOutButton">Kirjaudu ulos</button>
    </div>
  </div>
  <div class="dialog-profile-favourite profile-side profile-item-container">
    <div class="profile-favourite-top profile-top">
      <h3>Tilauksesi</h3>
    </div>
    <hr>
    <div class="profile-favourite-main"  id="favouriteMain">
      <table>`;
  if (!orders) {
    return '';
  }
  if (!Array.isArray(orders) || orders.length === 0) {
    html += `
        <tr>
                <td><p>No orders found</p></td>
              </tr></table></div></div></div>
        `;
    return html;
  }

  const newOrdersFirstArray = [...orders].reverse();
  newOrdersFirstArray.forEach((order) => {
    const { order_id, total_price, order_date, status } = order;
    const originalDate = new Date(order_date);
    const formattedDate = originalDate.toLocaleString('fi-FI', {
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
      case 3:
        statusString = 'Noudettu';
        statusStringClass = 'picked-up';
        break;
      default:
        statusString = 'Kelpuuton';
        statusStringClass = 'unvalid';
        console.log('status is unvalid');
    }
    html += `
              <tr class="profile-order-tr" data-order-id="${order.order_id}">
                <td><p>${order_id}</p></td>
                <td><p>${formattedDate}</p></td>
                <td><div class="status-container status-container-${statusStringClass}"><p>${statusString}</p></div></td>
              </tr>
              `;
  });
  html += `</table></div></div>`;
  return html;
};
const adminOrderViewModal = (
  orderHotdogs: orderHotdogs[],
  hotdogToppings: HotdogsAndToppings[]
): string => {
  const { order_id, order_date, status, total_price, user_id } =
    orderHotdogs[0];

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
    case 3:
      statusString = 'Noudettu';
      statusStringClass = 'picked-up';
      break;
    default:
      statusString = 'Kelpuuton';
      statusStringClass = 'unvalid';
      console.log('status is unvalid');
  }
  let html = `
  <div class="admin-orders-container">
    <div class="admin-orders-top-container">
      <div class="order-top-info-container" style="display:flex; flex-direction:column;">
        <h2>Tilaus numero: ${order_id}</h2>
        <p>Asiakas: ${user_id}, teki tilauksen: ${formattedDate}</p>
      </div>
      <div class="order-top-info-container" style="display:flex; flex-direction:column;">
        <div class="status-container status-container-${statusStringClass}"><p>${statusString}: ${status}</p></div>
        <p style="padding: 5px;">Hinta: ${total_price}</p>
      </div>
      <button class="dialog-close-button" id="dialogCloseButton">X</button>
    </div>
    <div class="admin-orders-bottom-container">
  `;
  // TODO: lisää foreachilla jokainen hotdog
  let hotdogsHtml = '';
  hotdogToppings.map((hotdogsToppings: HotdogsAndToppings) => {
    hotdogsHtml += `
      <div class="admin-hotdog-container">
        <h3>${hotdogsToppings.hotdog_name}</h3>
        <p>${hotdogsToppings.amount} kpl</p>
        <p>${hotdogsToppings.toppings}</p>
      </div>
    `;

    console.log(hotdogsHtml);
  });

  console.log('hre', hotdogsHtml);
  // DATAA hotdog_name, amount, toppings
  html += hotdogsHtml + '</div></div>';
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
  addUserDataToModal,
  adminOrderViewModal,
  orderReviewModal,
};
