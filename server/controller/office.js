import Office from '../dummymodel/office';

class OfficeController {
  static createGovernmentOffice(req, res) {
    const { type, name, description } = req.body;
    const requestData = { type, name, description };
    const data = Office.create(requestData);
    return res.json({
      status: 201,
      data,
    });
  }

  static getAllOffices(req, res) {
    const data = Office.retrieveAll();
    return res.json({
      status: 200,
      data,
    });
  }
}

export default OfficeController;
