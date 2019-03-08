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

  /**
 * @function listPartyCandidates
 * @param {*} partyid
 * @returns {*} the candidates with party name
 */
  static async listPartyCandidates(partyid) {
    const query = 'SELECT lastname, firstname, candidateid FROM candidate INNER JOIN users ON users.userid = candidate.userid WHERE partyid = $1';
    try {
      const result = await db.query(query, [partyid]);
      return result.rows;
    } catch (err) {
      return false;
    }
  }

  /**
 * @function listPartyOffice
 * @param {*} officeid
 * @returns {*} the candidates with party name
 */
  static async listPartyOffice(officeid) {
    const query = 'SELECT name AS partyname, party.partyid FROM candidate INNER JOIN party ON party.partyid = candidate.partyid WHERE officeid = $1';
    try {
      const result = await db.query(query, [officeid]);
      return result.rows;
    } catch (err) {
      return false;
    }
  }

  /**
 * @function listPoliticiansFromOffice
 * @param {*} officeid
 * @returns {*} the candidates contesting that particular office
 */
  static async listPoliticiansFromOffice(officeid) {
    const query = 'SELECT users.lastname, users.firstname, party.name AS partyname, party.logo, office.name AS officename FROM candidate INNER JOIN users ON candidate.userid = users.userid INNER JOIN party on party.partyid = candidate.partyid INNER JOIN office ON office.officeid = candidate.officeid WHERE candidate.officeid = $1';
    try {
      const result = await db.query(query, [officeid]);
      return result.rows;
    } catch (err) {
      return false;
    }
  }

    /**
 * @function listPoliticiansFromOffice
 * @param {*} officeid
 * @returns {*} the candidates contesting that particular office
 */
  static async listOfficeFromCandidates() {
    const query = `SELECT candidate.officeid, name AS officename FROM candidate INNER JOIN office ON candidate.officeid = office.officeid GROUP BY candidate.officeid, name;
    `;
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (err) {
      return false;
    }
  }
}
export default Candidate;
