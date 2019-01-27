class Validator {
  static validateOffice(req, res, next) {
    const { name, type, description } = req.body;
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
}
export default Validator;
