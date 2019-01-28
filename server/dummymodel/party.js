import partyRouter from '../routes/party';
import party from './db';

class Party {
  static getAll() {
    return party.party;
  }
}
export default Party;
