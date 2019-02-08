import bcrypt from 'bcryptjs';
/**
     * @class PasswordHasher
     */
class PasswordHasher {
  /**
     * @function create
     * @password password you want to encypt
     * @returns {*} the encrypted password
     */
  static async create(password) {
    const saltRound = Math.floor(Math.random() * 5);
    const salt = await bcrypt.genSaltSync(saltRound);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  /**
     * @function verify
     * @password plain password
     * @hashedPassword encrypted password
     * @returns {*} a boolean true of false
     */
  static async verify(password, hashedPassword) {
    const data = await bcrypt.compareSync(password, hashedPassword);
    return data;
  }
}

export default PasswordHasher;
