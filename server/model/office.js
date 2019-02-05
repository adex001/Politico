import db from '../database/connection';

class Office {
  static async create(params) {
    try {
      const officeObject = [params.type.trim(), params.name.trim(), params.description.trim()];
      const createQuery = 'INSERT INTO office (type, name, description) VALUES ($1, $2, $3) RETURNING *';
      const result = await db.query(createQuery, officeObject);
      const resultObject = {
        name: result.rows[0].name,
        type: result.rows[0].type,
        description: result.rows[0].description,
        timeRegistered: result.rows[0].office_creation.toLocaleString(),
      };
      return resultObject;
    } catch (error) {
      return false;
    }
  }

  static async findName(name) {
    try {
      const query = 'SELECT name FROM office WHERE name = $1';
      const result = await db.query(query, [name]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  static async retrieveAll() {
    const result = await db.query('SELECT name, type, description FROM office');
    return result.rows;
  }
}
export default Office;
