/* eslint-disable no-restricted-globals */
import Party from '../dummymodel/party';
import Response from '../utilities/response';


class PartyController {
  static getAllParties(req, res) {
    const data = Party.getAll();
    return Response.validData(res, 200, data);
  }

  static getSpecificParty(req, res) {
    let { partyId } = req.params;
    partyId = Number(partyId);
    if (isNaN(partyId)) return Response.errorData(res, 400, 'invalid party id');
    const data = Party.getOne(partyId);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 404, 'party not found');
  }

  static deleteParty(req, res) {
    let { partyId } = req.params;
    partyId = Number(partyId);
    if (isNaN(partyId)) return Response.errorData(res, 400, 'invalid party id');
    const data = Party.delete(partyId);
    if (data) return Response.validData(res, 200, data);
    return Response.errorData(res, 404, 'party not found');
  }

  static createParty(req, res) {
    const { name, logo, address } = req.body;
    const partyObject = { name, address, logo };
    if (Party.findName(name)) return Response.errorData(res, 400, 'Party name already exists!');
    const data = Party.create(partyObject);
    return Response.validData(res, 201, data);
  }

  static modifyParty(req, res) {
    const { name, logo, address } = req.body;
    let { partyId } = req.params;
    partyId = Number(partyId);
    if (isNaN(partyId)) return Response.errorData(res, 400, 'invalid party id');
    const partyObject = { name, address, logo };
    const data = Party.modify(parseInt(partyId, 10), partyObject);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 404, 'Update failed! party not found!');
  }
}
export default PartyController;
