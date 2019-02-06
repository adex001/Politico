import db from '../database/connection';

/**
 * @class Office
 */
class Office {
  /**
 * @function create
 * @param {*} params
 * @returns {*} the created office
 */
  static async create(params) {
    try {
      const officeObject = [params.type.trim(), params.name.trim(), params.description.trim()];
      const createQuery = 'INSERT INTO office (type, name, description) VALUES ($1, $2, $3) RETURNING *';
      const result = await db.query(createQuery, officeObject);
      const resultObject = {
        name: result.rows[0].name,
        type: result.rows[0].type,
        description: result.rows[0].description,
        timeRegistered: result.rows[0].office_creation.toLocaleString(),
      };
      return resultObject;
    } catch (error) {
      return false;
    }
  }

  /**
 * @function findName
 * @param {*} name
 * @returns {*} the found office name
 */
  static async findName(name) {
    try {
      const query = 'SELECT name, officeid FROM office WHERE name = $1';
      const result = await db.query(query, [name]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  /**
 * @function retrieveAll
 * @returns {*} all offices
 */
  static async retrieveAll() {
    const result = await db.query('SELECT name, type, description FROM office');
    return result.rows;
  }

  /**
 * @function findOne
 * @param {*} id
 * @returns {*} the found office
 */
  static async findOne(id) {
    const result = await db.query('SELECT officeid, name, type, description FROM office WHERE officeid = $1', [id]);
    return result.rows[0];
  }

  /**
 * @function modify
 * @param {*} id
 * @param {*} params
 * @returns {*} the office modified
 */
  static async modify(id, params) {
    try {
      const modifyObject = [params.name, params.type, params.description, id];
      const modifyQuery = 'UPDATE office SET name = $1, type = $2, description = $3 WHERE officeid = $4 RETURNING *';
      const result = await db.query(modifyQuery, modifyObject);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  /**
 * @function delete
 * @param {*} id
 * @returns {*} the office modified
 */
  static async delete(id) {
    const deleteQuery = 'DELETE FROM office WHERE officeid = $1 RETURNING *';
    try {
      const result = await db.query(deleteQuery, [id]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }
}
export default Office;
