import db from '../database/connection';
/**
     * @class Vote
     */
class Vote {
  /**
 * @function castVote
 * @param {*} params embedded parameters
 * @returns {*} the vote data
 */
  static async castVote(params) {
    const voteQuery = 'INSERT INTO vote (officeid, userid, candidateid) VALUES ($1, $2, $3) RETURNING *';
    try {
      const voteObject = [params.officeid, params.userId, params.candidateid];
      const result = await db.query(voteQuery, voteObject);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  /**
 * @function checkVote
 * @param {*} officeid office id
 * @param {*} userId User Id
 * @returns {*} a matching correspondence
 */
  static async checkVote(officeid, userId) {
    const checkQuery = 'SELECT * FROM vote WHERE officeid = $1 AND userid = $2';
    try {
      const result = await db.query(checkQuery, [officeid, userId]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  /**
 * @function checkResult
 * @param {*} officeid office id
 * @returns {*} the the specified office votes
 */
  static async checkResult(officeid) {
    // Retrieve individual offices
    const resultQuery = 'SELECT officeid, candidateid, COUNT(candidateid) AS result FROM vote WHERE officeid = $1 GROUP BY candidateid, officeid';
    try {
      const result = await db.query(resultQuery, [officeid]);
      if (result.rowCount > 0) return result.rows;
      return 'no office found';
    } catch (err) {
      return false;
    }
  }
}

export default Vote;
