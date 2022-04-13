import setup from "./setup.js";
import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
    connectionString: setup.connectionString
});

export default connection;