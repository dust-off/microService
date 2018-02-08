// const redis = require('redis');
//
// const redisClient = redis.createClient({ host: 'localhost', port: 6379 });
//
// redisClient.on('ready', () => {
//   console.log('Redis is ready');
// });
//
// redisClient.on('error', () => {
//   console.log('Error in Redis');
// });

/* ------------- OG redis stuff ------------- */

const redis = require('redis');
// const fakeData = require('../../../../__old/db/load/fakeLies.js');
// const redis_scanner = require('redis-scanner');

const client = redis.createClient();
const { promisify } = require('util');

const getAsync = promisify(client.get).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

// var client = redis.createClient();

// redis_scanner.bindScanners(client);


client.on('connect', () => {
  console.log('connected');
});
client.on('error', (err) => {
  console.log(`Error ${err}`);
});

module.exports = {
  cacheSave: async (movie) => {
    hmsetAsync(
      movie.id,
      'title', movie.title,
      'id', movie.id,
      'title', movie.title,
      'genre', movie.genre.toString(),
      'time', movie.time,
      'licensing', movie.licensing.toString(),
      'original', movie.original,
      'popularity', movie.popularity,
    )
      .then((err, reply) => reply);
  },
  cacheGet: async (id) => {
    // client.flushdb();
    let gotten;
    try {
      gotten = await hgetallAsync(id);
      if (gotten !== null) {
        gotten = [gotten];
      }
    } catch (err) {
      console.log('cacheGet ERROR', err);
    }
    return gotten;

    // const client = await pool.connect();
    // let res;
    // try {
    //   // await client.query('BEGIN');
    //   try {
    //     res = await client.query(q);
    //     console.log(res);
    //     // await client.query('COMMIT');
    //   } catch (err) {
    //     // await client.query('ROLLBACK');
    //     throw err;
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    // // finally {
    // //   client.release();
    // // }
    // return res;
  },
};
// NOTE turned off everything south of here
//
// // NOTE - basic Hash
// hmsetAsync('tools', 'key1', 'data1', 'key2', 'data2', 'key3', 'data3')
//   .then((err, reply) => {
//     console.log(err);
//     console.log(reply);
//   });
//
// // NOTE - fetch the basic Hash
// hgetallAsync('tools')
//   .then((err, reply) => {
//     console.log(err);
//     console.log(reply);
//   });
//
// // NOTE - LIST
// redisClient.rpush(['languages', 'angularjs', 'nodejs', 'go'], (err, reply) => {
//   console.log(err);
//   console.log(reply);
// });
// // NOTE - SET
// redisClient.sadd(['devopstools', 'jenkins', 'codeship', 'jenkins'], (err, reply) => {
//   console.log(err);
//   console.log(reply);
// });
//
//
// /* ------------- insert fake data ------------- */
// // NOTE - fix fakeData link
// const stashData = count => new Promise((resolve) => {
//   // client.flushall();
//   // hgetallAsync('moives')
//   //   .then((res) => {
//   //     res.genre = res.genre.split(',');
//   //     res.licensing = res.licensing.split(',');
//   //     console.log('res =', res);
//   //   });
//
// // stuff
//
//   const data = fakeData(count);
//   console.log(data.length);
//   // console.log();
//   data.forEach((movie, index) => {
//     movie.genre = JSON.stringify(movie.genre);
//     movie.licensing = JSON.stringify(movie.licensing);
//     hmsetAsync(movie.title, movie)
//       .then(() => {
//         if (index === count - 1) {
//           // client.dbsize.then(countNum => console.log(countNum));
//           console.log('');
//           console.log('');
//           console.log('finished inserting ', count, 'records');
//           client.dbsize((err, numKeys) => { console.log(numKeys); });
//           // console.log('DBSIZE', client.dbsize());
//           client.quit();
//           resolve('done');
//         }
//       })
//       .catch((err) => {
//         console.log('insert ERROR');
//       });
//   });
// });
//
// // stashData(500000);
//
// /* ----------- myFunc is called below this ----------- */
// // NOTE - old code but keep it around for now
// const myFunc = () => {
//   client.dbsize((err, numKeys) => { console.log('@', Date.now(), 'Data Set = ', numKeys); });
//   const start = Date.now();
//
//   client.hscan('my_hash', {
//     count: '5',
//     pattern: 'key:*',
//     onData(result) {
//       console.log(result);
//     },
//     onEnd(err) {
//       console.log('ended');
//     },
//   });
//
// // stuff
//
//   // // hmsetAsync('moives', fakeData()[0])
//   // //   .then(() => {
//   // hgetallAsync('moives')
//   //   .then((res) => {
//   //     res.genre = res.genre.split(',');
//   //     res.licensing = res.licensing.split(',');
//   //     console.log('res =', res);
//   //   })
//   //   .then(() => {
//   //     const duration = Date.now() - start;
//   //     console.log('time:', duration);
//   //     // client.del('moives', (err, reply) => {
//   //     //   console.log('deleted, reply =', reply);
//   //     // });
//   //   })
//   //   .catch((err) => {
//   //     console.log('error', err);
//   //   });
//   // // })
//   // // .catch(err => console.log('inserting movie failed', err));
// };
//
// // myFunc();
//
//
// // With the code bellow you will scan the 1000 first object from cursor 0
// //
// // SCAN 0 MATCH "foo:bar:*" COUNT 1000
// // In result you will get a new cursor to recall
// //
// // SCAN YOUR_NEW_CURSOR MATCH "foo:bar:*" COUNT 1000
// // To scan 1000 next object. Then when you inscrease COUNT from 1000 to 1000 and retrieve data you scan more keys then in your case match more keys.
// //
// // To scan the entire list you need to recall SCAN until the cursor give in response return zero (i.e entire scan)
// //
// // Use INFO command to get your amount of keys like
// //
// // db0:keys=YOUR_AMOUNT_OF_KEYS,expires=0,avg_ttl=0
// //
// // Then call
// //
// // SCAN 0 MATCH "foo:bar:*" COUNT YOUR_AMOUNT_OF_KEYS
//
// // const TEST_NUM = 1000;
// //
// // for (let i = 0; i < TEST_NUM; i++) {
// //   const start = Date.now()
// //   db.query("SELECT * FROM items WHERE id = $1", [getRandomInt(10000000 - 1)] , (err, data) => {
// //     const duration = Date.now() - start
// //     console.log('@', i, 'for', duration);
// //     if (err) {
// //       console.log('');
// //       console.log('ERROR');
// //       console.log(err, data);
// //     }
// //   })
// // }
