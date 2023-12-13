(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const l="https://hodaripuoti.northeurope.cloudapp.azure.com/api",vt=e=>{let t=`
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
        `;return e.forEach(o=>{const{user_id:r,username:n,email:a,role:s,points:i}=o;t+=`
              <tr>
                <td><p>${r}</p></td>
                <td><p>${n}</p></td>
                <td><p>${a}</p></td>
                <td><p>${i}</p></td>
                <td><p>${s}</p></td>
              </tr>
              `}),t+="</table></div>",t},bt=e=>{const t=document.querySelector(".user-management-table-container");t&&(t.innerHTML="");let o=`
            <table>
            <tr class="sticky-row">
                <th>ID</th>
                <th>Käyttäjänimi</th>
                <th>Sähköposti</th>
                <th>Pisteet</th>
                <th>Rooli</th>
            </tr>
        `;return e.forEach(r=>{const{user_id:n,username:a,email:s,role:i,points:m}=r;o+=`
              <tr>
                <td><p>${n}</p></td>
                <td><p>${a}</p></td>
                <td><p>${s}</p></td>
                <td><p>${m}</p></td>
                <td><p>${i}</p><div class="dropdown-here"></div></td>
              </tr>
              `}),o+="</table></div>",o},kt=e=>{let t=`
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
                <th style="text-align: center;">Tila</th>
                <th style="text-align: center;">Toiminnot</th>
            </tr>
        `;return e.forEach(o=>{const{order_id:r,status:n,order_date:a,total_price:s,user_id:i}=o,d=new Date(a).toLocaleString("fi-FI",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit",year:"numeric"});let c,u;switch(n){case 0:c="Vastaanotettu",u="recieved";break;case 1:c="Työn alla",u="in-progress";break;case 2:c="Valmis",u="completed";break;case 3:c="Noudettu",u="picked-up";break;default:c="Kelpuuton",u="unvalid"}t+=`
              <tr>
                <td><p>${r}</p></td>
                <td><p>${i}</p></td>
                <td><p>${s}€</p></td>
                <td><p>${d}</p></td>
                <td><div class="status-container status-container-${u}"><p>${c}: ${n}</p></div></td>
                <td>
                  <div class="actions-container">
                  <div class="status-container-recieved action-btn viewActionBtn" data-order-id="${o.order_id}" data-order-status="${o.status}">
                  <i class="fa-regular fa-eye"></i>
                </div>
                ${n!==3?`
                <div class="status-container-completed action-btn checkActionBtn" data-order-id="${o.order_id}" data-order-status="${o.status}">
                  <i class="fa-solid fa-check"></i>
                </div>`:""}
                  </div>
                </td>
              </tr>
              `}),t+="</table></div>",t},St=()=>`
  <div class="forms-container">
    <div class="forms-top-container">
    <h2 id="loginH2">Kirjaudu</h2>
    <button class="dialog-close-button" id="dialogCloseButton">X</button>
    </div>
    <form method="dialog" id="authForm">
    <input type="email" id="emailInput" name="email" class="modal-input" autocomplete="email" placeholder="Sähköposti" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"><br>
    <input type="password" id="passwordInput" name="password" class="modal-input" placeholder="Salasana" required minlength="8"><br>
    <button class="form-button" type="submit" value="submit" id="loginButton">Kirjaudu</button>
    </form>

    <div class="form-button-a-container"> 
      <a href="#" class="form-button-a" id="changeFormToRegisterBtn">Luo käyttäjä</a>
    </div>
    </div> `,Lt=()=>`
  <div class="forms-container">
    <div class="forms-top-container">
    <h2 id="loginH2">Luo käyttäjä</h2>
    <button class="dialog-close-button" id="dialogCloseButton">X</button>
    </div>
    <form method="dialog" id="authForm">
    <input type="email" id="emailInput" name="email" class="modal-input" autocomplete="email" placeholder="Sähköposti" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$" ><br>
    <input type="text" id="usernameInput" name="username" class="modal-input" autocomplete="name" placeholder="Käyttäjätunnus" minlength="3" maxlength="40" required><br>
    <input type="password" id="passwordInput" name="password" class="modal-input" placeholder="Salasana" required minlength="8"><br>
    <button class="form-button" type="submit" value="submit" id="loginButton">Luo käyttäjä</button>
    </form>
    <div class="form-button-a-container"> 
    <a href="#" class="form-button-a" id="changeFormToLoginBtn">Kirjaudu sisään</a>
    </div>
  </div> `,j=e=>`
  <div class="confirm-modal-container">
    <div class="forms-top-container">
      <h2>${e}</h2>
    </div>
    <form method="dialog" id="confirmForm">
      <button class="form-button form-button-cancel" id="dialogCloseButton">Peru</button>
      <button class="form-button" id="confirmYesBtn">Kyllä</button>
    </form>
  </div> `,Tt=e=>`
  <div class="confirm-modal-container">
    <div class="forms-top-container">
      <h2>${e}</h2>
    </div>
    <button class="form-button form-button-cancel" id="dialogCloseButton">Peru</button>
  </div> `,wt=e=>(console.log(e),`
  <img src="/public/icons/icon-512x512.png" alt="maskotti">
  <h2 class="message-title">${e}</h2>
  <button class="message-btn">Katso tilausta</button>
`),Et=e=>{const{order_id:t,order_date:o,status:r}=e[0],a=new Date(o).toLocaleString("fi-FI",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit",year:"numeric"});let s,i;switch(r){case 0:s="Vastaanotettu",i="recieved";break;case 1:s="Työn alla",i="in-progress";break;case 2:s="Valmis",i="completed";break;case 3:s="Noudettu",i="picked-up";break;default:s="Kelpuuton",i="unvalid"}return`
  <div class="order-review-container">
    <div class="order-review-top">
      <div class="order-id-container"><h2>${t}</h2></div>
    </div>
    <div class="order-review-bottom">
    <p style="margin-bottom: 10px;">Tilattu: ${a}</p>
    <div class="status-container status-container-${i}"><p>${s}</p></div>
    </div>
  </div> `},R=(e,t)=>{let o=`
  <div class="dialog-profile-container">
    <div class="dialog-profile-main-container">
      <div class="dialog-profile-main">
      <div class="rotating-card">
        <div class="rotating-card-front profile-item-container">
          <h2 class="profile-username">Hei ${e.username}!</h2>
          <form method="dialog" id="updateForm">
            <input type="text" name="username" id="usernameInput" class="modal-input" autocomplete="name" placeholder="${e.username}" value="${e.username}" minlength="3" required></input><br>
            <input type="password" name="password" id="passwordInput" name="password" class="modal-input" autocomplete="password" placeholder="Password" minlength=8" required></input>
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
    <input type="checkbox" class="checkbox" id="checkbox" />
    <label for="checkbox" class="checkbox-label">
    <span class="visually-hidden">Toggle Day/Night</span>
    <i class="fa-solid fa-moon"></i>
    <i class="fa-solid fa-sun"></i>
    <span class="ball"></span>
    </label>
    <button class="form-button" id="logOutButton">Kirjaudu ulos</button>
    </div>
  </div>
  <div class="dialog-profile-favourite profile-side profile-item-container">
    <div class="profile-favourite-top profile-top">
      <h3>Tilauksesi</h3>
    </div>
    <hr>
    <div class="profile-favourite-main"  id="favouriteMain">
      <table>`;return t?!Array.isArray(t)||t.length===0?(o+=`
        <tr>
                <td><p>No orders found</p></td>
              </tr></table></div></div></div>
        `,o):([...t].reverse().forEach(n=>{const{order_id:a,order_date:s,status:i}=n,d=new Date(s).toLocaleString("fi-FI",{day:"2-digit",month:"2-digit",year:"numeric"});let c,u;switch(i){case 0:c="Vastaanotettu",u="recieved";break;case 1:c="Työn alla",u="in-progress";break;case 2:c="Valmis",u="completed";break;case 3:c="Noudettu",u="picked-up";break;default:c="Kelpuuton",u="unvalid"}o+=`
              <tr class="profile-order-tr" data-order-id="${n.order_id}">
                <td><p>${a}</p></td>
                <td><p>${d}</p></td>
                <td><div class="status-container status-container-${u}"><p>${c}</p></div></td>
              </tr>
              `}),o+="</table></div></div>",o):""},qt=(e,t)=>{const{order_id:o,order_date:r,status:n,total_price:a,user_id:s}=e[0],m=new Date(r).toLocaleString("fi-FI",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit",year:"numeric"});let d,c;switch(n){case 0:d="Vastaanotettu",c="recieved";break;case 1:d="Työn alla",c="in-progress";break;case 2:d="Valmis",c="completed";break;case 3:d="Noudettu",c="picked-up";break;default:d="Kelpuuton",c="unvalid"}let u=`
  <div class="admin-orders-container">
    <div class="admin-orders-top-container">
      <div class="order-top-info-container" style="display:flex; flex-direction:column;">
        <h2>Tilaus numero: ${o}</h2>
        <p>Asiakas: ${s}, teki tilauksen: ${m}</p>
      </div>
      <div class="order-top-info-container" style="display:flex; flex-direction:column;">
        <div class="status-container status-container-${c}"><p>${d}: ${n}</p></div>
        <p style="padding: 5px;">Hinta: ${a}</p>
      </div>
      <button class="dialog-close-button" id="dialogCloseButton">X</button>
    </div>
    <div class="admin-orders-bottom-container">
  `,f="";return t.map(g=>{f+=`
      <div class="admin-hotdog-container">
        <h3>${g.hotdog_name}</h3>
        <p>${g.amount} kpl</p>
        <p>${g.toppings}</p>
      </div>
    `}),u+=f+"</div></div>",u},Mt=()=>{At()},Ht=()=>{const e=document.querySelectorAll(".user-manage-nav-btn");e.length<=0||e.forEach(t=>{t.addEventListener("click",async()=>{document.querySelectorAll(".user-manage-active").forEach(a=>{a.classList.contains("user-manage-active")&&a.classList.remove("user-manage-active")}),t.classList.add("user-manage-active");let r="";switch(t.id){case"userManageAllWorkersBtn":r=l+"/user/workers";break;case"userManageSAdminBtn":r=l+"/user/role/2";break;case"userManageCounterBtn":r=l+"/user/role/1";break;case"userManageAllBtn":r=l+"/user";break}if(r===null)return;const n=await p(r);n?Ot(n):Ft("No users found")})})},xt=e=>{const t=document.querySelectorAll(".order-info-button");t.length<=0||t.forEach(o=>{o.addEventListener("click",async()=>{let r="";if(o.classList.contains("order-info-btn-orders")?r=l+"/order":o.classList.contains("order-info-btn-in-progress")?r=l+"/order/getFilteredOrders/1":o.classList.contains("order-info-btn-completed")?r=l+"/order/getFilteredOrders/2":o.classList.contains("order-info-btn-recieved")?r=l+"/order/getFilteredOrders/0":o.classList.contains("order-info-btn-picked-up")?r=l+"/order/getFilteredOrders/3":r=null,r!==null){const n=await p(r);q(e,n)}})})},At=()=>{document.querySelectorAll("#profileButton").forEach(t=>{t.addEventListener("click",async()=>{const o=document.querySelector("dialog"),r=Z();if(o&&r!==null){const n=await C(r),a=await p(l+"/order/getMyOrders/"+n.user_id),s=R(n,a);o.innerHTML="",o.insertAdjacentHTML("beforeend",s),O(),V(),J(),U(),K(),z(),W(),o.showModal();return}M(!0)})})},O=()=>{const e=document.querySelector("dialog");if(!e)return;document.querySelectorAll("#dialogCloseButton").forEach(o=>{o.addEventListener("click",()=>{e.close()})})},K=()=>{const e=document.querySelector("#backButton");e&&e.addEventListener("click",()=>{const t=document.querySelector(".rotating-card");t!=null&&t.classList.contains("show-back")&&(t==null||t.classList.remove("show-back"))})},U=()=>{const e=document.querySelectorAll(".profile-order-tr");!e||e.length<1||e.forEach(t=>{t.addEventListener("click",async()=>{const o=t.getAttribute("data-order-id"),r=document.querySelector(".rotating-card"),n=await p(l+"/order/orderHotdogs/"+o),a=Et(n),s=document.querySelector(".back-main-content");s&&(s.innerHTML="",s.insertAdjacentHTML("beforeend",a),(r==null?void 0:r.classList.contains("show-back"))===!1&&r.classList.add("show-back"))})})},V=()=>{const e=document.querySelectorAll("#logOutButton"),t=document.querySelector("#adminSection");e.forEach(o=>{o.addEventListener("click",()=>{localStorage.removeItem("token"),M(!0),t&&(t.innerHTML="")})})},et=()=>{const e=document.querySelector("#changeFormToLoginBtn"),t=document.querySelector("#changeFormToRegisterBtn");e==null||e.addEventListener("click",()=>{M(!0)}),t==null||t.addEventListener("click",()=>{M(!1)});const o=document.querySelector("dialog");if(!o)return;document.querySelectorAll("#dialogCloseButton").forEach(n=>{n.addEventListener("click",()=>{o.close()})})},Ct=()=>{const e=document.querySelector(".user-management-table-container");e==null||e.addEventListener("submit",async t=>{if(t.preventDefault(),t.target&&t.target.tagName==="FORM"){const o=t.target,r=o.id,n=parseInt(r.split("_")[1],10),a=o.querySelector("input"),s=parseInt(a.value,10);if(isNaN(s)||s<0||s>2)return alert("Invalid role");try{const m={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:n,role:s})};await p(l+"/user/updateRole",m)}catch{return}}})},ot=async e=>{var o;const t=(o=e.currentTarget)==null?void 0:o.getAttribute("data-order-id");if(t!=null){const r=document.querySelector("dialog");if(!r)return;const n=await p(l+"/order/orderHotdogs/"+t),a=await p(l+"/order/hotdogsAndToppings/"+t);if(n.message||a.message)return;const s=qt(n,a);r.innerHTML="",r.insertAdjacentHTML("beforeend",s),r.showModal(),O()}},rt=(e,t)=>{var i,m;const o=(i=t.currentTarget)==null?void 0:i.getAttribute("data-order-id"),r=o?parseInt(o,10):null,n=(m=t.currentTarget)==null?void 0:m.getAttribute("data-order-status"),a=n?parseInt(n,10):null,s=document.querySelector("dialog");if(s&&r!=null&&a!==null&&a!==void 0){let d="";switch(a){case 0:d=j(`Oletko varma haluavasi ottaa tilauksen <strong class="text-in-progress">${r} vastaan</strong>?`);break;case 1:d=j(`Oletko varma haluavasi merkata tilauksen <strong class="text-ready">${r} valmiiksi</strong>?`);break;case 2:d=j(`Oletko varma haluavasi merkata tilauksen <strong class="text-picked-up">${r} noudetuksi</strong>?`);break}s.innerHTML="",s.insertAdjacentHTML("beforeend",d);const c=document.querySelector("#confirmYesBtn");if(!c)return;c.addEventListener("click",async()=>{const u={status:a+1,order_id:r},f={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)};if(await p(l+"/order/changeOrderStatus",f),a===0){const g=await p(l+"/order/getFilteredOrders/1");q(e,g)}else if(a===1){const g=await p(l+"/order/getFilteredOrders/2");q(e,g)}else if(a===2){const g=await p(l+"/order/getFilteredOrders/3");q(e,g)}else q(e);s.close()}),s.showModal()}},J=()=>{const e=document.querySelector("#updateForm");e==null||e.addEventListener("submit",t=>{t.preventDefault(),Pt()})},z=()=>{const e=document.getElementById("checkbox");e&&e.addEventListener("change",()=>{document.body.classList.toggle("dark"),document.body.classList.contains("dark")?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light")})},It=()=>{const e=document.querySelector(".message-btn");e&&e.addEventListener("click",async()=>{const t=document.querySelector(".message");if(!t)return;t.style.display="none";const o=document.querySelector("dialog"),r=Z();if(o&&r!==null){const n=await C(r),a=await p(l+"/order/getMyOrders/"+n.user_id),s=R(n,a);o.innerHTML="",o.insertAdjacentHTML("beforeend",s),O(),V(),J(),U(),K(),z(),o.showModal();return}M(!0)})};Mt();const p=async(e,t={})=>{const o=await fetch(e,t);if(!o.ok)throw new Error(`Error ${o.status} occured`);try{return await o.json()}catch(r){throw new Error(`Error parsing JSON: ${r.message}`)}},Z=()=>{const e=localStorage.getItem("token");return e||null},dt=async()=>{try{const e=Z();if(e!==null){const o=(await C(e)).role;if(o>0)q(o);else if(o===0){const r=document.querySelector("#adminSection");r&&(r.style.display="none")}}else{const t=document.querySelector("#adminSection");t&&(t.style.display="none")}}catch(e){console.error("Error:",e)}},C=async e=>{const t={headers:{Authorization:"Bearer "+e}};return await p(l+"/auth/me",t)},q=async(e,t)=>{const o=document.querySelector("#adminSection");if(!o)return;let r;t?r=t:r=await p(l+"/order");const n=kt(r);if(o.innerHTML="",o.insertAdjacentHTML("beforeend",n),xt(e),_t(),e===2){const a=await p(l+"/user"),s=vt(a);o.insertAdjacentHTML("beforeend",s),Ht(),Ct()}document.querySelectorAll(".viewActionBtn").forEach(a=>{a.removeEventListener("click",ot)}),document.querySelectorAll(".checkActionBtn").forEach(a=>{a.removeEventListener("click",s=>rt(e,s))}),document.querySelectorAll(".viewActionBtn").forEach(a=>{a.addEventListener("click",ot)}),document.querySelectorAll(".checkActionBtn").forEach(a=>{a.addEventListener("click",s=>rt(e,s))}),o.style.display="block"},_t=async()=>{var s,i,m,d,c;const e=await p(l+"/order/ordersCounts");if(e.length<1)return;const t=(s=document.querySelector(".order-info-btn-orders"))==null?void 0:s.querySelector(".order-amount"),o=(i=document.querySelector(".order-info-btn-recieved"))==null?void 0:i.querySelector(".order-amount"),r=(m=document.querySelector(".order-info-btn-completed"))==null?void 0:m.querySelector(".order-amount"),n=(d=document.querySelector(".order-info-btn-in-progress"))==null?void 0:d.querySelector(".order-amount"),a=(c=document.querySelector(".order-info-btn-picked-up"))==null?void 0:c.querySelector(".order-amount");!r||!n||!t||!o||!a||(r.innerHTML=e[0].completedCount,n.innerHTML=e[0].inProgressCount,t.innerHTML=e[0].totalOrders,o.innerHTML=e[0].recievedCount,a.innerHTML=e[0].pickedUpCount)},M=e=>{const t=document.querySelector("dialog");if(t)if(e===!0){const o=St();t.innerHTML="",t.insertAdjacentHTML("beforeend",o);const r=document.querySelector("#authForm");r==null||r.addEventListener("submit",n=>{n.preventDefault(),$t()}),et(),t==null||t.showModal()}else{const o=Lt();t.innerHTML="",t.insertAdjacentHTML("beforeend",o);const r=document.querySelector("#authForm");r==null||r.addEventListener("submit",n=>{n.preventDefault(),Bt()}),et()}},Bt=async()=>{const e=document.querySelector("#usernameInput").value,t=document.querySelector("#emailInput").value,o=document.querySelector("#passwordInput").value,r={username:e,password:o,email:t};if(!lt(t,o,e)){alert("Invalid input fields");return}const n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)};await p(l+"/user",n),M(!0)},$t=async()=>{var a;const e=document.querySelector("#emailInput").value,t=document.querySelector("#passwordInput").value,o={email:e,password:t};if(!lt(e,t,null)){alert("Invalid input fields");return}const r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)},n=await p(l+"/auth/login",r);localStorage.setItem("token",n.token),(a=document.querySelector("dialog"))==null||a.close(),dt()},lt=(e,t,o)=>!(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)||t.length<8||o!==null&&o.length<3&&o.length>40),Ot=e=>{const t=document.querySelector(".user-management-table-container");if(!t)return;const o=bt(e);t.innerHTML="",t.insertAdjacentHTML("beforeend",o)},Ft=e=>{const t=document.querySelector("dialog");if(!t)return;const o=Tt(e);t.innerHTML="",t.insertAdjacentHTML("beforeend",o)},jt=async(e,t)=>{const o=localStorage.getItem("token");if(!o)throw new Error("Token not found");const n=(await C(o)).user_id,a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:n,total_price:t})};let s;try{const d=await p(l+"/order",a);if(!d||!d.order_id)throw new Error("Failed to create order");s=d.order_id}catch(d){return console.error("Error creating order:",d.message),{error:"Failed to create order"}}e.forEach(async d=>{let c;const u=d.ordersHotdogsAmount;if(d.hotdog_id===null){const g=d.base_price;if(!g)throw new Error("hotdog.base_price is undefined");const h={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({hotdog_name:"Custom",base_price:g})};try{const y=await p(l+"/hotdog",h);if(!y||!y.hotdog_id)throw new Error("Failed to create hotdog");c=y.hotdog_id}catch(y){return console.error("Error creating hotdog:",y.message),{error:"Failed to create hotdog"}}}else c=d.hotdog_id;const f={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({order_id:s,hotdog_id:c,amount:u})};try{if(!await p(l+"/order/orderHotdogs",f))throw new Error("Failed to create orderHotdogs");d.hotdog_id!==null&&s&&nt(s)}catch(g){return console.error("Error creating orderHotdogs:",g.message),{error:"Failed to create orderHotdogs"}}if(d.hotdog_id===null){const g={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({hotdog_id:c,topping_ids:d.toppings})};try{if(!await p(l+"/hotdog/hotdogToppings",g))throw new Error("Failed to create hotdogToppings");s&&nt(s)}catch(h){return console.error("Error creating hotdogToppings:",h.message),{error:"Failed to create hotdogToppings"}}}});const i=document.querySelector(".message");if(!i)return;i.style.display="flex";const m=wt("Kiitos tilauksestasi!");i.innerHTML="",i.insertAdjacentHTML("beforeend",m),It()},nt=async e=>{let t=0;try{const o=await p(l+"/order/orderTotalPrice/"+e);if(!o)throw new Error("Failed to get order");o.forEach(n=>{n.hotdog_name==="Custom"?t+=parseFloat(n.total_topping_price):t+=parseFloat(n.hotdog_base_price)});const r={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({total_price:t,order_id:e})};try{if(!await p(l+"/order/orderTotalPrice",r))throw new Error("Failed to PUT ordersTotalPrice")}catch(n){return console.error("Error creating ordersTotalPrice:",n.message),{error:"Failed to create ordersTotalPrice"}}}catch(o){return console.error("Error creating order:",o.message),{error:"Failed to create order"}}},Pt=async()=>{const e=document.querySelector("#usernameInput").value,t=document.querySelector("#passwordInput").value,o=document.querySelector("dialog"),r=localStorage.getItem("token");if(!r||!o)return;const n={username:e,password:t},a={method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+r},body:JSON.stringify(n)},s=await C(r);await p(l+"/user/"+s.user_id,a);const i=await p(l+"/order/getMyOrders/"+s.user_id),m=R(s,i);o.innerHTML="",o.insertAdjacentHTML("beforeend",m),O(),V(),J(),U(),K(),z(),W()},W=()=>{const e=localStorage.getItem("theme"),t=document.querySelector("#checkbox");e==="dark"&&(document.body.classList.add("dark"),t&&(t.checked=!0))};dt();W();const ut=async(e,t={})=>{const o=await fetch(e,t);if(!o.ok)throw new Error(`Error ${o.status} occured`);return await o.json()};let b=[];const Dt=async()=>{try{const e=await ut(l+"/ingridients"),t={};e.forEach(o=>{t[o.topping_type]||(t[o.topping_type]=[]),t[o.topping_type].push(o)}),Object.keys(t).forEach(o=>{const r=document.querySelector(`.${o}-container`);if(r){const n=document.createElement("h3");n.textContent=`Valitse ${o}`,r.appendChild(n),t[o].forEach(s=>{const i=`
          <div class="checkbox-container custom-checkbox">
          <input type="Checkbox" class="productChekcbox" id="Topping-${s.topping_id}" />
          <span style="margin-right: 10px;"></span> 
          <label for="Topping-${s.topping_id}">${s.topping_name}</label>
          <span class="price">${s.topping_price}€</span>
      </div>
            `;r.insertAdjacentHTML("beforeend",i)});const a=r.querySelectorAll(".productChekcbox");a.forEach(s=>{s.addEventListener("change",i=>{var y,Y,Q;const m=i.target,d=m.id.split("-")[1],c=parseInt(d,10),u=(Y=(y=m.nextElementSibling)==null?void 0:y.nextElementSibling)==null?void 0:Y.nextElementSibling,f=(Q=u==null?void 0:u.previousElementSibling)==null?void 0:Q.textContent,g=parseFloat((u==null?void 0:u.textContent)||"0");m.checked?b.push({topping_name:typeof f=="string"?f:void 0,topping_price:g,topping_id:c}):b=b.filter(F=>F.topping_id!==c);let h=0;Object.values(b).forEach(F=>{h+=F.topping_price;const G=document.querySelector(".total");G&&(console.log(h),G.textContent=`Total Sum: ${h.toFixed(2)}`);const tt=document.querySelector(".add-custom-to-cart-btn");tt&&tt.addEventListener("click",()=>{a.forEach(yt=>{yt.checked=!1,b=[],document.querySelectorAll(".custom-container").forEach(I=>{window.getComputedStyle(I).display==="block"&&(I.style.display="none"),I.classList.contains("sämpylä-container")&&(I.style.display="block"),Jt()})})})})})})}})}catch(e){console.log(e)}},Nt=async()=>{try{const e=await ut(l+"/menu"),t=document.querySelector(".menu-container");t&&e.filter(r=>r.hotdog_name!=="Custom").forEach(async r=>{const n=await p(l+"/hotdog/hotdogToppings/"+r.hotdog_id);let a="";n?n.forEach((i,m)=>{m===n.length-1?a+=i.topping_name:a+=i.topping_name+", "}):a="Ei lisukkeita";const s=`
          <div class="menu-item-container">
            <h3 class="menu-food-title" id="Menu-${r.hotdog_id}">${r.hotdog_name}</h3>
            <p class = "menu-ingredients ">${a}</p>
            <p class="menu-price">${r.base_price}€</p>
            <a class='add-to-cart-btn'>Lisää koriin</a>
          </div>
        `;t.insertAdjacentHTML("beforeend",s)})}catch(e){console.error("Error fetching products:",e)}},_=document.querySelector(".burgermenu"),P=document.querySelector(".nav-menu");let v=[],T=[];_&&P&&(_.addEventListener("click",()=>{_.classList.toggle("active"),P.classList.toggle("active")}),document.querySelectorAll(".nav-link").forEach(e=>e.addEventListener("click",()=>{_.classList.remove("active"),P.classList.remove("active")})));const D=document.getElementById("checkbox");if(D){D.addEventListener("change",()=>{document.body.classList.toggle("dark")});const e=D.checked?"dark":"light";localStorage.setItem("theme",e)}const Rt=e=>{const t=e.getBoundingClientRect(),o=window.innerHeight||document.documentElement.clientHeight;return t.top<=o&&t.bottom>=0},mt=()=>{document.querySelectorAll("#menu .menu-item-container").forEach(t=>{Rt(t)&&t.classList.add("reveal")})};window.addEventListener("scroll",mt);window.addEventListener("load",mt);let k=0;const B=document.querySelectorAll(".custom-container"),Kt=document.querySelectorAll(".prev"),Ut=document.querySelectorAll(".next"),S=document.querySelectorAll("#nextText"),L=document.querySelectorAll("#prevText");let w="<- Kastike",E="Makkara ->";function X(e){B.forEach(t=>{t.style.display="none"}),B[e].style.display=""}X(k);S&&L&&(S.forEach(e=>{e.innerHTML=E}),L.forEach(e=>{e.innerHTML=w}));Kt.forEach(e=>{e==null||e.addEventListener("click",()=>{k--,k<0?(k=B.length-1,L&&S&&(S.forEach(t=>{t.innerHTML="Sämpylä ->"}),L.forEach(t=>{t.innerHTML="<- Täyte"}))):pt(k),X(k)})});Ut.forEach(e=>{e==null||e.addEventListener("click",()=>{k++,k>=B.length?(L&&S&&(S.forEach(t=>{t.innerHTML="Makkara ->"}),L.forEach(t=>{t.innerHTML="<- Kastike"})),k=0):pt(k),X(k)})});const pt=e=>{if(L&&S)switch(console.log(e),e){case 0:w="<- Kastike",E="Makkara ->";break;case 1:w="<- Sämpylä",E="Täyte ->";break;case 2:w="<- Makkara",E="Kastike ->";break;case 3:w="<- Täyte",E="Sämpylä ->";break}S.forEach(t=>{t.innerHTML=E}),L.forEach(t=>{t.innerHTML=w})};Nt();Dt();const at=document.querySelector("#cart-icon"),H=document.querySelector(".cart"),st=document.querySelector("#cart-close");at&&H&&st&&(at.addEventListener("click",()=>{H&&H.classList.add("active")}),st.addEventListener("click",()=>{H&&H.classList.remove("active")}));const Vt=()=>{if(!localStorage.getItem("token"))throw new Error("Token not found");if(v.length>0){console.log(v),v.forEach(o=>{o.hotdog_id&&o.hotdog_id>=1e3&&(o.hotdog_id=null)}),jt(v,100);const t=document.querySelector(".cart-content");if(!t)return;v=[],T=[],t.innerHTML="",$(),A()}},gt=e=>{const t=e.target;if(t.parentElement){const o=t.getAttribute("data-hotdog-index");if(!o)return;const r=parseInt(o);document.querySelectorAll("[data-hotdog-index]").forEach(a=>{const s=a.getAttribute("data-hotdog-index");if(!s)return;const i=parseInt(s);i>r&&a.setAttribute("data-hotdog-index",(i-1).toString())}),t.parentElement.remove(),v.splice(r,1),console.log(v),A(),$()}},ft=e=>{const t=e.target;t.setAttribute("data-quantity",t.value);const o=t.getAttribute("data-quantity");let r=parseInt(o||"0",10);const n=t.dataset.id;v.forEach(a=>{a.hotdog_id===parseInt(n||"0",10)&&(a.ordersHotdogsAmount=r)}),A()},ht=async e=>{const t=e.target,o=t.closest(".menu-item-container");if(t.closest(".total-box")&&t.classList.contains("add-custom-to-cart-btn")){const n=Object.values(b).reduce((s,i)=>(s+=i.topping_price,s),0),a="Custom Hotdog";if(!n||!a)return;if(console.log("name",b[0].topping_name),n&&a){let s="";b.forEach((c,u)=>{u===b.length-1?s+=c.topping_name:s+=c.topping_name+", "});let i=1e3;T.length<1||(i=T[T.length-1]+1),T.push(i),it(a,n.toFixed(2)+"€, ",s,i),A();const m=b.map(c=>c.topping_id);console.log("customIngredients",b,"topping_ids",m),v.push({hotdog_id:i,ordersHotdogsAmount:1,base_price:1,toppings:m});const d=document.querySelector(".cart-count");d&&(d.classList.contains("pop-cart-count")===!1?d.classList.toggle("pop-cart-count"):$())}}if(o&&t.classList.contains("add-to-cart-btn")){const n=o.querySelector(".menu-food-title"),a=o.querySelector(".menu-price"),s=o.querySelector(".menu-ingredients");if(!n||!a||!s)return;const i=n.id.split("-")[1],m=parseInt(i,10),c=(await p(l+"/hotdog/"+i))[0].hotdog_id,u=await p(l+"/hotdog/hotdogToppings/"+i);let f="";if(u.forEach((g,h)=>{h===u.length-1?f+=g.topping_name:f+=g.topping_name+", "}),n&&a&&m&&s){const g=n.textContent||"",h=a.textContent||"";v.push({hotdog_id:c,ordersHotdogsAmount:1}),console.log(v),it(g,h,f,c);const y=document.querySelector(".cart-count");y&&(y.classList.contains("pop-cart-count")===!1?y.classList.toggle("pop-cart-count"):$()),A()}}};document.addEventListener("click",e=>{const t=e.target;t&&t.classList.contains("add-to-cart-btn")&&ht(e)});const it=(e,t,o,r)=>{const n=document.createElement("div");n.classList.add("cart-box");const a=document.querySelector(".cart-content");if(!a)return;const s=a.querySelectorAll(".cart-product-title");let i=0;console.log(i);for(let f=0;f<s.length;f++)if(console.log(s[f]),s[f].innerText==="Custom Hotdog")i++;else if(s[f].innerText===e)return;const m=v.length-1,d=`
  <div class="detail-box">
  <div class="cart-product-title">${e}</div>
  <div class="cart-product-price">${t}</div>
  <input type="number" class="cart-product-quantity" value="1" min="1" data-id="${r}">
  </div>

<div class="cart-product-ingredients">${o}</div>
<i class="fa-solid fa-trash cart-remove"  data-hotdog-index="${m}"></i>
`;n.innerHTML=d,a.appendChild(n);const c=n.querySelectorAll(".cart-remove"),u=n.querySelectorAll(".cart-product-quantity");c&&c.forEach(f=>{f.addEventListener("click",gt)}),u&&u.forEach(f=>{f.addEventListener("change",ft)})},A=()=>{const e=document.querySelector(".cart-content");if(!e)return;const t=e.querySelectorAll(".cart-box");let o=0;for(let n=0;n<t.length;n++){const a=t[n],s=a.querySelector(".cart-product-price"),i=a.querySelector(".cart-product-quantity");if(s&&i){const m=s.innerText.replace("€",""),d=parseFloat(m),c=parseFloat(i.value);o+=d*c}}const r=document.querySelector(".cart-total-price");r&&(r.textContent=o.toFixed(2)+"€")},Jt=()=>{const e=document.querySelector(".total");e&&(e.innerHTML="Total Sum: 0")},zt=document.querySelectorAll(".cart-remove");zt.forEach(e=>{e.addEventListener("click",gt)});const Zt=document.querySelectorAll(".add-to-cart-btn, .add-custom-to-cart-btn");Zt.forEach(e=>{e.addEventListener("click",ht)});const ct=document.querySelectorAll(".cart-checkout")[0];ct&&ct.addEventListener("click",Vt);const Wt=document.querySelectorAll(".cart-product-quantity");Wt.forEach(e=>{e.addEventListener("change",ft)});const $=()=>{console.log("count");const e=document.querySelector(".cart-count"),t=document.querySelector("#cartCount"),o=document.querySelector(".cart-content"),r=o==null?void 0:o.children.length;if(!r&&t&&e){e.classList.remove("pop-cart-count"),t.innerHTML="1";return}if(!(!e||!t))if(r===0){if(!e||!t)return;e.classList.remove("pop-cart-count"),t.innerHTML="1"}else{if(!t||!r)return;t.innerHTML=r.toString()}},N=[{name:"Hodaripuoti",address:"Messukeskus",city:"Helsinki",coords:{lat:60.20322568649935,lng:24.93696528041362},popupText:"<b>Hodaripuoti</b><br>Messukeskus , Helsinki<br>Parhaat hodarit tapahtumissa!"},{name:"Ravintola Hodaripuoti",address:"Helsingin katu 4",city:"Espoo",coords:{lat:60.187394224490475,lng:24.959375673402533},popupText:"<b>Hodaripuoti </b><br>Helsingin katu 4, Helsinki<br>Herkullisia annoksia!, avaamme pian!"}];let x;const Xt=()=>{x=new google.maps.Map(document.getElementById("map"),{center:{lat:60.1699,lng:24.9384},zoom:8}),N.forEach(t=>{const o=new google.maps.Marker({position:t.coords,map:x,title:t.name}),r=new google.maps.InfoWindow({content:t.popupText});o.addListener("click",()=>{r.open(x,o)})});const e=document.getElementById("location-select");N.forEach(t=>{const o=document.createElement("option");o.value=t.name,o.textContent=`${t.name} - ${t.address}, ${t.city}`,e.appendChild(o)}),e.addEventListener("change",()=>{var r;const t=e.value,o=(r=N.find(n=>n.name===t))==null?void 0:r.coords;o&&(x.setCenter(o),new google.maps.Marker({position:o,map:x}))})};Xt();
