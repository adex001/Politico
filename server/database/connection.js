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
  timeRegistered TIMESTAMP DEFAULT NOW()
  
)`;
const createTableOffice = `CREATE TABLE IF NOT EXISTS office (
  officeid serial PRIMARY KEY,
  type varchar(50),
  name varchar(50) UNIQUE,
  description varchar(200),
  office_creation TIMESTAMPTZ DEFAULT NOW()
)`;
const createTableParty = `CREATE TABLE IF NOT EXISTS party (
  partyid serial PRIMARY KEY,
  address varchar(100),
  name varchar(50) UNIQUE,
  logo varchar(200),
  party_creation TIMESTAMPTZ DEFAULT NOW()
)`;
const createTableCandidate = `CREATE TABLE IF NOT EXISTS candidate (
  candidateid serial PRIMARY KEY,
  userid SERIAL REFERENCES users(userid) UNIQUE,
  officeid SERIAL REFERENCES office(officeid) ON DELETE CASCADE,
  partyid SERIAL REFERENCES party(partyid) ON DELETE CASCADE,
  isapproved boolean DEFAULT false,
  creationtime TIMESTAMPTZ DEFAULT NOW()
)`;
const createTableVote = `CREATE TABLE IF NOT EXISTS vote (
  voteid serial PRIMARY KEY,
  officeid SERIAL REFERENCES office(officeid) ON DELETE CASCADE,
  userid serial REFERENCES users(userid) ON DELETE CASCADE,
  candidateid serial REFERENCES candidate(candidateid) ON DELETE CASCADE,
  vote_creation TIMESTAMPTZ DEFAULT NOW()
)`;
const createTablePetition = `CREATE TABLE IF NOT EXISTS petition (
  petitionid serial PRIMARY KEY,
  officeid SERIAL REFERENCES office(officeid) ON DELETE CASCADE,
  userid serial REFERENCES users(userid) ON DELETE CASCADE,
  text varchar(300),
  evidence JSONB NOT NULL,
  creationtime TIMESTAMPTZ DEFAULT NOW()
) `;
const dropTables = 'DROP TABLE IF EXISTS users CASCADE; DROP TABLE IF EXISTS office CASCADE; DROP TABLE IF EXISTS party CASCADE; DROP TABLE IF EXISTS candidate CASCADE;  DROP TABLE IF EXISTS vote CASCADE; DROP TABLE IF EXISTS petition CASCADE';
const tables = `${createTableUsers}; ${createTableOffice}; ${createTableParty}; ${createTableCandidate}; ${createTableVote}; ${createTablePetition};`;
const db = (process.env.NODE_ENV === 'test') ? new Pool(testConfig) : new Pool();
const dev = process.env.NODE_ENV;
(async () => {
  if (dev === 'test') {
    await db.query(`${dropTables}; ${tables};`);
  } else {
    await db.query(tables);
  }
  return true;
})();

export default db;
