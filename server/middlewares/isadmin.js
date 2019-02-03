import jwt from 'jsonwebtoken';
import Response from '../utilities/response';

const isAdmin = (req, res, next) => {
  const { token } = req.headers;
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (decoded.isAdmin === 'true') {
    return next();
  }
  return Response.errorData(res, 403, 'You do not have the permission to access this resource!');
};

export default isAdmin;
