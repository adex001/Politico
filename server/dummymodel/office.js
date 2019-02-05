import office from './db';

class Office {
  static retrieveAll() {
    return office.office;
  }

  static findOne(id) {
    const searcher = search => search.officeId === id;
    const found = office.office.find(searcher);
    return found;
  }

  static delete(id) {
    const searcher = search => search.officeId === id;
    const found = office.office.find(searcher);
    if (found) {
      office.office.splice(found.officeId - 1, 1);
      return office.office;
    }
    return false;
  }

  static modify(id, params) {
    const searcher = search => search.officeId === id;
    const found = office.office.find(searcher);
    if (found) {
      found.name = params.name;
      found.type = params.type;
      found.description = params.description;
      return found;
    }
    return false;
  }
}

export default Office;
