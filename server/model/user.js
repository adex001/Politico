import db from '../database/connection';

class User {
  static async create(params) {
    try {
      const {
        email, password, firstname, lastname, isAdmin,
      } = params;
      const userObject = [email, password, firstname, lastname, isAdmin];
      const userQuery = 'INSERT INTO users (email, password, firstname, lastname, isadmin) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const result = await db.query(userQuery, userObject);
      return result.rows[0];
    } catch (error) {
      return false;
    }
  }

  static async getUser(email) {
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
