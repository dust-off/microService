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
    max: 30,
    database: 'flix_v1',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
};

/* -------------- direct PG -------------- */
const { Pool } = require('pg');

const pool = new Pool(pgConnect[environment]);
// const client = pool.connect();

const fake = {
  command: 'SELECT',
  rowCount: 1,
  oid: null,
  rows:
   [{
     id: 2,
     title: 'Fish Wooden Fantastic',
     genre: [Array],
     time: 732000,
     licensing: [Array],
     original: false,
     popularity: 278,
   }],
  fields:
   [],
};

module.exports = {
  query: async (q) => {
    console.log('faking it');
    return fake;
    const client = await pool.connect();
    let res;
    try {
      // await client.query('BEGIN');
      try {
        res = await client.query(q);
        console.log(res);
        // await client.query('COMMIT');
      } catch (err) {
        // await client.query('ROLLBACK');
        throw err;
      }
    } catch (err) {
      console.log(err);
    }
    // finally {
    //   client.release();
    // }
    return res;
  },
  getSingleMovie: async (data) => {
    //
  },
};
