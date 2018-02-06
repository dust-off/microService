// const environment = process.env.NODE_ENV || 'development';
// // const path = require('path');
//
// // const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');
//
// const pgConnect = {
//   test: {
//     host: 'localhost',
//     user: 'dustinburns',
//     max: 20,
//     database: 'flix_v1_test',
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//   },
//   development: {
//     host: 'localhost',
//     user: 'dustinburns',
//     max: 20,
//     database: 'flix_v1',
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//   },
// };
//
// // const pg = require('pg');
// //
// // const onConnect = (err, client, done) => {
// //   if (err) {
// //     console.error(err);
// //     process.exit(1);
// //   }
// //   client.end();
// // };
// //
// // pg.connect(pgConnect[environment], onConnect);
//
// const { Pool } = require('pg');
//
// const pool = new Pool(pgConnect[environment]);
//
// module.exports = {
//   query: (text, params, callback) => {
//     const start = Date.now();
//     return pool.query(text, params, (err, res) => {
//       const duration = Date.now() - start;
//       console.log('executed query', { text, params, duration });
//       // console.log('executed query', duration)
//       callback(err, res);
//     });
//   },
// };
