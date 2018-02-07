const environment = process.env.NODE_ENV || 'development';

const pgConnect = {
  test: {
    host: 'localhost',
    user: 'dustinburns',
    max: 20,
    database: 'koa_api_test',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  development: {
    host: 'localhost',
    user: 'dustinburns',
    max: 20,
    database: 'flix_v1',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
};

/* -------------- direct PG -------------- */
const { Pool } = require('pg');

const pool = new Pool(pgConnect[environment]);

module.exports = {
  query: async (q) => {
    const client = await pool.connect();
    let res;
    try {
      await client.query('BEGIN');
      try {
        res = await client.query(q);
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      }
    } finally {
      client.release();
    }
    return res;
  },
};
