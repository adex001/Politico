/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
const asideNav = document.getElementById('aside-nav');
const hamb = document.getElementsByClassName('hamb')[0];
const officeDisp = document.getElementById('office-disp');
const partyDisp = document.getElementById('party-disp');
const voteDisp = document.getElementById('vote-disp');
const partiesDisp = document.getElementById('parties-disp');
const politicianDisp = document.getElementById('politician-disp');
const electionDisp = document.getElementById('election-disp');
const runDisp = document.getElementById('run-disp');
const historyDisp = document.getElementById('history-disp');
const petitionDisp = document.getElementById('petition-disp');
const partyLi = document.getElementById('party');
const historyLi = document.getElementById('history');

const disp = {
  party: partyDisp,
  office: officeDisp,
  vote: voteDisp,
  parties: partiesDisp,
  politician: politicianDisp,
  election: electionDisp,
  run: runDisp,
  history: historyDisp,
  petitions: petitionDisp,
};

let previous = null;
if (partyDisp) {
  partyDisp.style.display = 'block';
  partyLi.style.background = '#134611';
  partyLi.style.color = 'white';
  partyLi.style.fontWeight = 'bolder';
}
if (historyDisp) {
  historyDisp.style.display = 'block';
  historyLi.style.background = '#134611';
  historyLi.style.color = 'white';
  historyLi.style.fontWeight = 'bolder';
}
asideNav.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName === 'LI') {
    const clickNav = (item) => {
      // eslint-disable-next-line no-empty
      if (previous === item) {
      } else {
        if (partyDisp) {
          partyDisp.style.display = 'none';
          partyLi.style.background = '#4CB963';
          partyLi.style.fontWeight = 'normal';
        }
        if (historyDisp) {
          historyDisp.style.display = 'none';
          historyLi.style.background = '#4CB963';
          historyLi.style.fontWeight = 'normal';
        }
        if (previous) {
          disp[previous.id].style.display = 'none';
          previous.style.background = '#4CB963';
          previous.style.fontWeight = 'normal';
        }
        disp[item.id].style.display = 'block';
        item.style.background = '#134611';
        item.style.color = '#E0F2E9';
        item.style.fontWeight = 'bolder';
        previous = item;
      }
    };
    clickNav(e.target);
  }
});

const close = document.getElementsByClassName('close');
const newOfficeModal = document.getElementById('new-office-modal');
const newPartyModal = document.getElementById('new-party-modal');
const partyButton = document.getElementById('party-button');
const officeButton = document.getElementById('office-button');
const asideDisp = document.getElementById('aside');


if (partyButton || officeButton) {
  partyButton.onclick = () => {
    newPartyModal.style.display = 'flex';
  };
  officeButton.onclick = () => {
    newOfficeModal.style.display = 'flex';
  };
}

Array.from(close).forEach((element) => {
  element.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.style.display = 'none';
  });
});

hamb.addEventListener('mouseover', () => {
  asideDisp.style.display = 'block';
  asideDisp.style.transition = '0.7s';
  asideDisp.addEventListener('mouseleave', () => {
    asideDisp.style.display = 'none';
  });
});
const modifyButton = document.getElementsByClassName('modify');
Array.from(modifyButton).forEach((element) => {
  element.addEventListener('click', (e) => {
    if (e.target.offsetParent.children[3].id === 'modify-party-modal') {
      e.target.offsetParent.children[3].style.display = 'flex';
    } else {
      e.target.offsetParent.children[1].children[3].style.display = 'flex';
    }
  });
});
