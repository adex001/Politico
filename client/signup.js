const submitButton = getElementId('signup-button');
const baseAPI = 'https://politico2019.herokuapp.com/api/v1';

const signUp = ((e) => {
  e.preventDefault();
  const email = getElementIdValue('email');
  const firstname = getElementIdValue('firstname');
  const lastname = getElementIdValue('lastname');
  const password1 = getElementIdValue('p1');
  const password2 = getElementIdValue('p2');
  if (!email) {
    dangerAlertBox('Enter an email address', 4000);
    return false;
  }
  if (!firstname) {
    dangerAlertBox('Enter a valid firstname', 4000);
    return false;
  }
  if (!lastname) {
    dangerAlertBox('Enter a valid lastname', 4000);
    return false;
  }
  if (!password1) {
    dangerAlertBox('Enter password', 4000);
    return false;
  }
  if (!password2) {
    dangerAlertBox('Re-Enter password', 4000);
    return false;
  }
  if (password1 !== password2) {
    dangerAlertBox('Passwords does not match', 4000);
    return false;
  }
  const signupObject = {
    email,
    firstname,
    lastname,
    password: password1,
  };
  fetch(`${baseAPI}/auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify(signupObject),
  })
    .then(response => response.json())
    .then((resultObject) => {
      if (resultObject.status === 201) {
        localStorage.setItem('token', resultObject.data[0].token);
        window.location.replace('./dashboard.html');
      } else {
        dangerAlertBox(resultObject.error, 3000);
      }
    });
});

submitButton.addEventListener('click', signUp);
