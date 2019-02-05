/* eslint-disable no-restricted-globals */
import Office from '../dummymodel/office';
import modelOffice from '../model/office';
import Response from '../utilities/response';

class OfficeController {
  static async createGovernmentOffice(req, res) {
    const { type, name, description } = req.body;
    const requestData = {
      type: type.toLowerCase(),
      name: name.trim(),
      description: description.trim(),
    };
    const officeExist = await modelOffice.findName(name);
    if (officeExist) {
      return Response.errorData(res, 400, 'office name exists already! try another');
    }
    const data = await modelOffice.create(requestData);
    return Response.validData(res, 201, [data]);
  }

  static async getAllOffices(req, res) {
    const data = await modelOffice.retrieveAll();
    return Response.validData(res, 200, data);
  }

  static async getUniqueOffice(req, res) {
    let { officeId } = req.params;
    officeId = Number(officeId);
    if (isNaN(officeId)) return Response.errorData(res, 400, 'invalid office id');
    const data = await modelOffice.findOne(officeId);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 404, 'No such office');
  }

  static deleteOffice(req, res) {
    let { officeId } = req.params;
    officeId = Number(officeId);
    if (isNaN(officeId)) return Response.errorData(res, 400, 'invalid office id');
    const data = Office.delete(officeId);
    if (data) return Response.validData(res, 200, data);
    return Response.errorData(res, 404, 'Office does not exist');
  }

  static modifyOffice(req, res) {
    let { officeId } = req.params;
    officeId = Number(officeId);
    if (isNaN(officeId)) return Response.errorData(res, 400, 'invalid office id');
    const { type, name, description } = req.body;
    const officeObject = { type: type.toLowerCase(), name, description };

    const data = Office.modify(officeId, officeObject);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 404, 'office not found');
  }
}

export default OfficeController;
