import db from '../database/connection';
import modelParty from './party';
import modelOffice from './office';
/**
   * @class Candidate
   */
class Candidate {
/**
 * @function approveCandidate
 * @param {*} params
 * @returns {*} the candidate approved
 */
  static async becomeCandidate(params) {
    const bcomQuery = 'INSERT INTO candidate (officeid, partyid, userid) VALUES ($1, $2, $3) RETURNING *';
    const party = await modelParty.findName(params.partyname);
    const { partyid } = party;
    const office = await modelOffice.findName(params.officename);
    const { officeid } = office;
    const candidateObject = [officeid, partyid, params.userId];
    try {
      const result = await db.query(bcomQuery, candidateObject);
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
    const party = await modelParty.findName(partyname);
    const { partyid } = party;
    try {
      const result = await db.query(query, [partyid, userId]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  /**
 * @function checkOfficename
 * @param {*} officename
 * @param {*} userId
 * @returns {*} the candidate party name
 */
  static async checkOfficeName(officename, userId) {
    const query = 'SELECT officeid FROM candidate WHERE officeid = $1 AND userid = $2';
    const office = await modelOffice.findName(officename);
    const { officeid } = office;
    try {
      const result = await db.query(query, [officeid, userId]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }
}
export default Candidate;
