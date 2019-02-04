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

  static findName(name) {
    const searcher = search => search.name === name;
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

  static create(params) {
    const partyObject = {
      partyId: party.party[party.party.length - 1].partyId + 1,
      address: params.address,
      name: params.name,
      logo: params.logo,
    };
    party.party.push(partyObject);
    return [party.party[party.party.length - 1]];
  }

  static modify(id, params) {
    const searcher = search => search.partyId === id;
    const found = party.party.find(searcher);
    if (found) {
      found.name = params.name;
      found.logo = params.logo;
      found.address = params.address;
      return found;
    }
    return false;
  }
}
export default Party;
