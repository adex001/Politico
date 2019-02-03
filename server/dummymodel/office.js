import office from './db';

class Office {
  static create(params) {
    const officeObject = {
      officeId: office.office[office.office.length - 1].officeId + 1,
      type: params.type,
      name: params.name,
      description: params.description,
    };
    office.office.push(officeObject);
    return [office.office[office.office.length - 1]];
  }

  static retrieveAll() {
    return office.office;
  }

  static findOne(id) {
    const searcher = search => search.officeId === id;
    const found = office.office.find(searcher);
    return found;
  }

  static findName(name) {
    const searcher = search => search.name === name;
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
