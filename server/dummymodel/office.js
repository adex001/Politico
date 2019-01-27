import office from './db';

class Office {
  static create(params) {
    const officeObject = {
      officeId: office.office.length + 1,
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
}

export default Office;
