import db from '../database/connection';
import modelParty from './party';
import modelOffice from './office';
/**
   * @class Candidate
   */
class Candidate {
/**
 * @function becomeCandidate
 * @param {*} params
 * @returns {*} the candidate approved
 */
  static async becomeCandidate(params) {
    const bcomQuery = 'INSERT INTO candidate (officeid, partyid, userid) VALUES ($1, $2, $3) RETURNING *';
    try {
      const { officeid, partyid } = params;
      const candidateObject = [officeid, partyid, params.userId];
      const result = await db.query(bcomQuery, candidateObject);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  /**
 * @function findCandidate
 * @param {*} id userid
 * @returns {*} the candidate found
 */
  static async findCandidate(id) {
    const findQuery = 'SELECT * FROM candidate WHERE candidateid = $1';
    try {
      const result = await db.query(findQuery, [id]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  /**
 * @function checkPartyName
 * @param {*} partyname
 * @returns {*} the candidate party name
 */
  static async checkPartyName(partyname, userId) {
    const query = 'SELECT partyid FROM candidate WHERE partyid = $1 AND userid = $2';
    try {
      const party = await modelParty.findName(partyname);
      const { partyid } = party;
      const result = await db.query(query, [partyid, userId]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  /**
 * @function verifyOneCandiatePerParty
 * @param {*} officename
 * @param {*} userId
 * @returns {*} the candidate office name
 */
  static async verifyOneCandiatePerParty(officeid, partyid) {
    const query = 'SELECT * FROM candidate WHERE officeid = $1 AND partyid = $2';
    try {
      const result = await db.query(query, [officeid, partyid]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }
}
export default Candidate;
