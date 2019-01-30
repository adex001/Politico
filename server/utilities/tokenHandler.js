import jwt from 'jsonwebtoken';

class TokenHandler {
  static async createToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  }
}

export default TokenHandler;
