// const baseAPI = 'https://politico2019.herokuapp.com/api/v1';
const baseAPI = 'http://localhost:3000/api/v1';
let partiesSelect;
let officeSelect;

const loadParties = (where) => {
  partiesSelect = document.getElementById(where);
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
const loadOffice = (where) => {
  officeSelect = document.getElementById(where);
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
        officeSelect.onchange = loadParties('s-parties');
      } else {
        dangerAlertBox(resultObject.error, 3000);
      }
    });
};
const expressInterest = () => {
  loadParties('s-parties');
  loadOffice('s-office');
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
        } else {
          dangerAlertBox(result.error, 3000);
        }
      });
  });
};
const voteCandidate = () => {
  const officeSelect = getElementId('v-office');
  const partiesSelect = getElementId('v-parties');
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
        defaultOption.disabled = true;
        officeSelect.add(defaultOption);
        officeSelect.selectedIndex = 0;
        let option;
        for (let i = 0; i < resultObject.data.length; i++) {
          option = document.createElement('option');
          option.text = resultObject.data[i].name;
          option.value = resultObject.data[i].officeid;
          officeSelect.add(option);
        }
        officeSelect.onchange = () => {
          fetch(`${baseAPI}/office/${officeSelect.value}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'content-type': 'application/json',
              token: localStorage.getItem('token'),
            },
          })
            .then(response => response.json())
            .then((officePartyResult) => {
              if (officePartyResult.status === 200) {
                partiesSelect.length = 0;
                const defaultOption = document.createElement('option');
                defaultOption.text = 'Choose Party';
                defaultOption.disabled = true;
                partiesSelect.add(defaultOption);
                partiesSelect.selectedIndex = 0;
                let option;
                for (let i = 0; i < officePartyResult.data.length; i++) {
                  option = document.createElement('option');
                  option.text = `${officePartyResult.data[i].partyname}`;
                  option.value = officePartyResult.data[i].partyid;
                  partiesSelect.add(option);
                }
              } else {
                dangerAlertBox(officePartyResult.error, 3000);
                return false;
              }
            });
        };
        getElementId('v-parties').onchange = (e) => {
          fetch(`${baseAPI}/party/${partiesSelect.value}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'content-type': 'application/json',
              token: localStorage.getItem('token'),
            },
          })
            .then(response => response.json())
            .then((candidates) => {
              const candSelect = getElementId('v-candidates');
              if (candidates.status === 200) {
                candSelect.length = 0;
                const defaultOption = document.createElement('option');
                defaultOption.text = 'Choose Candidate';
                defaultOption.disabled = true;
                candSelect.add(defaultOption);
                candSelect.selectedIndex = 0;
                let option;
                for (let i = 0; i < candidates.data.length; i++) {
                  option = document.createElement('option');
                  option.text = `${candidates.data[i].lastname} ${candidates.data[i].firstname} `;
                  option.value = candidates.data[i].candidateid;
                  candSelect.add(option);
                }
                getElementId('v-vote').onclick = () => {
                  if (officeSelect.selectedIndex === 0) {
                    dangerAlertBox('Select an office', 3000);
                    return false;
                  }
                  if (partiesSelect.selectedIndex === 0) {
                    dangerAlertBox('Select a party', 3000);
                    return false;
                  }
                  if (candSelect.selectedIndex === 0) {
                    dangerAlertBox('Select party candidate', 3000);
                    return false;
                  }
                  const voteObject = {
                    candidateid: candSelect.value,
                    officeid: officeSelect.value,
                  };
                  fetch(`${baseAPI}/votes`, {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json, text/plain, */*',
                      'content-type': 'application/json',
                      token: localStorage.getItem('token'),
                    },
                    body: JSON.stringify(voteObject),
                  })
                    .then(response => response.json())
                    .then((voteResult) => {
                      if (voteResult.status === 201) {
                        successAlertBox('You have voted successfully!', 4000);
                      } else {
                        dangerAlertBox(voteResult.error, 4000);
                      }
                    });
                };
              } else {
                dangerAlertBox(candidates.error, 4000);
              }
            });
        };
      } else {
        dangerAlertBox(resultObject.error, 4000);
      }
    });
};
expressInterest();
voteCandidate();
