import db from '../database/connection';

class User {
  static async create(params) {
    try {
      const {
        email, password, firstname, lastname,
      } = params;
      const userObject = [email, password, firstname, lastname];
      const userQuery = 'INSERT INTO users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await db.query(userQuery, userObject);
      return result.rows[0];
    } catch (error) {
      return false;
    }
  }

  static async find(email) {
    try {
      const findQuery = 'SELECT * FROM users WHERE email = $1';
      const result = await db.query(findQuery, [email]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }
}
export default User;
