import jwt from 'jsonwebtoken';
import Response from './response';
/**
     * @class TokenHandler
     */
class TokenHandler {
  /**
     * @function validData
     * @payload object you want to store
     * @returns {*} the token
     */
  static async createToken(payload) {
    const token = await jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  }

  /**
     * @function validData
     * @req request object
     * @res response code
     * @next middleware next
     * @returns {*} the next middleware
     */
  static verifyToken(req, res, next) {
    const { token } = req.headers;
    if (typeof token === 'undefined') {
      return Response.errorData(res, 401, 'No token provided!');
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        req.decoded = decoded;
        return next();
      }
      return Response.errorData(res, 401, 'Token cannot be verified');
    });
    return null;
  }
}
export default TokenHandler;
