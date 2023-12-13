(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();const l="https://hodaripuoti.northeurope.cloudapp.azure.com/api",lt=o=>{let t=`
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
        `;return o.forEach(e=>{const{user_id:r,username:n,email:a,role:s,points:i}=e;t+=`
              <tr>
                <td><p>${r}</p></td>
                <td><p>${n}</p></td>
                <td><p>${a}</p></td>
                <td><p>${i}</p></td>
                <td><p>${s}</p></td>
              </tr>
              `}),t+="</table></div>",t},ut=o=>{const t=document.querySelector(".user-management-table-container");t&&(t.innerHTML="");let e=`
            <table>
            <tr class="sticky-row">
                <th>ID</th>
                <th>Käyttäjänimi</th>
                <th>Sähköposti</th>
                <th>Pisteet</th>
                <th>Rooli</th>
            </tr>
        `;return o.forEach(r=>{const{user_id:n,username:a,email:s,role:i,points:u}=r;e+=`
              <tr>
                <td><p>${n}</p></td>
                <td><p>${a}</p></td>
                <td><p>${s}</p></td>
                <td><p>${u}</p></td>
                <td><p>${i}</p><div class="dropdown-here"></div></td>
              </tr>
              `}),e+="</table></div>",e},pt=o=>{let t=`
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
        `;return o.forEach(e=>{const{order_id:r,status:n,order_date:a,total_price:s,user_id:i}=e,p=new Date(a).toLocaleString("fi-FI",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit",year:"numeric"});let c,d;switch(n){case 0:c="Vastaanotettu",d="recieved";break;case 1:c="Työn alla",d="in-progress";break;case 2:c="Valmis",d="completed";break;case 3:c="Noudettu",d="picked-up";break;default:c="Kelpuuton",d="unvalid"}t+=`
              <tr>
                <td><p>${r}</p></td>
                <td><p>${i}</p></td>
                <td><p>${s}€</p></td>
                <td><p>${p}</p></td>
                <td><div class="status-container status-container-${d}"><p>${c}: ${n}</p></div></td>
                <td>
                  <div class="actions-container">
                  <div class="status-container-recieved action-btn viewActionBtn" data-order-id="${e.order_id}" data-order-status="${e.status}">
                  <i class="fa-regular fa-eye"></i>
                </div>
                ${n!==3?`
                <div class="status-container-completed action-btn checkActionBtn" data-order-id="${e.order_id}" data-order-status="${e.status}">
                  <i class="fa-solid fa-check"></i>
                </div>`:""}
                  </div>
                </td>
              </tr>
              `}),t+="</table></div>",t},mt=()=>`
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
    </div> `,gt=()=>`
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
  </div> `,I=o=>`
  <div class="confirm-modal-container">
    <div class="forms-top-container">
      <h2>${o}</h2>
    </div>
    <form method="dialog" id="confirmForm">
      <button class="form-button form-button-cancel" id="dialogCloseButton">Peru</button>
      <button class="form-button" id="confirmYesBtn">Kyllä</button>
    </form>
  </div> `,ft=o=>`
  <div class="confirm-modal-container">
    <div class="forms-top-container">
      <h2>${o}</h2>
    </div>
    <button class="form-button form-button-cancel" id="dialogCloseButton">Peru</button>
  </div> `,ht=o=>{const{order_id:t,order_date:e,status:r}=o[0],a=new Date(e).toLocaleString("fi-FI",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit",year:"numeric"});let s,i;switch(r){case 0:s="Vastaanotettu",i="recieved";break;case 1:s="Työn alla",i="in-progress";break;case 2:s="Valmis",i="completed";break;case 3:s="Noudettu",i="picked-up";break;default:s="Kelpuuton",i="unvalid"}return`
  <div class="order-review-container">
    <div class="order-review-top">
      <div class="order-id-container"><h2>${t}</h2></div>
    </div>
    <div class="order-review-bottom">
    <p>Tilattu: ${a}</p>
    <div class="status-container status-container-${i}"><p>${s}</p></div>
    </div>
  </div> `},W=(o,t)=>{let e=`
  <div class="dialog-profile-container">
    <div class="dialog-profile-main-container">
      <div class="dialog-profile-main">
      <div class="rotating-card">
        <div class="rotating-card-front profile-item-container">
          <h2 class="profile-username">Hei ${o.username}!</h2>
          <form method="dialog" id="updateForm">
            <input type="text" name="username" id="usernameInput" class="modal-input" autocomplete="name" placeholder="${o.username}" value="${o.username}" minlength="3" required></input><br>
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
      <button class="form-button" id="logOutButton">Kirjaudu ulos</button>
    </div>
  </div>
  <div class="dialog-profile-favourite profile-side profile-item-container">
    <div class="profile-favourite-top profile-top">
      <h3>Tilauksesi</h3>
    </div>
    <hr>
    <div class="profile-favourite-main"  id="favouriteMain">
      <table>`;return t?!Array.isArray(t)||t.length===0?(e+=`
        <tr>
                <td><p>No orders found</p></td>
              </tr></table></div></div></div>
        `,e):([...t].reverse().forEach(n=>{const{order_id:a,order_date:s,status:i}=n,p=new Date(s).toLocaleString("fi-FI",{day:"2-digit",month:"2-digit",year:"numeric"});let c,d;switch(i){case 0:c="Vastaanotettu",d="recieved";break;case 1:c="Työn alla",d="in-progress";break;case 2:c="Valmis",d="completed";break;case 3:c="Noudettu",d="picked-up";break;default:c="Kelpuuton",d="unvalid"}e+=`
              <tr class="profile-order-tr" data-order-id="${n.order_id}">
                <td><p>${a}</p></td>
                <td><p>${p}</p></td>
                <td><div class="status-container status-container-${d}"><p>${c}</p></div></td>
              </tr>
              `}),e+="</table></div></div>",e):""},vt=(o,t)=>{const{order_id:e,order_date:r,status:n,total_price:a,user_id:s}=o[0],u=new Date(r).toLocaleString("fi-FI",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit",year:"numeric"});let p,c;switch(n){case 0:p="Vastaanotettu",c="recieved";break;case 1:p="Työn alla",c="in-progress";break;case 2:p="Valmis",c="completed";break;case 3:p="Noudettu",c="picked-up";break;default:p="Kelpuuton",c="unvalid"}let d=`
  <div class="admin-orders-container">
    <div class="admin-orders-top-container">
      <div class="order-top-info-container" style="display:flex; flex-direction:column;">
        <h2>Tilaus numero: ${e}</h2>
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
    `}),d+=g+"</div></div>",d},yt=()=>{St()},bt=()=>{const o=document.querySelectorAll(".user-manage-nav-btn");o.length<=0||o.forEach(t=>{t.addEventListener("click",async()=>{document.querySelectorAll(".user-manage-active").forEach(a=>{a.classList.contains("user-manage-active")&&a.classList.remove("user-manage-active")}),t.classList.add("user-manage-active");let r="";switch(t.id){case"userManageAllWorkersBtn":r=l+"/user/workers";break;case"userManageSAdminBtn":r=l+"/user/role/2";break;case"userManageCounterBtn":r=l+"/user/role/1";break;case"userManageAllBtn":r=l+"/user";break}if(r===null)return;const n=await m(r);n?qt(n):Mt("No users found")})})},kt=o=>{const t=document.querySelectorAll(".order-info-button");t.length<=0||t.forEach(e=>{e.addEventListener("click",async()=>{let r="";if(e.classList.contains("order-info-btn-orders")?r=l+"/order":e.classList.contains("order-info-btn-in-progress")?r=l+"/order/getFilteredOrders/1":e.classList.contains("order-info-btn-completed")?r=l+"/order/getFilteredOrders/2":e.classList.contains("order-info-btn-recieved")?r=l+"/order/getFilteredOrders/0":e.classList.contains("order-info-btn-picked-up")?r=l+"/order/getFilteredOrders/3":r=null,r!==null){const n=await m(r);S(o,n)}})})},St=()=>{document.querySelectorAll("#profileButton").forEach(t=>{t.addEventListener("click",async()=>{const e=document.querySelector("dialog"),r=tt();if(e&&r!==null){const n=await A(r),a=await m(l+"/order/getMyOrders/"+n.user_id),s=W(n,a);e.innerHTML="",e.insertAdjacentHTML("beforeend",s),B(),Q(),G(),Y(),X(),e.showModal();return}E(!0)})})},B=()=>{const o=document.querySelector("dialog");if(!o)return;document.querySelectorAll("#dialogCloseButton").forEach(e=>{e.addEventListener("click",()=>{o.close()})})},X=()=>{const o=document.querySelector("#backButton");o&&o.addEventListener("click",()=>{const t=document.querySelector(".rotating-card");t!=null&&t.classList.contains("show-back")&&(t==null||t.classList.remove("show-back"))})},Y=()=>{const o=document.querySelectorAll(".profile-order-tr");!o||o.length<1||o.forEach(t=>{t.addEventListener("click",async()=>{const e=t.getAttribute("data-order-id"),r=document.querySelector(".rotating-card"),n=await m(l+"/order/orderHotdogs/"+e),a=ht(n),s=document.querySelector(".back-main-content");s&&(s.innerHTML="",s.insertAdjacentHTML("beforeend",a),(r==null?void 0:r.classList.contains("show-back"))===!1&&r.classList.add("show-back"))})})},Q=()=>{const o=document.querySelectorAll("#logOutButton"),t=document.querySelector("#adminSection");o.forEach(e=>{e.addEventListener("click",()=>{localStorage.removeItem("token"),E(!0),t&&(t.innerHTML="")})})},N=()=>{const o=document.querySelector("#changeFormToLoginBtn"),t=document.querySelector("#changeFormToRegisterBtn");o==null||o.addEventListener("click",()=>{E(!0)}),t==null||t.addEventListener("click",()=>{E(!1)});const e=document.querySelector("dialog");if(!e)return;document.querySelectorAll("#dialogCloseButton").forEach(n=>{n.addEventListener("click",()=>{e.close()})})},wt=()=>{const o=document.querySelector(".user-management-table-container");o==null||o.addEventListener("submit",async t=>{if(t.preventDefault(),t.target&&t.target.tagName==="FORM"){const e=t.target,r=e.id,n=parseInt(r.split("_")[1],10),a=e.querySelector("input"),s=parseInt(a.value,10);if(isNaN(s)||s<0||s>2)return alert("Invalid role");try{const u={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:n,role:s})};await m(l+"/user/updateRole",u)}catch{return}}})},R=async o=>{var e;const t=(e=o.currentTarget)==null?void 0:e.getAttribute("data-order-id");if(t!=null){const r=document.querySelector("dialog");if(!r)return;const n=await m(l+"/order/orderHotdogs/"+t),a=await m(l+"/order/hotdogsAndToppings/"+t);if(n.message||a.message)return;const s=vt(n,a);r.innerHTML="",r.insertAdjacentHTML("beforeend",s),r.showModal(),B()}},U=(o,t)=>{var i,u;const e=(i=t.currentTarget)==null?void 0:i.getAttribute("data-order-id"),r=e?parseInt(e,10):null,n=(u=t.currentTarget)==null?void 0:u.getAttribute("data-order-status"),a=n?parseInt(n,10):null,s=document.querySelector("dialog");if(s&&r!=null&&a!==null&&a!==void 0){let p="";switch(a){case 0:p=I(`Oletko varma haluavasi ottaa tilauksen <strong class="text-in-progress">${r} vastaan</strong>?`);break;case 1:p=I(`Oletko varma haluavasi merkata tilauksen <strong class="text-ready">${r} valmiiksi</strong>?`);break;case 2:p=I(`Oletko varma haluavasi merkata tilauksen <strong class="text-picked-up">${r} noudetuksi</strong>?`);break}s.innerHTML="",s.insertAdjacentHTML("beforeend",p);const c=document.querySelector("#confirmYesBtn");if(!c)return;c.addEventListener("click",async()=>{const d={status:a+1,order_id:r},g={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)};if(await m(l+"/order/changeOrderStatus",g),a===0){const f=await m(l+"/order/getFilteredOrders/1");S(o,f)}else if(a===1){const f=await m(l+"/order/getFilteredOrders/2");S(o,f)}else if(a===2){const f=await m(l+"/order/getFilteredOrders/3");S(o,f)}else S(o);s.close()}),s.showModal()}},G=()=>{const o=document.querySelector("#updateForm");o==null||o.addEventListener("submit",t=>{t.preventDefault(),_t()})};yt();const m=async(o,t={})=>{const e=await fetch(o,t);if(!e.ok)throw new Error(`Error ${e.status} occured`);try{return await e.json()}catch(r){throw new Error(`Error parsing JSON: ${r.message}`)}},tt=()=>{const o=localStorage.getItem("token");return o||null},et=async()=>{try{const o=tt();if(o!==null){const e=(await A(o)).role;if(e>0)S(e);else if(e===0){const r=document.querySelector("#adminSection");r&&(r.style.display="none")}}else{const t=document.querySelector("#adminSection");t&&(t.style.display="none")}}catch(o){console.error("Error:",o)}},A=async o=>{const t={headers:{Authorization:"Bearer "+o}};return await m(l+"/auth/me",t)},S=async(o,t)=>{const e=document.querySelector("#adminSection");if(!e)return;let r;t?r=t:r=await m(l+"/order");const n=pt(r);if(e.innerHTML="",e.insertAdjacentHTML("beforeend",n),kt(o),Lt(),o===2){const a=await m(l+"/user"),s=lt(a);e.insertAdjacentHTML("beforeend",s),bt(),wt()}document.querySelectorAll(".viewActionBtn").forEach(a=>{a.removeEventListener("click",R)}),document.querySelectorAll(".checkActionBtn").forEach(a=>{a.removeEventListener("click",s=>U(o,s))}),document.querySelectorAll(".viewActionBtn").forEach(a=>{a.addEventListener("click",R)}),document.querySelectorAll(".checkActionBtn").forEach(a=>{a.addEventListener("click",s=>U(o,s))}),e.style.display="block"},Lt=async()=>{var s,i,u,p,c;const o=await m(l+"/order/ordersCounts");if(o.length<1)return;const t=(s=document.querySelector(".order-info-btn-orders"))==null?void 0:s.querySelector(".order-amount"),e=(i=document.querySelector(".order-info-btn-recieved"))==null?void 0:i.querySelector(".order-amount"),r=(u=document.querySelector(".order-info-btn-completed"))==null?void 0:u.querySelector(".order-amount"),n=(p=document.querySelector(".order-info-btn-in-progress"))==null?void 0:p.querySelector(".order-amount"),a=(c=document.querySelector(".order-info-btn-picked-up"))==null?void 0:c.querySelector(".order-amount");!r||!n||!t||!e||!a||(r.innerHTML=o[0].completedCount,n.innerHTML=o[0].inProgressCount,t.innerHTML=o[0].totalOrders,e.innerHTML=o[0].recievedCount,a.innerHTML=o[0].pickedUpCount)},E=o=>{const t=document.querySelector("dialog");if(t)if(o===!0){const e=mt();t.innerHTML="",t.insertAdjacentHTML("beforeend",e);const r=document.querySelector("#authForm");r==null||r.addEventListener("submit",n=>{n.preventDefault(),Tt()}),N(),t==null||t.showModal()}else{const e=gt();t.innerHTML="",t.insertAdjacentHTML("beforeend",e);const r=document.querySelector("#authForm");r==null||r.addEventListener("submit",n=>{n.preventDefault(),Et()}),N()}},Et=async()=>{const o=document.querySelector("#usernameInput").value,t=document.querySelector("#emailInput").value,e=document.querySelector("#passwordInput").value,r={username:o,password:e,email:t};if(!ot(t,e,o)){alert("Invalid input fields");return}const n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)};await m(l+"/user",n),E(!0)},Tt=async()=>{var a;const o=document.querySelector("#emailInput").value,t=document.querySelector("#passwordInput").value,e={email:o,password:t};if(!ot(o,t,null)){alert("Invalid input fields");return}const r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)},n=await m(l+"/auth/login",r);localStorage.setItem("token",n.token),(a=document.querySelector("dialog"))==null||a.close(),et()},ot=(o,t,e)=>!(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)||t.length<8||e!==null&&e.length<3&&e.length>40),qt=o=>{const t=document.querySelector(".user-management-table-container");if(!t)return;const e=ut(o);t.innerHTML="",t.insertAdjacentHTML("beforeend",e)},Mt=o=>{const t=document.querySelector("dialog");if(!t)return;const e=ft(o);t.innerHTML="",t.insertAdjacentHTML("beforeend",e)},At=async(o,t)=>{const e=localStorage.getItem("token");if(!e)throw new Error("Token not found");const n=(await A(e)).user_id,a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:n,total_price:t})};let s;try{const i=await m(l+"/order",a);if(!i||!i.order_id)throw new Error("Failed to create order");s=i.order_id}catch(i){return console.error("Error creating order:",i.message),{error:"Failed to create order"}}o.forEach(async i=>{let u;const p=i.ordersHotdogsAmount;if(i.hotdog_id===null){const d=i.base_price;if(!d)throw new Error("hotdog.base_price is undefined");const g={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({hotdog_name:"Custom",base_price:d})};try{const f=await m(l+"/hotdog",g);if(!f||!f.hotdog_id)throw new Error("Failed to create hotdog");u=f.hotdog_id}catch(f){return console.error("Error creating hotdog:",f.message),{error:"Failed to create hotdog"}}}else u=i.hotdog_id;const c={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({order_id:s,hotdog_id:u,amount:p})};try{if(!await m(l+"/order/orderHotdogs",c))throw new Error("Failed to create orderHotdogs")}catch(d){return console.error("Error creating orderHotdogs:",d.message),{error:"Failed to create orderHotdogs"}}if(i.hotdog_id===null){const d={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({hotdog_id:u,topping_ids:i.toppings})};try{if(!await m(l+"/hotdog/hotdogToppings",d))throw new Error("Failed to create hotdogToppings");s&&It(s)}catch(g){return console.error("Error creating hotdogToppings:",g.message),{error:"Failed to create hotdogToppings"}}}})},It=async o=>{let t=0;try{const e=await m(l+"/order/orderTotalPrice/"+o);if(!e)throw new Error("Failed to get order");e.forEach(n=>{n.hotdog_name==="Custom"?t+=parseFloat(n.total_topping_price):t+=parseFloat(n.hotdog_base_price)});const r={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({total_price:t,order_id:o})};try{if(!await m(l+"/order/orderTotalPrice",r))throw new Error("Failed to PUT ordersTotalPrice")}catch(n){return console.error("Error creating ordersTotalPrice:",n.message),{error:"Failed to create ordersTotalPrice"}}}catch(e){return console.error("Error creating order:",e.message),{error:"Failed to create order"}}},_t=async()=>{const o=document.querySelector("#usernameInput").value,t=document.querySelector("#passwordInput").value,e=document.querySelector("dialog"),r=localStorage.getItem("token");if(!r||!e)return;const n={username:o,password:t},a={method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+r},body:JSON.stringify(n)},s=await A(r);await m(l+"/user/"+s.user_id,a);const i=await m(l+"/order/getMyOrders/"+s.user_id),u=W(s,i);e.innerHTML="",e.insertAdjacentHTML("beforeend",u),B(),Q(),G(),Y(),X()};et();const rt=async(o,t={})=>{const e=await fetch(o,t);if(!e.ok)throw new Error(`Error ${e.status} occured`);return await e.json()};let v=[];const Ct=async()=>{try{const o=await rt(l+"/ingridients"),t={};o.forEach(e=>{t[e.topping_type]||(t[e.topping_type]=[]),t[e.topping_type].push(e)}),Object.keys(t).forEach(e=>{const r=document.querySelector(`.${e}-container`);if(r){const n=document.createElement("h3");n.textContent=`Valitse ${e}`,r.appendChild(n),t[e].forEach(s=>{const i=`
          <div class="checkbox-container custom-checkbox">
          <input type="Checkbox" class="productChekcbox" id="Topping-${s.topping_id}" />
          <span style="margin-right: 10px;"></span> 
          <label for="Topping-${s.topping_id}">${s.topping_name}</label>
          <span class="price">${s.topping_price}€</span>
      </div>
            `;r.insertAdjacentHTML("beforeend",i)});const a=r.querySelectorAll(".productChekcbox");a.forEach(s=>{s.addEventListener("change",i=>{var O,F,j;const u=i.target,p=u.id.split("-")[1],c=parseInt(p,10),d=(F=(O=u.nextElementSibling)==null?void 0:O.nextElementSibling)==null?void 0:F.nextElementSibling,g=(j=d==null?void 0:d.previousElementSibling)==null?void 0:j.textContent,f=parseFloat((d==null?void 0:d.textContent)||"0");u.checked&&v.push({topping_name:typeof g=="string"?g:void 0,topping_price:f,topping_id:c});let b=0;Object.values(v).forEach(ct=>{b+=ct.topping_price;const P=document.querySelector(".total");P&&(console.log(b),P.textContent=`Total Sum: ${b.toFixed(2)}`);const D=document.querySelector(".add-custom-to-cart-btn");D&&D.addEventListener("click",()=>{a.forEach(dt=>{dt.checked=!1,v=[]})})})})})}})}catch(o){console.log(o)}},Ht=async()=>{try{const o=await rt(l+"/menu"),t=document.querySelector(".menu-container");t&&o.filter(r=>r.hotdog_name!=="Custom").forEach(async r=>{const n=await m(l+"/hotdog/hotdogToppings/"+r.hotdog_id);let a="";n?n.forEach((i,u)=>{u===n.length-1?a+=i.topping_name:a+=i.topping_name+", "}):a="Ei lisukkeita";const s=`
          <div class="menu-item-container">
            <h3 class="menu-food-title" id="Menu-${r.hotdog_id}">${r.hotdog_name}</h3>
            <p class = "menu-ingredients ">${a}</p>
            <p class="menu-price">${r.base_price}€</p>
            <a class='add-to-cart-btn'>Lisää koriin</a>
          </div>
        `;t.insertAdjacentHTML("beforeend",s)})}catch(o){console.error("Error fetching products:",o)}},q=document.querySelector(".burgermenu"),_=document.querySelector(".nav-menu");let h=[],k=[];q&&_&&(q.addEventListener("click",()=>{q.classList.toggle("active"),_.classList.toggle("active")}),document.querySelectorAll(".nav-link").forEach(o=>o.addEventListener("click",()=>{q.classList.remove("active"),_.classList.remove("active")})));const K=document.getElementById("checkbox");K&&K.addEventListener("change",()=>{document.body.classList.toggle("dark")});const $t=o=>{const t=o.getBoundingClientRect(),e=window.innerHeight||document.documentElement.clientHeight;return t.top<=e&&t.bottom>=0},nt=()=>{document.querySelectorAll("#menu .menu-item-container").forEach(t=>{$t(t)&&t.classList.add("reveal")})};window.addEventListener("scroll",nt);window.addEventListener("load",nt);let y=0;const M=document.querySelectorAll(".custom-container"),C=document.querySelector(".prev"),H=document.querySelector(".next");function x(o){M.forEach(t=>{t.style.display="none"}),M[o].style.display=""}x(y);C==null||C.addEventListener("click",()=>{y--,y<0&&(y=M.length-1),x(y)});H==null||H.addEventListener("click",()=>{y++,y>=M.length&&(y=0),x(y)});Ht();Ct();const V=document.querySelector("#cart-icon"),w=document.querySelector(".cart"),J=document.querySelector("#cart-close");V&&w&&J&&(V.addEventListener("click",()=>{w&&w.classList.add("active")}),J.addEventListener("click",()=>{w&&w.classList.remove("active")}));const Bt=()=>{if(!localStorage.getItem("token"))throw new Error("Token not found");if(h.length>0){console.log(h),h.forEach(e=>{e.hotdog_id&&e.hotdog_id>=1e3&&(e.hotdog_id=null)}),At(h,100);const t=document.querySelector(".cart-content");if(!t)return;h=[],k=[],t.innerHTML="",T()}},at=o=>{const t=o.target;if(t.parentElement){const e=t.getAttribute("data-hotdog-index");if(!e)return;const r=parseInt(e);document.querySelectorAll("[data-hotdog-index]").forEach(a=>{const s=a.getAttribute("data-hotdog-index");if(!s)return;const i=parseInt(s);i>r&&a.setAttribute("data-hotdog-index",(i-1).toString())}),t.parentElement.remove(),h.splice(r,1),console.log(h),T()}},st=o=>{const t=o.target;t.setAttribute("data-quantity",t.value);const e=t.getAttribute("data-quantity");let r=parseInt(e||"0",10);const n=t.dataset.id;h.forEach(a=>{a.hotdog_id===parseInt(n||"0",10)&&(a.ordersHotdogsAmount=r)}),T()},it=async o=>{const t=o.target,e=t.closest(".menu-item-container");if(t.closest(".total-box")){const n=Object.values(v).reduce((s,i)=>(s+=i.topping_price,s),0),a="Custom Hotdog";if(!n||!a)return;if(console.log("name",v[0].topping_name),n&&a){let s="";v.forEach((p,c)=>{c===v.length-1?s+=p.topping_name:s+=p.topping_name+", "});let i=1e3;k.length<1||(i=k[k.length-1]+1),k.push(i),z(a,n.toFixed(2)+"€, ",s,i),T();const u=v.map(p=>p.topping_id);console.log("customIngredients",v,"topping_ids",u),h.push({hotdog_id:i,ordersHotdogsAmount:1,base_price:1,toppings:u})}}if(e){const n=e.querySelector(".menu-food-title"),a=e.querySelector(".menu-price"),s=e.querySelector(".menu-ingredients");if(!n||!a||!s)return;const i=n.id.split("-")[1],u=parseInt(i,10),c=(await m(l+"/hotdog/"+i))[0].hotdog_id,d=await m(l+"/hotdog/hotdogToppings/"+i);let g="";if(d.forEach((f,b)=>{b===d.length-1?g+=f.topping_name:g+=f.topping_name+", "}),n&&a&&u&&s){const f=n.textContent||"",b=a.textContent||"";h.push({hotdog_id:c,ordersHotdogsAmount:1}),z(f,b,g,c),T()}}};document.addEventListener("click",o=>{const t=o.target;t&&t.classList.contains("add-to-cart-btn")&&it(o)});const z=(o,t,e,r)=>{const n=document.createElement("div");n.classList.add("cart-box");const a=document.querySelector(".cart-content");if(!a)return;const s=a.querySelectorAll(".cart-product-title");let i=0;console.log(i);for(let g=0;g<s.length;g++)if(console.log(s[g]),s[g].innerText==="Custom Hotdog")i++;else if(s[g].innerText===o)return;const u=h.length-1,p=`
  <div class="detail-box">
  <div class="cart-product-title">${o}</div>
  <div class="cart-product-price">${t}</div>
  <input type="number" class="cart-product-quantity" value="1" min="1" data-id="${r}">
  </div>

<div class="cart-product-ingredients">${e}</div>
<i class="fa-solid fa-trash cart-remove"  data-hotdog-index="${u}"></i>
`;n.innerHTML=p,a.appendChild(n);const c=n.querySelectorAll(".cart-remove"),d=n.querySelectorAll(".cart-product-quantity");c&&c.forEach(g=>{g.addEventListener("click",at)}),d&&d.forEach(g=>{g.addEventListener("change",st)})},T=()=>{const o=document.querySelector(".cart-content");if(!o)return;const t=o.querySelectorAll(".cart-box");let e=0;for(let n=0;n<t.length;n++){const a=t[n],s=a.querySelector(".cart-product-price"),i=a.querySelector(".cart-product-quantity");if(s&&i){const u=s.innerText.replace("€",""),p=parseFloat(u),c=parseFloat(i.value);e+=p*c}}const r=document.querySelector(".cart-total-price");r&&(r.textContent=e.toFixed(2)+"€")},xt=document.querySelectorAll(".cart-remove");xt.forEach(o=>{o.addEventListener("click",at)});const Ot=document.querySelectorAll(".add-to-cart-btn, .add-custom-to-cart-btn");Ot.forEach(o=>{o.addEventListener("click",it)});const Z=document.querySelectorAll(".cart-checkout")[0];Z&&Z.addEventListener("click",Bt);const Ft=document.querySelectorAll(".cart-product-quantity");Ft.forEach(o=>{o.addEventListener("change",st)});const $=[{name:"Hodaripuoti",address:"Messukeskus",city:"Helsinki",coords:{lat:60.20322568649935,lng:24.93696528041362},popupText:"<b>Hodaripuoti</b><br>Messukeskus , Helsinki<br>Parhaat hodarit tapahtumissa!"},{name:"Ravintola Hodaripuoti",address:"Helsingin katu 4",city:"Espoo",coords:{lat:60.187394224490475,lng:24.959375673402533},popupText:"<b>Hodaripuoti </b><br>Helsingin katu 4, Helsinki<br>Herkullisia annoksia!, avaamme pian!"}];let L;const jt=()=>{L=new google.maps.Map(document.getElementById("map"),{center:{lat:60.1699,lng:24.9384},zoom:8}),$.forEach(t=>{const e=new google.maps.Marker({position:t.coords,map:L,title:t.name}),r=new google.maps.InfoWindow({content:t.popupText});e.addListener("click",()=>{r.open(L,e)})});const o=document.getElementById("location-select");$.forEach(t=>{const e=document.createElement("option");e.value=t.name,e.textContent=`${t.name} - ${t.address}, ${t.city}`,o.appendChild(e)}),o.addEventListener("change",()=>{var r;const t=o.value,e=(r=$.find(n=>n.name===t))==null?void 0:r.coords;e&&(L.setCenter(e),new google.maps.Marker({position:e,map:L}))})};jt();
