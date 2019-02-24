/* eslint-disable no-restricted-globals */
import modelOffice from '../model/office';
import Response from '../utilities/response';
/**
 * @class OfficeController
 */
class OfficeController {
  /**
 * @function createGovernmentOffice
 * @param {*} req
 * @param {*} res
 * @returns {*} the created office
 */
  static async createGovernmentOffice(req, res) {
    const { type, name, description } = req.body;
    const requestData = {
      type: type.trim().toLowerCase(),
      name: name.replace(/\s+/g, ' ').trim(),
      description: description.replace(/\s+/g, ' ').trim(),
    };
    const officeExist = await modelOffice.findName(name);
    if (officeExist) {
      return Response.errorData(res, 400, 'office name exists already! try another');
    }
    const data = await modelOffice.create(requestData);
    return Response.validData(res, 201, [data]);
  }

  /**
 * @function getAllOffices
 * @param {*} req
 * @param {*} res
 * @returns {*} all offices
 */
  static async getAllOffices(req, res) {
    const data = await modelOffice.retrieveAll();
    return Response.validData(res, 200, data);
  }

  /**
 * @function getUniqueOffice
 * @param {*} req
 * @param {*} res
 * @returns {*} a specific office
 */
  static async getUniqueOffice(req, res) {
    const { officeId } = req.params;
    // officeId = Number(officeId);
    if (!(/^[\d]+$/.test(officeId))) return Response.errorData(res, 400, 'invalid office id');
    const data = await modelOffice.findOne(officeId);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 404, 'No such office');
  }

  /**
 * @function deleteOffice
 * @param {*} req
 * @param {*} res
 * @returns {*} the deleted office
 */
  static async deleteOffice(req, res) {
    const { officeId } = req.params;
    if (!(/^[\d]+$/.test(officeId))) return Response.errorData(res, 400, 'invalid office id');
    if (!await modelOffice.findOne(officeId)) return Response.errorData(res, 404, 'Office does not exist');
    const data = await modelOffice.delete(officeId);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 500, 'Internal server error');
  }

  /**
 * @function modifyOffice
 * @param {*} req
 * @param {*} res
 * @returns {*} the office modified
 */
  static async modifyOffice(req, res) {
    const { officeId } = req.params;
    if (!(/^[\d]+$/.test(officeId))) return Response.errorData(res, 400, 'invalid office id');
    const { type, name, description } = req.body;
    if (!await modelOffice.findOne(officeId)) return Response.errorData(res, 404, 'office not found');
    if (await modelOffice.findName(name)) return Response.errorData(res, 400, 'office name already exists!');
    const officeObject = { type: type.trim().toLowerCase(), name: name.replace(/\s+/g, ' ').trim(), description: description.replace(/\s+/g, ' ').trim() };
    const data = await modelOffice.modify(officeId, officeObject);
    if (data) return Response.validData(res, 200, [data]);
    return Response.errorData(res, 500, 'Internal server error');
  }
}

export default OfficeController;
