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
}

export default Office;
