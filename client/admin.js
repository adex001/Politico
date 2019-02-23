const officeNewButton = getElementId('office-create');
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
const newOffice = ((e) => {
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
});
allOffices();
officeNewButton.addEventListener('click', newOffice);
