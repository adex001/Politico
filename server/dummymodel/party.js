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

  static delete(id) {
    const searcher = search => search.partyId === id;
    const found = party.party.find(searcher);
    if (found) {
      party.party.splice(found, 1);
      return party.party;
    }
    return false;
  }
}
export default Party;
