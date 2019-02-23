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

const successAlertBox = (displayText, seconds) => {
  const modal = getElementId('success-modals');
  modal.innerHTML = displayText;
  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.display = 'none';
  }, seconds);
};
