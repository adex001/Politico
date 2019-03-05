const loginButton = getElementId('login-button');
// const baseAPI = 'https://politico2019.herokuapp.com/api/v1';
const baseAPI = 'http://localhost:3000/api/v1';

const login = ((e) => {
  e.preventDefault();
  const email = getElementIdValue('email');
  let password = getElementIdValue('password');
  const emailTag = getElementId('email');
  const passwordTag = getElementId('password');

  if (!email) {
    dangerAlertBox('Enter an email address', 4000);
    emailTag.focus();
    return false;
  }
  if (!password) {
    dangerAlertBox('Enter password', 4000);
    passwordTag.focus();
    return false;
  }
  const loginObject = {
    email,
    password,
  };
  fetch(`${baseAPI}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify(loginObject),
  })
    .then(response => response.json())
    .then((resultObject) => {
      if (resultObject.status === 200) {
        localStorage.setItem('token', resultObject.data[0].token);
        localStorage.setItem('userid', resultObject.data[0].user.userId);
        if (resultObject.data[0].user.isAdmin) {
          window.location.replace('./admin-dashboard.html');
        } else {
          window.location.replace('./dashboard.html');
        }
      } else {
        dangerAlertBox(resultObject.error, 3000);
        emailTag.focus();
      }
    });
});
loginButton.addEventListener('click', login);
