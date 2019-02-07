/* eslint-disable no-restricted-globals */
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
  static async getAllParties(req, res) {
    const data = await modelParty.getAll();
    return Response.validData(res, 200, data);
  }
  /**
 * @function getSpecificParty
 * @param {*} req
 * @param {*} res
 * @returns {*} the specific party
 */

  static async getSpecificParty(req, res) {
    const { partyId } = req.params;
    if (!(/^[\d]+$/.test(partyId))) return Response.errorData(res, 400, 'invalid party id');
    const data = await modelParty.getOne(partyId);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 404, 'party not found');
  }
  /**
 * @function deleteParty
 * @param {*} req
 * @param {*} res
 * @returns {*} the deleted party
 */

  static async deleteParty(req, res) {
    const { partyId } = req.params;
    if (!(/^[\d]+$/.test(partyId))) return Response.errorData(res, 400, 'invalid party id');
    if (!await modelParty.getOne(partyId)) return Response.errorData(res, 404, 'party not found');
    const data = await modelParty.delete(partyId);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 500, 'internal server error!');
  }

  /**
 * @function createParty
 * @param {*} req
 * @param {*} res
 * @returns {*} the created party
 */
  static async createParty(req, res) {
    const { name, logoUrl, address } = req.body;
    const partyObject = { name: name.replace(/\s+/g, ' '), address: address.replace(/\s+/g, ' '), logoUrl };
    if (await modelParty.findName(name.replace(/\s+/g, ' '))) return Response.errorData(res, 400, 'Party name already exists!');
    const data = await modelParty.create(partyObject);
    if (data) return Response.validData(res, 201, [data]);
    return Response.errorData(res, 500, 'internal server error');
  }

  /**
 * @function modifyParty
 * @param {*} req
 * @param {*} res
 * @returns {*} the modified party
 */
  static async modifyParty(req, res) {
    const { name, logoUrl, address } = req.body;
    const { partyId } = req.params;
    if (!(/^[\d]+$/.test(partyId))) return Response.errorData(res, 400, 'invalid party id');
    if (!await modelParty.getOne(partyId)) return Response.errorData(res, 404, 'No such party');
    if (await modelParty.findName(name.replace(/\s+/g, ' '))) return Response.errorData(res, 400, 'Party name already exists!');
    const partyObject = { name: name.replace(/\s+/g, ' '), address: address.replace(/\s+/g, ' '), logoUrl };
    const data = await modelParty.modify(partyId, partyObject);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 500, 'Internal server error!');
  }
}
export default PartyController;
