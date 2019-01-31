import user from './db';

class User {
  static create(params) {
    const userObject = {
      userId: user.user.length + 1,
      email: params.email,
      password: params.password,
      firstname: params.firstname,
      lastname: params.lastname,
    };
    user.user.push(userObject);
    return user.user[user.user.length - 1];
  }

  static getUser(email) {
    const userObject = user.user;
    const searcher = search => search.email === email;
    const found = userObject.find(searcher);
    if (found) {
      return found;
    }
    return false;
  }
}

export default User;
