import jwt from 'jsonwebtoken';
import Response from '../utilities/response';

class TokenHandler {
  static async createToken(payload) {
    const token = await jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  }

  static verifyToken(req, res, next) {
    const { token } = req.headers;
    if (typeof token === 'undefined') {
      return Response.errorData(res, 400, 'No token provided!');
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        req.decoded = decoded;
        return next();
      }
      return Response.errorData(res, 400, 'Token cannot be verified');
    });
    return null;
  }
}
export default TokenHandler;
