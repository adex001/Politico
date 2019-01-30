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
}

export default User;
