import { types } from 'util';

class Validator {
  static validateOffice(req, res, next) {
    let { name, type, description } = req.body;
    type = type.toLowerCase();
    // eslint-disable-next-line no-unused-vars
    let valid;
    if (type === 'federal' || type === 'state' || type === 'local' || type === 'legislative') {
      valid = true;
    } else {
      return res.json({
        status: 400,
        error: 'Please, enter a valid office type! Type must be federal, legislative, state or local',
      });
    }
    if (typeof name !== 'string' || name.length < 3) {
      return res.json({
        status: 400,
        error: 'Please, enter a valid name! Name must be greater than 3 characters',
      });
    }
    if (typeof description !== 'string' || description.length < 5) {
      return res.json({
        status: 400,
        error: 'Please, enter a valid description! Description must be greater than 5 characters',
      });
    }
    return next();
  }

  static validateParty(req, res, next) {
    let { name, logo, address } = req.body;
    name = name.toLowerCase();
    logo = logo.toLowerCase();
    address = address.toLowerCase();
    if (typeof name !== 'string' || name.length < 3) {
      return res.json({
        status: 400,
        error: 'Please, enter a valid name! Name must be greater than 3 characters',
      });
    }
    if (typeof logo !== 'string' || logo.length < 5) {
      return res.json({
        status: 400,
        error: 'Please, enter a valid logo URL!',
      });
    }
    if (typeof address !== 'string' || address.length < 5) {
      return res.json({
        status: 400,
        error: 'Please, enter a valid address and address must be greater than 5 characters',
      });
    }
    return next();
  }
}
export default Validator;
