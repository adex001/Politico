import User from '../dummymodel/user';
import TokenHandler from '../utilities/tokenHandler';
import PasswordHasher from '../utilities/passwordHasher';

class AuthController {
  static async signup(req, res) {
    const {
      email, password, firstname, lastname,
    } = req.body;
    // Encrypt Password
    const encryptedPassword = await PasswordHasher.create(password);
    const userObject = {
      email,
      firstname,
      password: encryptedPassword,
      lastname,
    };
    // JWT for token
    const payload = User.create(userObject);
    // Take details
    if (payload) {
      const payloadObject = {
        userId: payload.userId,
        email: payload.email,
      };
      const token = await TokenHandler.createToken(payloadObject);
      payloadObject.firstname = payload.firstname;
      payloadObject.lastname = payload.lastname;
      return res.json({
        status: 201,
        data: [{
          token,
          user: payloadObject,
        },
        ],
      });
    }
    return res.json({
      status: 400,
      error: 'User not found',
    });
  }
}

export default AuthController;
