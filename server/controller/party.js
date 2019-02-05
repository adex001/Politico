/* eslint-disable no-restricted-globals */
import Party from '../dummymodel/party';
import modelParty from '../model/party';
import Response from '../utilities/response';

/**
 * @class partyController
 */
class PartyController {
  /**
 * @function getAllParties
 * @param {*} req
 * @param {*} res
 * @returns {*} all parties
 */
  static getAllParties(req, res) {
    const data = Party.getAll();
    return Response.validData(res, 200, data);
  }
  /**
 * @function getSpecificParty
 * @param {*} req
 * @param {*} res
 * @returns {*} the specific party
 */

  static getSpecificParty(req, res) {
    let { partyId } = req.params;
    partyId = Number(partyId);
    if (isNaN(partyId)) return Response.errorData(res, 400, 'invalid party id');
    const data = Party.getOne(partyId);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 404, 'party not found');
  }
  /**
 * @function deleteParty
 * @param {*} req
 * @param {*} res
 * @returns {*} the deleted party
 */

  static deleteParty(req, res) {
    let { partyId } = req.params;
    partyId = Number(partyId);
    if (isNaN(partyId)) return Response.errorData(res, 400, 'invalid party id');
    const data = Party.delete(partyId);
    if (data) return Response.validData(res, 200, data);
    return Response.errorData(res, 404, 'party not found');
  }

  /**
 * @function createParty
 * @param {*} req
 * @param {*} res
 * @returns {*} the created party
 */
  static async createParty(req, res) {
    const { name, logo, address } = req.body;
    const partyObject = { name, address, logo };
    if (await modelParty.findName(name)) return Response.errorData(res, 400, 'Party name already exists!');
    const data = await modelParty.create(partyObject);
    return Response.validData(res, 201, [data]);
  }

  /**
 * @function modifyParty
 * @param {*} req
 * @param {*} res
 * @returns {*} the modified party
 */
  static async modifyParty(req, res) {
    const { name, logo, address } = req.body;
    let { partyId } = req.params;
    partyId = Number(partyId);
    if (isNaN(partyId)) return Response.errorData(res, 400, 'invalid party id');
    const partyObject = { name, address, logo };
    const data = await modelParty.modify(partyId, partyObject);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 404, 'Update failed! party not found!');
  }
}
export default PartyController;
