const officeNewButton = getElementId('office-create');
const officeModifyButton = getElementId('office-modify');
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
        allOfficesDom(resultObject);
      } else {
        dangerAlertBox(resultObject.error, 3000);
      }
    });
};

const modifyFunction = () => {
  const modifyButton = document.getElementsByClassName('modify');
  Array.from(modifyButton).forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.offsetParent.children[3].id === 'modify-party-modal') {
        e.target.offsetParent.children[3].style.display = 'flex';
      } else {
        const url = e.target.parentElement.href;
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
                      resetOffice();
                      allOffices();
                      e.target.offsetParent.children[1].children[3].style.display = 'none';
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
allOffices();
officeNewButton.addEventListener('click', newOffice);
modifyFunction();
