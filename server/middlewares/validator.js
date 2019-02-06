import validator from 'validator';
import Response from '../utilities/response';

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
      return Response.errorData(res, 400, 'Please, enter a valid office type! Type must be federal, legislative, state or local');
    }
    if (typeof name !== 'string' || name.length < 3) {
      return Response.errorData(res, 400, 'Please, enter a valid name! Name must be greater than 3 characters');
    }
    if (typeof description !== 'string' || description.length < 5) {
      return Response.errorData(res, 400, 'Please, enter a valid description! Description must be greater than 5 characters');
    }
    return next();
  }

  static validateParty(req, res, next) {
    const { name, logo, address } = req.body;
    if (typeof name !== 'string' || name.length < 3) {
      return Response.errorData(res, 400, 'Please, enter a valid name! Name must be greater than 3 characters');
    }
    if (typeof logo !== 'string' || logo.length < 5) {
      return Response.errorData(res, 400, 'Please, enter a valid logo URL!');
    }
    if (typeof address !== 'string' || address.length < 5) {
      return Response.errorData(res, 400, 'Please, enter a valid address and address must be greater than 5 characters');
    }
    return next();
  }

  static validateUserSignUp(req, res, next) {
    const {
      email, password, firstname, lastname, isAdmin,
    } = req.body;
    if (typeof email === 'undefined' || !validator.isEmail(email)) {
      return Response.errorData(res, 400, 'Enter a valid email address');
    }
    if (typeof password !== 'string' || password.length < 6) {
      return Response.errorData(res, 400, 'Enter a valid password! password must be greater than 6 characters.');
    }
    if (typeof firstname !== 'string' || firstname.length < 2) {
      return Response.errorData(res, 400, 'Enter a valid Firstname! Firstname must be 2 or more characters.');
    }
    if (typeof lastname !== 'string' || lastname.length < 2) {
      return Response.errorData(res, 400, 'Enter a valid Lastname! Lastname must be 2 or more characters.');
    }
    if (isAdmin === true || isAdmin === false) {
      const valid = true;
    } else {
      return Response.errorData(res, 400, 'Enter a valid admin status. isAdmin should be either true or false.');
    }
    return next();
  }

  static validateUserLogin(req, res, next) {
    const { email, password } = req.body;
    if (typeof email === 'undefined' || !validator.isEmail(email)) {
      return Response.errorData(res, 400, 'Enter a valid email address');
    }
    if (typeof password !== 'string' || password.length < 6) {
      return Response.errorData(res, 400, 'Enter a valid password! password must be greater than 6 characters.');
    }
    return next();
  }

  static validateInterest(req, res, next) {
    const { officename, partyname } = req.body;
    if (typeof officename !== 'string' || officename.length < 3) {
      return Response.errorData(res, 400, 'Please, enter a valid office name! Office Name must be greater than 3 characters');
    }
    if (typeof partyname !== 'string' || partyname.length < 3) {
      return Response.errorData(res, 400, 'Please, enter a valid party name! Party Name must be greater than 3 characters');
    }
    return next();
  }
}
export default Validator;
