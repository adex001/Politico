import userModel from '../model/user';
import TokenHandler from '../utilities/tokenHandler';
import PasswordHasher from '../utilities/passwordHasher';
import Response from '../utilities/response';
/**
   * @class Auth Controller
   */
class AuthController {
  /**
     * @function signup
     * @req request object
     * @res response object
     * @returns {*} the newly created user
     */
  static async signup(req, res) {
    const {
      email, password, firstname, lastname, isAdmin,
    } = req.body;
    const encryptedPassword = await PasswordHasher.create(password);
    const userObject = {
      email,
      firstname,
      password: encryptedPassword,
      lastname,
      isAdmin,
    };
    const data = await userModel.getUser(email);
    if (data) return Response.errorData(res, 400, 'Email exists already! try another!');
    const payload = await userModel.create(userObject);    
    if (payload) {
      const payloadObject = {
        userId: payload.userid,
        email: payload.email,
        isAdmin: payload.isadmin,
      };
      const token = await TokenHandler.createToken(payloadObject);
      payloadObject.firstname = payload.firstname;
      payloadObject.lastname = payload.lastname;

      return Response.validData(res, 201, [{
        token,
        user: payloadObject,
      },
      ]);
    }
    return Response.errorData(res, 500, 'Internal server error!');
  }

  /**
     * @function login
     * @req request object
     * @res response object
     * @returns {*} the user's data
     */
  static async login(req, res) {
    const { email, password } = req.body;
    const data = await userModel.getUser(email);
    if (!data) {
      return res.json({
        status: 400,
        error: 'invalid username or password',
      });
    }
    const passwordCorrect = await PasswordHasher.verify(password, data.password);
    if (!passwordCorrect) return Response.errorData(res, 400, 'invalid username or password');
    const payload = {
      userId: data.userid,
      email: data.email,
      isAdmin: data.isadmin,
    };
    const token = await TokenHandler.createToken(payload);
    payload.firstname = data.firstname;
    payload.lastname = data.lastname;
    return Response.validData(res, 200, [{
      token,
      user: payload,
    },
    ]);
  }
}

export default AuthController;
