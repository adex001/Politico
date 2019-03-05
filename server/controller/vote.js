import voteModel from '../model/vote';
import Response from '../utilities/response';
import Candidate from '../model/candidate';
import modelOffice from '../model/office';

class VoteController {
  /**
 * @function vote
 * @param {*} req request object
 * @param {*} res response object
 * @returns {*} a vote to the candidate
 */
  static async vote(req, res) {
    const { officeid, candidateid } = req.body;
    const { userId } = req.decoded;
    const findOffice = await modelOffice.findOne(officeid);
    const findCandidate = await Candidate.findCandidate(candidateid);
    if (!findOffice) return Response.errorData(res, 404, 'Office not found');
    if (!findCandidate) return Response.errorData(res, 404, 'Candidate not found');
    if (parseInt(findCandidate.officeid, 10) !== parseInt(officeid, 10)) return Response.errorData(res, 400, 'Invalid office chosen for candidate');
    const checkIfVoted = await voteModel.checkVote(officeid, userId);
    if (checkIfVoted) return Response.errorData(res, 400, 'Candidate has been voted for previously');
    const params = { officeid, candidateid, userId };
    const data = await voteModel.castVote(params);
    if (!data) return Response.errorData(res, 500, 'internal server error');
    return Response.validData(res, 201, [data]);
  }

  /**
 * @function voteResult
 * @param {*} req request object
 * @param {*} res response object
 * @returns {*} a vote to the candidate
 */
  static async voteResult(req, res) {
    const { officeId } = req.params;
    const voteResult = await voteModel.checkResult(officeId);
    if (typeof voteResult === 'string') return Response.errorData(res, 404, 'office not found!');
    if (!voteResult) return Response.errorData(res, 500, 'internal server error');
    return Response.validData(res, 200, voteResult);
  }
}

export default VoteController;
