import db from '../database/connection';

class Vote {
  static async castVote(params) {
    const voteQuery = 'INSERT INTO vote (officeid, userid, candidateid) VALUES ($1, $2, $3) RETURNING *';
    try {
      const voteObject = [params.officeid, params.userId, params.candidateid];
      const result = await db.query(voteQuery, voteObject);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }

  static async checkVote(officeid, userId) {
    const checkQuery = 'SELECT * FROM vote WHERE officeid = $1 AND userid = $2';
    try {
      const result = await db.query(checkQuery, [officeid, userId]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }
}

export default Vote;
