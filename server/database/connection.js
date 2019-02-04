import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const testConfig = {
  database: process.env.DB_NAME_TEST,
  host: process.env.DB_HOST_TEST,
  user: process.env.DB_USER_TEST,
  password: process.env.DB_PASSWORD_TEST,
  port: process.env.DB_PORT_TEST,
};

const createTableUsers = `CREATE TABLE IF NOT EXISTS users (
  userId serial PRIMARY KEY,
  email varchar(80) UNIQUE,
  password varchar(400),
  sex varchar(7),
  firstname varchar(50),
  lastname varchar(50),
  isAdmin boolean DEFAULT false,
  timeRegistered TIMESTAMP NOT NULL DEFAULT NOW()
  
  )`;
const dropTables = 'DROP TABLE IF EXISTS users';

const db = (process.env.NODE_ENV === 'test') ? new Pool(testConfig) : new Pool();
const createTables = async (dev) => {
  if (dev === 'test') {
    await db.query(`${dropTables}; ${createTableUsers};`);
  } else {
    await db.query(`${createTableUsers};`);
  }
  return true;
};
createTables(process.env.NODE_ENV);

export default db;
