import modelPetition from '../model/petition';
import Response from '../utilities/response';
import modelOffice from '../model/office';

/**
 * @class PetitionController
 */
class PetitionController {
/**
 * @function newPetition
 * @param {*} req
 * @param {*} res
 * @returns {*} a new petition
 */
  static async newPetition(req, res) {
    const {
      officeid, text, evidence,
    } = req.body;
    const { userId } = req.decoded;
    const params = {
      officeid, userId, text, evidence,
    };
    const officeExists = await modelOffice.findOne(officeid);
    if (!officeExists) return Response.errorData(res, 400, 'invalid office');
    const data = await modelPetition.create(params);
    if (data) return Response.validData(res, 201, data);
    return Response.errorData(res, 500, 'internal server error!');
  }
}

export default PetitionController;
