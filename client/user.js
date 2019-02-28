const baseAPI = 'https://politico2019.herokuapp.com/api/v1';

const expressInterest = () => {
  const partiesSelect = getElementId('s-parties');
  const officeSelect = getElementId('s-office');
  const loadParties = () => {
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
          partiesSelect.length = 0;
          const defaultOption = document.createElement('option');
          defaultOption.text = 'Choose Party';
          partiesSelect.add(defaultOption);
          partiesSelect.selectedIndex = 0;
          let option;
          console.log(resultObject);
          for (let i = 0; i < resultObject.data.length; i++) {
            option = document.createElement('option');
            option.text = resultObject.data[i].name;
            option.value = resultObject.data[i].partyid;
            partiesSelect.add(option);
          }
        } else {
          dangerAlertBox(resultObject.error, 3000);
        }
      });
  };
  const loadOffice = () => {
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
          officeSelect.length = 0;
          const defaultOption = document.createElement('option');
          defaultOption.text = 'select office';
          officeSelect.add(defaultOption);
          officeSelect.selectedIndex = 0;
          let option;
          for (let i = 0; i < resultObject.data.length; i++) {
            option = document.createElement('option');
            option.text = resultObject.data[i].name;
            option.value = resultObject.data[i].officeid;
            officeSelect.add(option);
          }
          officeSelect.onchange = loadParties();
        } else {
          dangerAlertBox(resultObject.error, 3000);
        }
      });
  };
  loadOffice();
  getElementId('express-interest').addEventListener('click', (e) => {
    e.preventDefault();
    if (partiesSelect.selectedIndex === 0) {
      dangerAlertBox('pick a valid party from the list', 4000);
      return false;
    }
    if (officeSelect.selectedIndex === 0) {
      dangerAlertBox('Select a valid office from the list', 4000);
      return false;
    }
    const expressObject = {
      officeid: officeSelect.value,
      partyid: partiesSelect.value,
    };
    fetch(`${baseAPI}/office/${localStorage.getItem('userid')}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        token: localStorage.getItem('token'),
        'content-type': 'application/json',
      },
      body: JSON.stringify(expressObject),
    })
      .then(response => response.json())
      .then((result) => {
        if (result.status === 201) {
          officeSelect.selectedIndex = 0;
          partiesSelect.selectedIndex = 0;
          successAlertBox('You have successfully expressed interest', 4000);
        }
        else {
          dangerAlertBox(result.error, 3000);
        }
      });
  });
};
expressInterest();
