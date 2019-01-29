/* eslint-disable prefer-const */
class Validator {
  static validateOffice(req, res, next) {
    let { name, type, description } = req.body;
    // eslint-disable-next-line no-unused-vars
    let valid;
    if (type) {
      type = type.toLowerCase();
    }
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
    const { name, logo, address } = req.body;
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
