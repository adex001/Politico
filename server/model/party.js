import db from '../database/connection';
/**
 * @class Party
 */
class Party {
  /**
 * @function create
 * @param {*} params
 * @returns {*} the created party
 */
  static async create(params) {
    const createQuery = 'INSERT INTO party (name, address, logo) VALUES ($1, $2, $3) RETURNING *';
    const partyObject = [params.name, params.address, params.logo];
    try {
      const result = await db.query(createQuery, partyObject);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  static async modify(id, params) {
    const { name, address, logo } = params;
    const modifyQuery = 'UPDATE party SET name = $1, address = $2, logo = $3 WHERE partyid = $4 RETURNING *';
    try {
      const result = await db.query(modifyQuery, [name, address, logo, id]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  /**
 * @function findName
 * @param {*} name
 * @returns {*} the name of party
 */
  static async findName(name) {
    const findQuery = 'SELECT name FROM party WHERE name = $1';
    try {
      const result = await db.query(findQuery, [name]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }
}
export default Party;
