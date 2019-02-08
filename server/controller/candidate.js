import Candidate from '../model/candidate';
import Response from '../utilities/response';
import modelParty from '../model/party';
import modelOffice from '../model/office';
import modelUser from '../model/user';
/**
   * @class Candidate Controller
   */
class CandidateController {
  /**
     * @function expressInterest
     * @req request object
     * @res response object
     * @returns {*} information about the political interest
     */
  static async expressInterest(req, res) {
    const { userId } = req.params;
    if (!(/^[\d]+$/.test(userId))) return Response.errorData(res, 400, 'invalid user id');
    const { officename, partyname } = req.body;
    const params = { officename, partyname, userId };
    if (!await modelUser.getUserById(userId)) return Response.errorData(res, 404, 'user not found');
    if (await Candidate.findCandidate(userId)) return Response.errorData(res, 400, 'you have expressed interest before');
    if (!await modelOffice.findName(officename)) return Response.errorData(res, 400, 'office name not found');
    if (!await modelParty.findName(partyname)) return Response.errorData(res, 400, 'party name not found');
    if (await Candidate.checkPartyName(partyname, userId)) return Response.errorData(res, 400, 'You cannot select more than one party');
    if (await Candidate.checkOfficeName(officename, userId)) return Response.errorData(res, 400, 'You cannot express interest in more than one office');
    const data = await Candidate.becomeCandidate(params);
    if (data) return Response.validData(res, 201, [data]);
    return Response.errorData(res, 500, 'Internal server error');
  }
}
export default CandidateController;
