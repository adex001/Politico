import bcrypt from 'bcryptjs';

class PasswordHasher {
  static async create(password) {
    const saltRound = Math.floor(Math.random() * 5);
    const salt = await bcrypt.genSaltSync(saltRound);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    return hashedPassword;
  }
}

export default PasswordHasher;
