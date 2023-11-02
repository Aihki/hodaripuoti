import { User } from './interfaces/User';
const userManagementModel = (users: User[]): string => {
  let html = `
    <div class="admin-container">
        <div class="user-management-nav">
            <a id="userManageAllWorkersBtn" class="user-manage-nav-btn">Kaikki työntekijät</a>
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
                <td>${userId}</td>
                <td>${username}</td>
                <td>${email}</td>
                <td>${points}</td>
                <td>${role}<div class="dropdown-here"></div></td>
              </tr>
              `;
  });
  html += `</table></div>`;
  return html;
};

export { userManagementModel };
