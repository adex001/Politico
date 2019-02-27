const officeNewButton = getElementId('office-create');
const officeModifyButton = getElementId('office-modify');
const modifyOfficeModal = getElementId('modify-office-modal');
const baseAPI = 'https://politico2019.herokuapp.com/api/v1';

const allOffices = () => {
  fetch(`${baseAPI}/offices`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      token: localStorage.getItem('token'),
    },
  })
    .then(response => response.json())
    .then((resultObject) => {
      if (resultObject.status === 200) {
        allOfficesDom(resultObject, () => {
          modifyFunction();
          deleteOffice();
          logout();
        });
      } else {
        dangerAlertBox(resultObject.error, 3000);
      }
    });
};
const allParties = () => {
  fetch(`${baseAPI}/parties`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      token: localStorage.getItem('token'),
    },
  })
    .then(response => response.json())
    .then((resultObject) => {
      if (resultObject.status === 200) {
        allPartiesDom(resultObject, () => {
          logout();
          modifyFunction();
        });
      } else {
        dangerAlertBox(resultObject.error, 3000);
      }
    });
};
allOffices();
allParties();
const modifyFunction = () => {
  const modifyButton = document.getElementsByClassName('modify');
  Array.from(modifyButton).forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const url = e.target.parentElement.href;
      if (e.target.offsetParent.children[3].id === 'modify-party-modal') {
        const partyName = getElementId('m-party-name');
        const partyAddress = getElementId('m-party-address');
        const partyLogo = getElementId('m-party-logo');
        const resetParty = () => {
          partyName.value = '';
          partyAddress.value = '';
          partyLogo.value = '';
        };
        fetch(`${url}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            token: localStorage.getItem('token'),
          },
        })
          .then(response => response.json())
          .then((partyObject) => {
            if (partyObject.status === 200) {
              partyName.value = partyObject.data[0].name;
              partyAddress.value = partyObject.data[0].address;
              partyLogo.value = partyObject.data[0].logo;
              e.target.offsetParent.children[3].style.display = 'flex';
              getElementId('m-submit-party').onclick = () => {
                const partyData = {
                  name: partyName.value,
                  address: partyAddress.value,
                  logoUrl: partyLogo.value,
                };
                fetch(`${url}`, {
                  method: 'PATCH',
                  headers: {
                    Accept: 'application/json, text/plain, */*',
                    'content-type': 'application/json',
                    token: localStorage.getItem('token'),
                  },
                  body: JSON.stringify(partyData),
                })
                  .then(response => response.json())
                  .then((result) => {
                    if (result.status === 200) {
                      successAlertBox('Party was successfully modified', 4000);
                      getElementId('modify-party-modal').style.display = 'none';
                      resetParty();
                      allParties();
                    } else {
                      dangerAlertBox(result.error, 3000);
                      partyName.focus();
                    }
                  });
              };
              getElementId('m-clear-party').onclick = () => {
                resetParty();
              };
            } else {
              dangerAlertBox(partyObject.error, 3000);
            }
          });
      } else {
        const officeName = getElementId('m-office-name');
        const officeDesc = getElementId('m-office-desc');
        const officeType = getElementId('m-office-type');
        const resetOffice = () => {
          officeDesc.value = '';
          officeName.value = '';
        };
        fetch(`${url}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            token: localStorage.getItem('token'),
          },
        })
          .then(response => response.json())
          .then((resultObject) => {
            if (resultObject.status === 200) {
              officeDesc.value = resultObject.data[0].description;
              officeName.value = resultObject.data[0].name;
              officeType.value = resultObject.data[0].type;
              e.target.offsetParent.children[1].children[3].style.display = 'flex';
              officeModifyButton.addEventListener('click', (ev) => {
                ev.preventDefault();
                const officeObject = {
                  name: officeName.value,
                  description: officeDesc.value,
                  type: officeType.value,
                };
                fetch(`${url}`, {
                  method: 'PATCH',
                  headers: {
                    Accept: 'application/json, text/plain, */*',
                    'content-type': 'application/json',
                    token: localStorage.getItem('token'),
                  },
                  body: JSON.stringify(officeObject),
                })
                  .then(response => response.json())
                  .then((result) => {
                    if (result.status === 200) {
                      successAlertBox('Office was successfully modified', 4000);
                      modifyOfficeModal.style.display = 'none';
                      resetOffice();
                      allOffices();
                    } else {
                      dangerAlertBox(result.error, 3000);
                      officeName.focus();
                    }
                  });
              });
            } else {
              dangerAlertBox(resultObject.error, 3000);
            }
          });
      }
    });
  });
};

const newOffice = (e) => {
  e.preventDefault();
  const officeName = getElementId('c-office-name');
  const officeDesc = getElementId('c-office-desc');
  const officeType = getElementId('c-office-type');

  const resetOffice = () => {
    officeDesc.value = '';
    officeName.value = '';
    officeType.selectedIndex = 0;
  };
  if (!officeName.value) {
    dangerAlertBox('Enter an office name', 3000);
    return false;
  }
  if (!officeDesc.value) {
    dangerAlertBox('Enter an office description', 3000);
    return false;
  }
  if (officeType.selectedIndex === 0) {
    dangerAlertBox('select an office type', 3000);
    return false;
  }
  const officeObject = {
    name: officeName.value,
    description: officeDesc.value,
    type: officeType.value,
  };
  fetch(`${baseAPI}/offices`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      token: localStorage.getItem('token'),
      'content-type': 'application/json',
    },
    body: JSON.stringify(officeObject),
  })
    .then(response => response.json())
    .then((resultObject) => {
      if (resultObject.status === 201) {
        newOfficeModal.style.display = 'flex';
        successAlertBox('Office successfully created', 4000);
        newOfficeModal.style.display = 'none';
        resetOffice();
        allOffices();
      } else {
        dangerAlertBox(resultObject.error, 3000);
      }
    });
};
const success = (e) => {
  const url = e.target.parentElement.href;
  fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      token: localStorage.getItem('token'),
    },
  })
    .then(response => response.json())
    .then((result) => {
      if (result.status === 200) {
        successAlertBox('item deleted', 4000);
        allOffices();
      } else {
        dangerAlertBox(result.error, 4000);
      }
    });
};
const deleteButton = document.getElementsByClassName('delete-office');
const deleteOffice = () => {
  Array.from(deleteButton).forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      confirmDialogBox('Are you sure you want to delete this item?', e, success);
    });
  });
};
officeNewButton.addEventListener('click', newOffice);
