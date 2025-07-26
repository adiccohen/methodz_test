import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',           
  host: 'localhost',          
  database: 'postgres',  
  password: 'Mta159753!',  
  port: 5432,                 
});

export default pool;
