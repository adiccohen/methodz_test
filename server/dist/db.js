"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
console.log('🔍 PGHOST:', process.env.PGHOST);
console.log('🔍 PGUSER:', process.env.PGUSER);
console.log('🔍 PGPASSWORD:', process.env.PGPASSWORD);
const pool = new pg_1.Pool({
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || '5432'),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
});
console.log("Connecting to:", process.env.PGHOST);
exports.default = pool;
