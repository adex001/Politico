const baseAPI = 'https://politico2019.herokuapp.com/api/v1';

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
const viewParties = () => {
  fetch(`${baseAPI}/parties`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      token: localStorage.getItem('token'),
    },
  })
    .then(response => response.json())
    .then((result) => {
      const partiesDiv = getElementId('p-parties');
      if (result.status === 200) {
        if (result.data.length === 0) {
          partiesDiv.innerHTML = '<p style="text-align:center; color:#B73E23">Parties Empty. Check back later! </p>';
        } else {
          let li = `<li class="make-flex-row center-items pdisp make-bold">
          <span class="sn">s/n</span>
          <span class="plogo">Party Logo</span>
          <span class="pname">Party Name</span>
          <span class="paddress">Party Address</span>
        </li>`;
          for (let i = 0; i < result.data.length; i++) {
            const sn = i + 1;
            li += `<li class="make-flex-row center-items pdisp">
          <span class="sn">${sn}</span>
          <span class="plogo"><img src="${result.data[i].logo}" alt="logo"></span>
          <span class="pname">${result.data[i].name}</span>
          <span class="paddress">${result.data[i].address}</span>
        </li>`;
          }
          partiesDiv.innerHTML = li;
        }
      } else {
        dangerAlertBox(result.error, 3000);
      }
    });
};
const viewPoliticians = () => {
  const officeSelect = getElementId('office-c');
  const officeDisplay = getElementId('office-d');
  officeDisplay.style.display = 'none';
  fetch(`${baseAPI}/candidates`, {
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
          option.text = resultObject.data[i].officename;
          option.value = resultObject.data[i].officeid;
          officeSelect.add(option);
        }
      } else {
        dangerAlertBox(resultObject.error, 4000);
      }
    });
  officeSelect.onchange = () => {
    fetch(`${baseAPI}/candidates/${officeSelect.value}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'content-type': 'application/json',
        token: localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then((candidates) => {
        let li = `<li class="make-flex-row center-items pdisp make-bold">
        <span class="sn">s/n</span>
        <span class="plogo">Party Logo</span>
        <span class="pname">Party Name</span>
        <span class="cname">Candidate Name</span>
        <span class="office">Office</span>
      </li>`;
        if (candidates.status === 200) {
          for (let i = 0; i < candidates.data.length; i++) {
            const sn = i + 1;
            li += `<li class="make-flex-row center-items pdisp">
            <span class="sn">${sn}</span>
            <span class="plogo"><img src="${candidates.data[i].logo}" alt="logo"></span>
            <span class="pname">${candidates.data[i].partyname}</span>
            <span class="cname">${candidates.data[i].lastname} ${candidates.data[i].firstname}</span>
            <span class="office">${candidates.data[i].officename}</span>
          </li>`;
          }
          officeDisplay.innerHTML = li;
          officeDisplay.style.display = 'flex';
        } else {
          dangerAlertBox(candidates.error, 4000);
        }
      });
  };
};
const viewHistory = () => {
  fetch(`${baseAPI}/votes/history/${localStorage.getItem('userid')}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      token: localStorage.getItem('token'),
    },
  })
    .then(response => response.json())
    .then((history) => {
      const historyDisp = getElementId('v-history');
      if (history.status === 200) {
        if (history.data.length === 0) {
          historyDisp.innerHTML = '<p style="text-align:center; color:#B73E23">You have no votes history!! </p>';
        } else {
          let li = `<li class="make-flex-row make-flex-row center-items pdisp make-bold">
          <span class="sn">s/n</span>
          <span class="plogo">Party Logo</span>
          <span class="pname">Party Name</span>
          <span class="cname">Candidate Name</span>
          <span class="ocontest">Office Contested</span>
        </li>`;
          for (let i = 0; i < history.data.length; i++) {
            li += `<li class="make-flex-row make-flex-row center-items pdisp make-bold">
          <span class="sn">1</span>
          <span class="plogo"><img src="${history.data[i].partylogo}" alt="logo"></span>
          <span class="pname">${history.data[i].partyname}</span>
          <span class="cname">${history.data[i].lastname} ${history.data[i].firstname}</span>
          <span class="ocontest">${history.data[i].officename}</span>
        </li>`;
          }
          historyDisp.innerHTML = li;
        }
      } else {
        dangerAlertBox(history.error, 3000);
      }
    });
};
logout();
expressInterest();
voteCandidate();
viewParties();
viewPoliticians();
viewHistory();
