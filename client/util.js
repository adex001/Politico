const getElementIdValue = value => document.getElementById(value).value;
const getElementId = id => document.getElementById(id);

const dangerAlertBox = (displayText, seconds) => {
  const modal = getElementId('modals');
  modal.innerHTML = displayText;
  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.display = 'none';
  }, seconds);
};

const confirmDialogBox = (text, event, callback) => {
  const modal = getElementId('confirm-dialog');
  const p2 = getElementId('confirm-p');
  const p3 = getElementId('confirm-c');
  modal.style.display = 'flex';
  p2.innerHTML = text;
  p3.onclick = () => {
    modal.style.display = 'none';
    callback(event);
    return true;
  };
  getElementId('confirm-b').onclick = () => {
    modal.style.display = 'none';
    return false;
  };
};
const successAlertBox = (displayText, seconds) => {
  const modal = getElementId('success-modals');
  modal.innerHTML = displayText;
  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.display = 'none';
  }, seconds);
};
const logout = () => {
  const logoutButton = document.getElementsByClassName('logout');
  Array.from(logoutButton).forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
      window.location.replace('../index.html');
    });
  });
};
const officeDOM = getElementId('office-list');
const allOfficesDom = (offices, loadMe) => {
  let li = `<li class="make-flex-row office-item">
  <span class="sn">s/n</span>
  <span class="off-name">Office Name</span>
  <span>Office Description</span>
  <span class="off-type">Office type</span>
  <span>Action</span>
  </li>`;
  const officeArray = offices.data;
  if (officeArray.length === 0) {
    officeDOM.innerHTML = '<p style="text-align:center; color:#B73E23">Offices Empty. Add a government office! </p>';
  } else {
    for (let i = 0; i < officeArray.length; i++) {
      const sn = i + 1;
      li += `<li class="make-flex-row office-item center-items">
      <span class="sn">${sn}</span>
      <span class="off-name">${officeArray[i].name}</span>
      <span>${officeArray[i].description}</span>
      <span class="off-type">${officeArray[i].type}</span>
      <span class="action">
        <a href="${baseAPI}/offices/${officeArray[i].officeid}"><button class="warning modify">modify</button></a>
        <a href="${baseAPI}/offices/${officeArray[i].officeid}"><button class="danger delete-office">delete</button></a>
      </span>
    </li>`;
    }
    officeDOM.innerHTML = li;
  }
  loadMe();
};
const partiesDOM = getElementId('party-list');
const allPartiesDom = (parties, callBack) => {
  let li = `<li class="make-flex-row party-item">
  <span class="sn">s/n</span>
  <span class="plogo">Party Logo</span>
  <span class="pname">Party Name</span>
  <span>Party Address</span>
  <span class="action">Action</span>
</li>`;
  const partiesArray = parties.data;
  if (partiesArray.length === 0) {
    partiesDOM.innerHTML = '<p style="text-align:center; color:#B73E23">Parties Empty. Add a political party! </p>';
  } else {
    for (let i = 0; i < partiesArray.length; i++) {
      const sn = i + 1;
      li += `<li class="make-flex-row office-item center-items">
    <span class="sn">${sn}</span>
    <span class="plogo">
      <img src="${partiesArray[i].logo}" alt="logo">
    </span>
    <span class="pname">${partiesArray[i].name}</span>
    <span class="paddress">${partiesArray[i].address}</span>
    <span class="action">
      <a href="${baseAPI}/parties/${partiesArray[i].partyid}"><button class="warning modify">modify</button></a>
      <a href="${baseAPI}/parties/${partiesArray[i].partyid}"><button class="danger delete-party">delete</button></a>
      </span>
  </li>`;
    }
    partiesDOM.innerHTML = li;
  }
  callBack();
};
