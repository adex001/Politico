import Candidate from '../model/candidate';
import Response from '../utilities/response';
/**
   * @class Candidate Controller
   */
class CandidateController {
  /**
     * @function approveCandidate
     * @req request object
     * @res response object
     * @returns {*} information about the political interest
     */
  static async expressInterest(req, res) {
    let { userId } = req.params;
    userId = Number(userId);
    const { officename, partyname } = req.body;
    const tokenUserId = req.decoded.userId;
    if (tokenUserId !== userId) return Response.errorData(res, 400, 'you cannot express interest for another user');
    const params = { officename, partyname, userId };
    if (await Candidate.checkPartyName(partyname, userId)) return Response.errorData(res, 400, 'You cannot select more than one party');
    if (await Candidate.checkOfficeName(officename, userId)) return Response.errorData(res, 400, 'You cannot express interest in more than one office');
    const data = await Candidate.becomeCandidate(params);
    if (data) {
      return Response.validData(res, 201, [data]);
    }
    return Response.errorData(res, 500, 'Internal server error');
  }
}
export default CandidateController;
