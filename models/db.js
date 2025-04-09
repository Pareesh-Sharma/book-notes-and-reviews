// models/db.js
// This module creates a connection pool to your PostgreSQL database.
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'books_db',
  password: '1234',
  port: 5432,
});

module.exports = pool;
