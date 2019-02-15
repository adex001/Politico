import jwt from 'jsonwebtoken';
import Response from '../utilities/response';

/**
 * @function isAdmin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} the next function
 */
const isAdmin = (req, res, next) => {
  const { token } = req.headers;
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (decoded.isAdmin) {
    return next();
  }
  return Response.errorData(res, 403, 'Requires admin authorization');
};

export default isAdmin;
