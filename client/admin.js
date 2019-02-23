const officeNewButton = getElementId('office-create');
const baseAPI = 'https://politico2019.herokuapp.com/api/v1';

const newOffice = ((e) => {
  e.preventDefault();
  let officeName = getElementId('c-office-name');
  let officeDesc = getElementId('c-office-desc');
  let officeType = getElementId('c-office-type');

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
        officeDesc.value = '';
        officeName.value = '';
        officeType.selectedIndex = 0;
      } else {
        dangerAlertBox(resultObject.error, 3000);
        officeName.focus();
      }
    });
});

officeNewButton.addEventListener('click', newOffice);
