import Cryptr from 'cryptr';

class Crypter {
  static async encrypt(string) {
    try {
      const cryptr = new Cryptr(process.env.SECRET_KEY);
      const encryptedString = await cryptr.encrypt(string);
      return encryptedString;
    } catch (err) {
      return false;
    }
  }

  static async decrypt(encryptedString) {
    try {
      const cryptr = new Cryptr(process.env.SECRET_KEY);
      const string = await cryptr.decrypt(encryptedString);
      return string;
    } catch (err) {
      return false;
    }
  }
}

export default Crypter;
