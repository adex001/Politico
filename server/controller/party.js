import Party from '../dummymodel/party';


class PartyController {
  static getAllParties(req, res) {
    const data = Party.getAll();
    return res.json({
      status: 200,
      data,
    });
  }

  static getSpecificParty(req, res) {
    const { partyId } = req.params;
    const data = Party.getOne(parseInt(partyId, 10));
    if (data) {
      return res.json({
        status: 200,
        data: [data],
      });
    }
    return res.json({
      status: 404,
      error: 'party not found',
    });
  }

  static deleteParty(req, res) {
    const { partyId } = req.params;
    const data = Party.delete(parseInt(partyId, 10));
    if (data) {
      return res.json({
        status: 200,
        data,
      });
    }
    return res.json({
      status: 404,
      error: 'party not found',
    });
  }

  static createParty(req, res) {
    const { name, logo, address } = req.body;
    const partyObject = { name, address, logo };
    const data = Party.create(partyObject);
    return res.json({
      status: 201,
      data,
    });
  }

  static modifyParty(req, res) {
    const { name, logo, address } = req.body;
    const { partyId } = req.params;
    const partyObject = { name, address, logo };
    const data = Party.modify(parseInt(partyId, 10), partyObject);
    if (data) {
      return res.json({
        status: 200,
        data: [data],
      });
    }
    return res.json({
      status: 404,
      error: 'Update failed! party not found!',
    });
  }
}
export default PartyController;
