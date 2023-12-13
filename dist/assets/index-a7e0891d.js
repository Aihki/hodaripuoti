(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const l="https://hodaripuoti.northeurope.cloudapp.azure.com/api",ut=e=>{let t=`
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
              `}),t+="</table></div>",t},pt=e=>{const t=document.querySelector(".user-management-table-container");t&&(t.innerHTML="");let o=`
            <table>
            <tr class="sticky-row">
                <th>ID</th>
                <th>Käyttäjänimi</th>
                <th>Sähköposti</th>
                <th>Pisteet</th>
                <th>Rooli</th>
            </tr>
        `;return e.forEach(r=>{const{user_id:n,username:a,email:s,role:i,points:u}=r;o+=`
              <tr>
                <td><p>${n}</p></td>
                <td><p>${a}</p></td>
                <td><p>${s}</p></td>
                <td><p>${u}</p></td>
                <td><p>${i}</p><div class="dropdown-here"></div></td>
              </tr>
              `}),o+="</table></div>",o},mt=e=>{let t=`
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
                <th>Tilattu<i class="fa-solid fa-arrow-up-wide-short "></i></th>
                <th>Tila</th>
                <th>Toiminnot</th>
            </tr>
        `;return e.forEach(o=>{const{order_id:r,status:n,order_date:a,total_price:s,user_id:i}=o,p=new Date(a).toLocaleString("fi-FI",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit",year:"numeric"});let c,d;switch(n){case 0:c="Vastaanotettu",d="recieved";break;case 1:c="Työn alla",d="in-progress";break;case 2:c="Valmis",d="completed";break;case 3:c="Noudettu",d="picked-up";break;default:c="Kelpuuton",d="unvalid"}t+=`
              <tr>
                <td><p>${r}</p></td>
                <td><p>${i}</p></td>
                <td><p>${s}€</p></td>
                <td><p>${p}</p></td>
                <td><div class="status-container status-container-${d}"><p>${c}: ${n}</p></div></td>
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
              `}),t+="</table></div>",t},gt=()=>`
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
    </div> `,ft=()=>`
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
  </div> `,A=e=>`
  <div class="confirm-modal-container">
    <div class="forms-top-container">
      <h2>${e}</h2>
    </div>
    <form method="dialog" id="confirmForm">
      <button class="form-button form-button-cancel" id="dialogCloseButton">Peru</button>
      <button class="form-button" id="confirmYesBtn">Kyllä</button>
    </form>
  </div> `,ht=e=>`
  <div class="confirm-modal-container">
    <div class="forms-top-container">
      <h2>${e}</h2>
    </div>
    <button class="form-button form-button-cancel" id="dialogCloseButton">Peru</button>
  </div> `,vt=e=>{const{order_id:t,order_date:o,status:r}=e[0],a=new Date(o).toLocaleString("fi-FI",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit",year:"numeric"});let s,i;switch(r){case 0:s="Vastaanotettu",i="recieved";break;case 1:s="Työn alla",i="in-progress";break;case 2:s="Valmis",i="completed";break;case 3:s="Noudettu",i="picked-up";break;default:s="Kelpuuton",i="unvalid"}return`
  <div class="order-review-container">
    <div class="order-review-top">
      <div class="order-id-container"><h2>${t}</h2></div>
    </div>
    <div class="order-review-bottom">
    <p>Tilattu: ${a}</p>
    <div class="status-container status-container-${i}"><p>${s}</p></div>
    </div>
  </div> `},W=(e,t)=>{let o=`
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
        `,o):([...t].reverse().forEach(n=>{const{order_id:a,order_date:s,status:i}=n,p=new Date(s).toLocaleString("fi-FI",{day:"2-digit",month:"2-digit",year:"numeric"});let c,d;switch(i){case 0:c="Vastaanotettu",d="recieved";break;case 1:c="Työn alla",d="in-progress";break;case 2:c="Valmis",d="completed";break;case 3:c="Noudettu",d="picked-up";break;default:c="Kelpuuton",d="unvalid"}o+=`
              <tr class="profile-order-tr" data-order-id="${n.order_id}">
                <td><p>${a}</p></td>
                <td><p>${p}</p></td>
                <td><div class="status-container status-container-${d}"><p>${c}</p></div></td>
              </tr>
              `}),o+="</table></div></div>",o):""},yt=(e,t)=>{const{order_id:o,order_date:r,status:n,total_price:a,user_id:s}=e[0],u=new Date(r).toLocaleString("fi-FI",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit",year:"numeric"});let p,c;switch(n){case 0:p="Vastaanotettu",c="recieved";break;case 1:p="Työn alla",c="in-progress";break;case 2:p="Valmis",c="completed";break;case 3:p="Noudettu",c="picked-up";break;default:p="Kelpuuton",c="unvalid"}let d=`
  <div class="admin-orders-container">
    <div class="admin-orders-top-container">
      <div class="order-top-info-container" style="display:flex; flex-direction:column;">
        <h2>Tilaus numero: ${o}</h2>
        <p>Asiakas: ${s}, teki tilauksen: ${u}</p>
      </div>
      <div class="order-top-info-container" style="display:flex; flex-direction:column;">
        <div class="status-container status-container-${c}"><p>${p}: ${n}</p></div>
        <p style="padding: 5px;">Hinta: ${a}</p>
      </div>
      <button class="dialog-close-button" id="dialogCloseButton">X</button>
    </div>
    <div class="admin-orders-bottom-container">
  `,g="";return t.map(f=>{g+=`
      <div class="admin-hotdog-container">
        <h3>${f.hotdog_name}</h3>
        <p>${f.amount} kpl</p>
        <p>${f.toppings}</p>
      </div>
    `}),d+=g+"</div></div>",d},bt=()=>{wt()},kt=()=>{const e=document.querySelectorAll(".user-manage-nav-btn");e.length<=0||e.forEach(t=>{t.addEventListener("click",async()=>{document.querySelectorAll(".user-manage-active").forEach(a=>{a.classList.contains("user-manage-active")&&a.classList.remove("user-manage-active")}),t.classList.add("user-manage-active");let r="";switch(t.id){case"userManageAllWorkersBtn":r=l+"/user/workers";break;case"userManageSAdminBtn":r=l+"/user/role/2";break;case"userManageCounterBtn":r=l+"/user/role/1";break;case"userManageAllBtn":r=l+"/user";break}if(r===null)return;const n=await m(r);n?Mt(n):It("No users found")})})},St=e=>{const t=document.querySelectorAll(".order-info-button");t.length<=0||t.forEach(o=>{o.addEventListener("click",async()=>{let r="";if(o.classList.contains("order-info-btn-orders")?r=l+"/order":o.classList.contains("order-info-btn-in-progress")?r=l+"/order/getFilteredOrders/1":o.classList.contains("order-info-btn-completed")?r=l+"/order/getFilteredOrders/2":o.classList.contains("order-info-btn-recieved")?r=l+"/order/getFilteredOrders/0":o.classList.contains("order-info-btn-picked-up")?r=l+"/order/getFilteredOrders/3":r=null,r!==null){const n=await m(r);S(e,n)}})})},wt=()=>{document.querySelectorAll("#profileButton").forEach(t=>{t.addEventListener("click",async()=>{const o=document.querySelector("dialog"),r=et();if(o&&r!==null){const n=await I(r),a=await m(l+"/order/getMyOrders/"+n.user_id),s=W(n,a);o.innerHTML="",o.insertAdjacentHTML("beforeend",s),B(),Q(),G(),Y(),X(),tt(),o.showModal();return}E(!0)})})},B=()=>{const e=document.querySelector("dialog");if(!e)return;document.querySelectorAll("#dialogCloseButton").forEach(o=>{o.addEventListener("click",()=>{e.close()})})},X=()=>{const e=document.querySelector("#backButton");e&&e.addEventListener("click",()=>{const t=document.querySelector(".rotating-card");t!=null&&t.classList.contains("show-back")&&(t==null||t.classList.remove("show-back"))})},Y=()=>{const e=document.querySelectorAll(".profile-order-tr");!e||e.length<1||e.forEach(t=>{t.addEventListener("click",async()=>{const o=t.getAttribute("data-order-id"),r=document.querySelector(".rotating-card"),n=await m(l+"/order/orderHotdogs/"+o),a=vt(n),s=document.querySelector(".back-main-content");s&&(s.innerHTML="",s.insertAdjacentHTML("beforeend",a),(r==null?void 0:r.classList.contains("show-back"))===!1&&r.classList.add("show-back"))})})},Q=()=>{const e=document.querySelectorAll("#logOutButton"),t=document.querySelector("#adminSection");e.forEach(o=>{o.addEventListener("click",()=>{localStorage.removeItem("token"),E(!0),t&&(t.innerHTML="")})})},N=()=>{const e=document.querySelector("#changeFormToLoginBtn"),t=document.querySelector("#changeFormToRegisterBtn");e==null||e.addEventListener("click",()=>{E(!0)}),t==null||t.addEventListener("click",()=>{E(!1)});const o=document.querySelector("dialog");if(!o)return;document.querySelectorAll("#dialogCloseButton").forEach(n=>{n.addEventListener("click",()=>{o.close()})})},Lt=()=>{const e=document.querySelector(".user-management-table-container");e==null||e.addEventListener("submit",async t=>{if(t.preventDefault(),t.target&&t.target.tagName==="FORM"){const o=t.target,r=o.id,n=parseInt(r.split("_")[1],10),a=o.querySelector("input"),s=parseInt(a.value,10);if(isNaN(s)||s<0||s>2)return alert("Invalid role");try{const u={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:n,role:s})};await m(l+"/user/updateRole",u)}catch{return}}})},R=async e=>{var o;const t=(o=e.currentTarget)==null?void 0:o.getAttribute("data-order-id");if(t!=null){const r=document.querySelector("dialog");if(!r)return;const n=await m(l+"/order/orderHotdogs/"+t),a=await m(l+"/order/hotdogsAndToppings/"+t);if(n.message||a.message)return;const s=yt(n,a);r.innerHTML="",r.insertAdjacentHTML("beforeend",s),r.showModal(),B()}},U=(e,t)=>{var i,u;const o=(i=t.currentTarget)==null?void 0:i.getAttribute("data-order-id"),r=o?parseInt(o,10):null,n=(u=t.currentTarget)==null?void 0:u.getAttribute("data-order-status"),a=n?parseInt(n,10):null,s=document.querySelector("dialog");if(s&&r!=null&&a!==null&&a!==void 0){let p="";switch(a){case 0:p=A(`Oletko varma haluavasi ottaa tilauksen <strong class="text-in-progress">${r} vastaan</strong>?`);break;case 1:p=A(`Oletko varma haluavasi merkata tilauksen <strong class="text-ready">${r} valmiiksi</strong>?`);break;case 2:p=A(`Oletko varma haluavasi merkata tilauksen <strong class="text-picked-up">${r} noudetuksi</strong>?`);break}s.innerHTML="",s.insertAdjacentHTML("beforeend",p);const c=document.querySelector("#confirmYesBtn");if(!c)return;c.addEventListener("click",async()=>{const d={status:a+1,order_id:r},g={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)};if(await m(l+"/order/changeOrderStatus",g),a===0){const f=await m(l+"/order/getFilteredOrders/1");S(e,f)}else if(a===1){const f=await m(l+"/order/getFilteredOrders/2");S(e,f)}else if(a===2){const f=await m(l+"/order/getFilteredOrders/3");S(e,f)}else S(e);s.close()}),s.showModal()}},G=()=>{const e=document.querySelector("#updateForm");e==null||e.addEventListener("submit",t=>{t.preventDefault(),Ct()})},tt=()=>{const e=document.getElementById("checkbox");e&&e.addEventListener("change",()=>{document.body.classList.toggle("dark")})};bt();const m=async(e,t={})=>{const o=await fetch(e,t);if(!o.ok)throw new Error(`Error ${o.status} occured`);try{return await o.json()}catch(r){throw new Error(`Error parsing JSON: ${r.message}`)}},et=()=>{const e=localStorage.getItem("token");return e||null},ot=async()=>{try{const e=et();if(e!==null){const o=(await I(e)).role;if(o>0)S(o);else if(o===0){const r=document.querySelector("#adminSection");r&&(r.style.display="none")}}else{const t=document.querySelector("#adminSection");t&&(t.style.display="none")}}catch(e){console.error("Error:",e)}},I=async e=>{const t={headers:{Authorization:"Bearer "+e}};return await m(l+"/auth/me",t)},S=async(e,t)=>{const o=document.querySelector("#adminSection");if(!o)return;let r;t?r=t:r=await m(l+"/order");const n=mt(r);if(o.innerHTML="",o.insertAdjacentHTML("beforeend",n),St(e),Et(),e===2){const a=await m(l+"/user"),s=ut(a);o.insertAdjacentHTML("beforeend",s),kt(),Lt()}document.querySelectorAll(".viewActionBtn").forEach(a=>{a.removeEventListener("click",R)}),document.querySelectorAll(".checkActionBtn").forEach(a=>{a.removeEventListener("click",s=>U(e,s))}),document.querySelectorAll(".viewActionBtn").forEach(a=>{a.addEventListener("click",R)}),document.querySelectorAll(".checkActionBtn").forEach(a=>{a.addEventListener("click",s=>U(e,s))}),o.style.display="block"},Et=async()=>{var s,i,u,p,c;const e=await m(l+"/order/ordersCounts");if(e.length<1)return;const t=(s=document.querySelector(".order-info-btn-orders"))==null?void 0:s.querySelector(".order-amount"),o=(i=document.querySelector(".order-info-btn-recieved"))==null?void 0:i.querySelector(".order-amount"),r=(u=document.querySelector(".order-info-btn-completed"))==null?void 0:u.querySelector(".order-amount"),n=(p=document.querySelector(".order-info-btn-in-progress"))==null?void 0:p.querySelector(".order-amount"),a=(c=document.querySelector(".order-info-btn-picked-up"))==null?void 0:c.querySelector(".order-amount");!r||!n||!t||!o||!a||(r.innerHTML=e[0].completedCount,n.innerHTML=e[0].inProgressCount,t.innerHTML=e[0].totalOrders,o.innerHTML=e[0].recievedCount,a.innerHTML=e[0].pickedUpCount)},E=e=>{const t=document.querySelector("dialog");if(t)if(e===!0){const o=gt();t.innerHTML="",t.insertAdjacentHTML("beforeend",o);const r=document.querySelector("#authForm");r==null||r.addEventListener("submit",n=>{n.preventDefault(),qt()}),N(),t==null||t.showModal()}else{const o=ft();t.innerHTML="",t.insertAdjacentHTML("beforeend",o);const r=document.querySelector("#authForm");r==null||r.addEventListener("submit",n=>{n.preventDefault(),Tt()}),N()}},Tt=async()=>{const e=document.querySelector("#usernameInput").value,t=document.querySelector("#emailInput").value,o=document.querySelector("#passwordInput").value,r={username:e,password:o,email:t};if(!rt(t,o,e)){alert("Invalid input fields");return}const n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)};await m(l+"/user",n),E(!0)},qt=async()=>{var a;const e=document.querySelector("#emailInput").value,t=document.querySelector("#passwordInput").value,o={email:e,password:t};if(!rt(e,t,null)){alert("Invalid input fields");return}const r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)},n=await m(l+"/auth/login",r);localStorage.setItem("token",n.token),(a=document.querySelector("dialog"))==null||a.close(),ot()},rt=(e,t,o)=>!(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)||t.length<8||o!==null&&o.length<3&&o.length>40),Mt=e=>{const t=document.querySelector(".user-management-table-container");if(!t)return;const o=pt(e);t.innerHTML="",t.insertAdjacentHTML("beforeend",o)},It=e=>{const t=document.querySelector("dialog");if(!t)return;const o=ht(e);t.innerHTML="",t.insertAdjacentHTML("beforeend",o)},At=async(e,t)=>{const o=localStorage.getItem("token");if(!o)throw new Error("Token not found");const n=(await I(o)).user_id,a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:n,total_price:t})};let s;try{const i=await m(l+"/order",a);if(!i||!i.order_id)throw new Error("Failed to create order");s=i.order_id}catch(i){return console.error("Error creating order:",i.message),{error:"Failed to create order"}}e.forEach(async i=>{let u;const p=i.ordersHotdogsAmount;if(i.hotdog_id===null){const d=i.base_price;if(!d)throw new Error("hotdog.base_price is undefined");const g={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({hotdog_name:"Custom",base_price:d})};try{const f=await m(l+"/hotdog",g);if(!f||!f.hotdog_id)throw new Error("Failed to create hotdog");u=f.hotdog_id}catch(f){return console.error("Error creating hotdog:",f.message),{error:"Failed to create hotdog"}}}else u=i.hotdog_id;const c={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({order_id:s,hotdog_id:u,amount:p})};try{if(!await m(l+"/order/orderHotdogs",c))throw new Error("Failed to create orderHotdogs")}catch(d){return console.error("Error creating orderHotdogs:",d.message),{error:"Failed to create orderHotdogs"}}if(i.hotdog_id===null){const d={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({hotdog_id:u,topping_ids:i.toppings})};try{if(!await m(l+"/hotdog/hotdogToppings",d))throw new Error("Failed to create hotdogToppings");s&&_t(s)}catch(g){return console.error("Error creating hotdogToppings:",g.message),{error:"Failed to create hotdogToppings"}}}})},_t=async e=>{let t=0;try{const o=await m(l+"/order/orderTotalPrice/"+e);if(!o)throw new Error("Failed to get order");o.forEach(n=>{n.hotdog_name==="Custom"?t+=parseFloat(n.total_topping_price):t+=parseFloat(n.hotdog_base_price)});const r={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({total_price:t,order_id:e})};try{if(!await m(l+"/order/orderTotalPrice",r))throw new Error("Failed to PUT ordersTotalPrice")}catch(n){return console.error("Error creating ordersTotalPrice:",n.message),{error:"Failed to create ordersTotalPrice"}}}catch(o){return console.error("Error creating order:",o.message),{error:"Failed to create order"}}},Ct=async()=>{const e=document.querySelector("#usernameInput").value,t=document.querySelector("#passwordInput").value,o=document.querySelector("dialog"),r=localStorage.getItem("token");if(!r||!o)return;const n={username:e,password:t},a={method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+r},body:JSON.stringify(n)},s=await I(r);await m(l+"/user/"+s.user_id,a);const i=await m(l+"/order/getMyOrders/"+s.user_id),u=W(s,i);o.innerHTML="",o.insertAdjacentHTML("beforeend",u),B(),Q(),G(),Y(),X(),tt()};ot();const nt=async(e,t={})=>{const o=await fetch(e,t);if(!o.ok)throw new Error(`Error ${o.status} occured`);return await o.json()};let v=[];const Ht=async()=>{try{const e=await nt(l+"/ingridients"),t={};e.forEach(o=>{t[o.topping_type]||(t[o.topping_type]=[]),t[o.topping_type].push(o)}),Object.keys(t).forEach(o=>{const r=document.querySelector(`.${o}-container`);if(r){const n=document.createElement("h3");n.textContent=`Valitse ${o}`,r.appendChild(n),t[o].forEach(s=>{const i=`
          <div class="checkbox-container custom-checkbox">
          <input type="Checkbox" class="productChekcbox" id="Topping-${s.topping_id}" />
          <span style="margin-right: 10px;"></span> 
          <label for="Topping-${s.topping_id}">${s.topping_name}</label>
          <span class="price">${s.topping_price}€</span>
      </div>
            `;r.insertAdjacentHTML("beforeend",i)});const a=r.querySelectorAll(".productChekcbox");a.forEach(s=>{s.addEventListener("change",i=>{var O,F,j;const u=i.target,p=u.id.split("-")[1],c=parseInt(p,10),d=(F=(O=u.nextElementSibling)==null?void 0:O.nextElementSibling)==null?void 0:F.nextElementSibling,g=(j=d==null?void 0:d.previousElementSibling)==null?void 0:j.textContent,f=parseFloat((d==null?void 0:d.textContent)||"0");u.checked&&v.push({topping_name:typeof g=="string"?g:void 0,topping_price:f,topping_id:c});let b=0;Object.values(v).forEach(dt=>{b+=dt.topping_price;const D=document.querySelector(".total");D&&(console.log(b),D.textContent=`Total Sum: ${b.toFixed(2)}`);const P=document.querySelector(".add-custom-to-cart-btn");P&&P.addEventListener("click",()=>{a.forEach(lt=>{lt.checked=!1,v=[]})})})})})}})}catch(e){console.log(e)}},xt=async()=>{try{const e=await nt(l+"/menu"),t=document.querySelector(".menu-container");t&&e.filter(r=>r.hotdog_name!=="Custom").forEach(async r=>{const n=await m(l+"/hotdog/hotdogToppings/"+r.hotdog_id);let a="";n?n.forEach((i,u)=>{u===n.length-1?a+=i.topping_name:a+=i.topping_name+", "}):a="Ei lisukkeita";const s=`
          <div class="menu-item-container">
            <h3 class="menu-food-title" id="Menu-${r.hotdog_id}">${r.hotdog_name}</h3>
            <p class = "menu-ingredients ">${a}</p>
            <p class="menu-price">${r.base_price}€</p>
            <a class='add-to-cart-btn'>Lisää koriin</a>
          </div>
        `;t.insertAdjacentHTML("beforeend",s)})}catch(e){console.error("Error fetching products:",e)}},q=document.querySelector(".burgermenu"),_=document.querySelector(".nav-menu");let h=[],k=[];q&&_&&(q.addEventListener("click",()=>{q.classList.toggle("active"),_.classList.toggle("active")}),document.querySelectorAll(".nav-link").forEach(e=>e.addEventListener("click",()=>{q.classList.remove("active"),_.classList.remove("active")})));const K=document.getElementById("checkbox");K&&K.addEventListener("change",()=>{document.body.classList.toggle("dark")});const Bt=e=>{const t=e.getBoundingClientRect(),o=window.innerHeight||document.documentElement.clientHeight;return t.top<=o&&t.bottom>=0},at=()=>{document.querySelectorAll("#menu .menu-item-container").forEach(t=>{Bt(t)&&t.classList.add("reveal")})};window.addEventListener("scroll",at);window.addEventListener("load",at);let y=0;const M=document.querySelectorAll(".custom-container"),C=document.querySelector(".prev"),H=document.querySelector(".next");function $(e){M.forEach(t=>{t.style.display="none"}),M[e].style.display=""}$(y);C==null||C.addEventListener("click",()=>{y--,y<0&&(y=M.length-1),$(y)});H==null||H.addEventListener("click",()=>{y++,y>=M.length&&(y=0),$(y)});xt();Ht();const V=document.querySelector("#cart-icon"),w=document.querySelector(".cart"),J=document.querySelector("#cart-close");V&&w&&J&&(V.addEventListener("click",()=>{w&&w.classList.add("active")}),J.addEventListener("click",()=>{w&&w.classList.remove("active")}));const $t=()=>{if(!localStorage.getItem("token"))throw new Error("Token not found");if(h.length>0){console.log(h),h.forEach(o=>{o.hotdog_id&&o.hotdog_id>=1e3&&(o.hotdog_id=null)}),At(h,100);const t=document.querySelector(".cart-content");if(!t)return;h=[],k=[],t.innerHTML="",T()}},st=e=>{const t=e.target;if(t.parentElement){const o=t.getAttribute("data-hotdog-index");if(!o)return;const r=parseInt(o);document.querySelectorAll("[data-hotdog-index]").forEach(a=>{const s=a.getAttribute("data-hotdog-index");if(!s)return;const i=parseInt(s);i>r&&a.setAttribute("data-hotdog-index",(i-1).toString())}),t.parentElement.remove(),h.splice(r,1),console.log(h),T()}},it=e=>{const t=e.target;t.setAttribute("data-quantity",t.value);const o=t.getAttribute("data-quantity");let r=parseInt(o||"0",10);const n=t.dataset.id;h.forEach(a=>{a.hotdog_id===parseInt(n||"0",10)&&(a.ordersHotdogsAmount=r)}),T()},ct=async e=>{const t=e.target,o=t.closest(".menu-item-container");if(t.closest(".total-box")){const n=Object.values(v).reduce((s,i)=>(s+=i.topping_price,s),0),a="Custom Hotdog";if(!n||!a)return;if(console.log("name",v[0].topping_name),n&&a){let s="";v.forEach((p,c)=>{c===v.length-1?s+=p.topping_name:s+=p.topping_name+", "});let i=1e3;k.length<1||(i=k[k.length-1]+1),k.push(i),z(a,n.toFixed(2)+"€, ",s,i),T();const u=v.map(p=>p.topping_id);console.log("customIngredients",v,"topping_ids",u),h.push({hotdog_id:i,ordersHotdogsAmount:1,base_price:1,toppings:u})}}if(o){const n=o.querySelector(".menu-food-title"),a=o.querySelector(".menu-price"),s=o.querySelector(".menu-ingredients");if(!n||!a||!s)return;const i=n.id.split("-")[1],u=parseInt(i,10),c=(await m(l+"/hotdog/"+i))[0].hotdog_id,d=await m(l+"/hotdog/hotdogToppings/"+i);let g="";if(d.forEach((f,b)=>{b===d.length-1?g+=f.topping_name:g+=f.topping_name+", "}),n&&a&&u&&s){const f=n.textContent||"",b=a.textContent||"";h.push({hotdog_id:c,ordersHotdogsAmount:1}),z(f,b,g,c),T()}}};document.addEventListener("click",e=>{const t=e.target;t&&t.classList.contains("add-to-cart-btn")&&ct(e)});const z=(e,t,o,r)=>{const n=document.createElement("div");n.classList.add("cart-box");const a=document.querySelector(".cart-content");if(!a)return;const s=a.querySelectorAll(".cart-product-title");let i=0;console.log(i);for(let g=0;g<s.length;g++)if(console.log(s[g]),s[g].innerText==="Custom Hotdog")i++;else if(s[g].innerText===e)return;const u=h.length-1,p=`
  <div class="detail-box">
  <div class="cart-product-title">${e}</div>
  <div class="cart-product-price">${t}</div>
  <input type="number" class="cart-product-quantity" value="1" min="1" data-id="${r}">
  </div>

<div class="cart-product-ingredients">${o}</div>
<i class="fa-solid fa-trash cart-remove"  data-hotdog-index="${u}"></i>
`;n.innerHTML=p,a.appendChild(n);const c=n.querySelectorAll(".cart-remove"),d=n.querySelectorAll(".cart-product-quantity");c&&c.forEach(g=>{g.addEventListener("click",st)}),d&&d.forEach(g=>{g.addEventListener("change",it)})},T=()=>{const e=document.querySelector(".cart-content");if(!e)return;const t=e.querySelectorAll(".cart-box");let o=0;for(let n=0;n<t.length;n++){const a=t[n],s=a.querySelector(".cart-product-price"),i=a.querySelector(".cart-product-quantity");if(s&&i){const u=s.innerText.replace("€",""),p=parseFloat(u),c=parseFloat(i.value);o+=p*c}}const r=document.querySelector(".cart-total-price");r&&(r.textContent=o.toFixed(2)+"€")},Ot=document.querySelectorAll(".cart-remove");Ot.forEach(e=>{e.addEventListener("click",st)});const Ft=document.querySelectorAll(".add-to-cart-btn, .add-custom-to-cart-btn");Ft.forEach(e=>{e.addEventListener("click",ct)});const Z=document.querySelectorAll(".cart-checkout")[0];Z&&Z.addEventListener("click",$t);const jt=document.querySelectorAll(".cart-product-quantity");jt.forEach(e=>{e.addEventListener("change",it)});const x=[{name:"Hodaripuoti",address:"Messukeskus",city:"Helsinki",coords:{lat:60.20322568649935,lng:24.93696528041362},popupText:"<b>Hodaripuoti</b><br>Messukeskus , Helsinki<br>Parhaat hodarit tapahtumissa!"},{name:"Ravintola Hodaripuoti",address:"Helsingin katu 4",city:"Espoo",coords:{lat:60.187394224490475,lng:24.959375673402533},popupText:"<b>Hodaripuoti </b><br>Helsingin katu 4, Helsinki<br>Herkullisia annoksia!, avaamme pian!"}];let L;const Dt=()=>{L=new google.maps.Map(document.getElementById("map"),{center:{lat:60.1699,lng:24.9384},zoom:8}),x.forEach(t=>{const o=new google.maps.Marker({position:t.coords,map:L,title:t.name}),r=new google.maps.InfoWindow({content:t.popupText});o.addListener("click",()=>{r.open(L,o)})});const e=document.getElementById("location-select");x.forEach(t=>{const o=document.createElement("option");o.value=t.name,o.textContent=`${t.name} - ${t.address}, ${t.city}`,e.appendChild(o)}),e.addEventListener("change",()=>{var r;const t=e.value,o=(r=x.find(n=>n.name===t))==null?void 0:r.coords;o&&(L.setCenter(o),new google.maps.Marker({position:o,map:L}))})};Dt();
