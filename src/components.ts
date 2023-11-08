import { User } from './interfaces/User';
const userManagementModel = (users: User[]): string => {
  let html = `
    <div class="admin-container">
        <div class="user-management-nav">
            <a id="userManageAllWorkersBtn" class="user-manage-nav-btn user-manage-active">Kaikki työntekijät</a>
            <a id="userManageSAdminBtn" class="user-manage-nav-btn">S-ylläpito</a>
            <a id="userManageChefBtn" class="user-manage-nav-btn">Kokit</a>
            <a id="userManageCounterBtn" class="user-manage-nav-btn">Kassa</a>
            <a id="userManageAllBtn" class="user-manage-nav-btn">Kaikki</a>
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
    const { userId, username, email, role, points } = user;
    html += `
              <tr>
                <td><p>${userId}</p></td>
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
const formModal = (isLoginForm: boolean): string => {
  let html = `
  <div class="forms-container">
    <div class="forms-top-container">
    <h2 id="loginH2">${isLoginForm ? 'Kirjaudu' : 'Luo käyttäjä'}</h2>
    <button class="dialog-close-button" id="dialogCloseButton">X</button>
    </div>
    <div class="slider-container">
      <input type="checkbox" id="formModeCheckbox" class="slider-checkbox">
      <label id="login-label" for="formModeCheckbox" class="slider-label">Kirjaudu</label>
      <label id="register-label" for="formModeCheckbox" class="slider-label">Rekisteröidy</label>
    </div>
    <form method="dialog" id="authForm">
      <input type="text" id="usernameInput" name="username" class="modal-input" autocomplete="name" placeholder="Käyttäjätunnus" minlenght="3" required><br>
      ${
        isLoginForm
          ? ''
          : `<input type="email" id="emailInput" name="email" class="modal-input" autocomplete="email" placeholder="Sähköposti" required><br>`
      }
      <input type="password" id="passwordInput" name="password" class="modal-input" placeholder="Salasana" required><br>
      <button class="form-button" type="submit" value="submit" id="${
        isLoginForm ? 'loginButton' : 'registerButton'
      }">${isLoginForm ? 'Kirjaudu' : 'Luo käyttäjä'}</button>
    </form>
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

export { userManagementModel, formModal, updateForm };
