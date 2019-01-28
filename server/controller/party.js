import Party from '../dummymodel/party';


class PartyController {
  static getAllParties(req, res) {
    const data = Party.getAll();
    return res.json({
      status: 200,
      data,
    });
  }
}
export default PartyController;
