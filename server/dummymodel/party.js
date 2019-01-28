import party from './db';

class Party {
  static getAll() {
    return party.party;
  }

  static getOne(id) {
    const searcher = search => search.partyId === id;
    const found = party.party.find(searcher);
    if (found) {
      return found;
    }
    return false;
  }
}
export default Party;
