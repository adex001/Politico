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
}
export default PartyController;
