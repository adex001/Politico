import validator from 'validator';
import Response from '../utilities/response';

/**
 * @class Validator
 */
class Validator {
  /**
 * @function validateOffice
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} the next function
 */
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

  /**
 * @function validateParty
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} the next function
 */
  static validateParty(req, res, next) {
    const { name, logoUrl, address } = req.body;
    if (typeof name !== 'string' || name.trim().length < 3) {
      return Response.errorData(res, 400, 'Please, enter a valid name! Name must be greater than 3 characters');
    }
    if (typeof logoUrl !== 'string' || !validator.isURL(logoUrl.trim())) {
      return Response.errorData(res, 400, 'Please, enter a valid logo URL!');
    }
    if (typeof address !== 'string' || address.trim().length < 5) {
      return Response.errorData(res, 400, 'Please, enter a valid address and address must be greater than 5 characters');
    }
    return next();
  }

  /**
 * @function validateUserSignUp
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} the next function
 */
  static validateUserSignUp(req, res, next) {
    const {
      email, password, firstname, lastname, isAdmin,
    } = req.body;
    if (isAdmin) {
      if (isAdmin === true || isAdmin === false || isAdmin === 'true' || isAdmin === 'false') {
        const valid = true;
      } else {
        return Response.errorData(res, 400, 'Enter a valid admin status. isAdmin should be either true or false.');
      }
    }
    if (typeof email === 'undefined' || !validator.isEmail(email.trim())) {
      return Response.errorData(res, 400, 'Enter a valid email address');
    }
    if (typeof password !== 'string' || password.trim().length < 6) {
      return Response.errorData(res, 400, 'Enter a valid password! password must be greater than 6 characters.');
    }
    if (typeof firstname !== 'string' || firstname.trim().length < 2) {
      return Response.errorData(res, 400, 'Enter a valid Firstname! Firstname must be 2 or more characters.');
    }
    if (typeof lastname !== 'string' || lastname.trim().length < 2) {
      return Response.errorData(res, 400, 'Enter a valid Lastname! Lastname must be 2 or more characters.');
    }
    return next();
  }

  /**
 * @function validateUserLogin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} the next function
 */
  static validateUserLogin(req, res, next) {
    const { email, password } = req.body;
    if (typeof email === 'undefined' || !validator.isEmail(email.trim())) {
      return Response.errorData(res, 400, 'Enter a valid email address');
    }
    if (typeof password !== 'string' || password.trim().length < 6) {
      return Response.errorData(res, 400, 'Enter a valid password! password must be greater than 6 characters.');
    }
    return next();
  }

  /**
 * @function validateInterest
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} the next function
 */
  static validateInterest(req, res, next) {
    const { officeid, partyid } = req.body;
    if (!(/^[\d]+$/.test(officeid))) return Response.errorData(res, 400, 'Please, enter a valid officeid. Officeid must be a number');
    if (!(/^[\d]+$/.test(partyid))) return Response.errorData(res, 400, 'Please, enter a valid partyid. partyid must be a number');
    return next();
  }

  /**
 * @function validateVote
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} the next function
 */
  static validateVote(req, res, next) {
    const { officeid, candidateid } = req.body;
    if (!(/^[\d]+$/.test(officeid))) return Response.errorData(res, 400, 'Please, enter a valid officeid. Officeid must be a number');
    if (!(/^[\d]+$/.test(candidateid))) return Response.errorData(res, 400, 'Please, enter a valid candidateid. Candidateid must be a number');
    return next();
  }

  /**
 * @function validateVoteResult
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} the next function
 */
  static validateVoteResult(req, res, next) {
    const { officeId } = req.params;
    if (!(/^[\d]+$/.test(officeId))) return Response.errorData(res, 400, 'Please, enter a valid officeid. Officeid must be a number');
    return next();
  }
}
export default Validator;
