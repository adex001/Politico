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
    const { officeid, partyid } = req.body;
    const params = { officeid, partyid, userId };
    if (!await modelUser.getUserById(userId)) return Response.errorData(res, 404, 'user not found');
    if (await Candidate.findCandidate(userId)) return Response.errorData(res, 400, 'you have expressed interest before');
    if (!await modelOffice.findOne(officeid)) return Response.errorData(res, 400, 'office not found');
    if (!await modelParty.getOne(partyid)) return Response.errorData(res, 400, 'party not found');
    if (await Candidate.verifyOneCandiatePerParty(officeid, partyid)) return Response.errorData(res, 400, 'Party must have only one candidate per office!');
    const data = await Candidate.becomeCandidate(params);
    if (data) return Response.validData(res, 201, [data]);
    return Response.errorData(res, 500, 'Internal server error');
  }
}
export default CandidateController;
