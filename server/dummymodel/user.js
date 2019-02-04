import user from './db';

class User {
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
