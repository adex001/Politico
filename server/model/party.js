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
    const createQuery = 'INSERT INTO party (name, address, logo) VALUES ($1, $2, $3) RETURNING partyid, name, address, logo AS logoUrl';
    const partyObject = [params.name.trim(), params.address.trim(), params.logoUrl.trim()];
    try {
      const result = await db.query(createQuery, partyObject);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  /**
 * @function modify
 * @param {*} params
 * @returns {*} the created party
 */
  static async modify(id, params) {
    const { name, address, logoUrl } = params;
    const modifyQuery = 'UPDATE party SET name = $1, address = $2, logo = $3 WHERE partyid = $4 RETURNING partyid, name, address, logo AS logoUrl';
    try {
      const result = await db.query(modifyQuery, [name.trim(), address.trim(), logoUrl.trim(), id]);
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
    const findQuery = 'SELECT name, partyid FROM party WHERE name = $1';
    try {
      const result = await db.query(findQuery, [name.trim()]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  /**
 * @function getAll
 * @returns {*} retrieves all parties
 */
  static async getAll() {
    const allQuery = 'SELECT * FROM party';
    try {
      const result = await db.query(allQuery);
      return result.rows;
    } catch (err) {
      return false;
    }
  }

  /**
 * @function getOne
 *  * @param {*} id
 * @returns {*} retrieves a specific party
 */
  static async getOne(id) {
    const query = 'SELECT partyid, name, address, logo FROM party WHERE partyid = $1';
    try {
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  /**
 * @function delete
 *  * @param {*} id
 * @returns {*} deletes the specified party
 */
  static async delete(id) {
    const deleteQuery = 'DELETE FROM party WHERE partyid = $1 RETURNING *';
    try {
      const result = await db.query(deleteQuery, [id]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }
}
export default Party;
