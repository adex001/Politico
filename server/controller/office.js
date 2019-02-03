import Office from '../dummymodel/office';
import Response from '../utilities/response';

class OfficeController {
  static createGovernmentOffice(req, res) {
    const { type, name, description } = req.body;
    const requestData = { type: type.toLowerCase(), name, description };
    const officeExist = Office.findName(name);
    if (officeExist) {
      return Response.errorData(res, 400, 'office name exists already! try another');
    }
    const data = Office.create(requestData);
    return Response.validData(res, 201, data);
  }

  static getAllOffices(req, res) {
    const data = Office.retrieveAll();
    return Response.validData(res, 200, data);
  }

  static getUniqueOffice(req, res) {
    const { officeId } = req.params;
    const data = Office.findOne(parseInt(officeId, 10));
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 404, 'No such office');
  }

  static deleteOffice(req, res) {
    const { officeId } = req.params;
    const data = Office.delete(parseInt(officeId, 10));
    if (data) return Response.validData(res, 200, data);
    return Response.errorData(res, 404, 'Office does not exist');
  }

  static modifyOffice(req, res) {
    const { officeId } = req.params;
    const { type, name, description } = req.body;
    const officeObject = { type: type.toLowerCase(), name, description };

    const data = Office.modify(parseInt(officeId, 10), officeObject);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 404, 'office not found');
  }
}

export default OfficeController;
