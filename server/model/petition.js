import db from '../database/connection';

/**
 * @class Petition
 */
class Petition {
  /**
 * @function create
 * @param {*} params
 * @returns {*} a new petition
 */
  static async create(params) {
    const {
      officeid, userId, text, evidence,
    } = params;
    const stringQuery = 'INSERT INTO petition (officeid, userid, text, evidence) VALUES ($1, $2, $3, $4) RETURNING *';
    const petitionArray = [officeid, userId, text, JSON.stringify(evidence)];
    try {
      const result = await db.query(stringQuery, petitionArray);
      return result.rows;
    } catch (err) {
      return false;
    }
  }
}
export default Petition;
