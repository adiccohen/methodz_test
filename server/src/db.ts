import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',           // your DB username
  host: 'localhost',          // or your DB host
  database: 'postgres',  // your DB name
  password: 'Mta159753!',  // your DB password
  port: 5432,                 // default Postgres port
});

export default pool;
