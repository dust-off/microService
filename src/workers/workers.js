const queries = require('../server/db/queries/movies');
// const knex = require('../server/db/connection.js');
const db = require('../server/db/queries/pg.js');

// const bulkUpdate = (records) => {
//   queries.addBatchMovies(records)
//     .then((data) => {
//       console.log('data');
//       console.log('data');
//       console.log(data);
//     });
// };

module.exports = {
  batchProccess: async (data) => {
    let queryArray = '';
    const { insert, mod, remove } = data;

    if (insert) {
      console.log('inserting');
      const rowsArray = [];
      insert.forEach((movie) => {
        rowsArray.push(`('${movie.title}', '${movie.genre}', ${movie.time})`);
      });

      queryArray += ` INSERT INTO movies (title, genre, time) VALUES ${rowsArray} `;
    }
    if (mod) {
      console.log(mod);
    }
    if (remove) {
      console.log('removing');
      const rowsArray = [];
      remove.forEach((movie) => {
        rowsArray.push(`'${movie.title}'`);
      });
      // DELETE FROM foo WHERE id IN (select id from rows_to_delete);
      queryArray += ` DELETE FROM movies WHERE title IN (${rowsArray}) `;
    }

    try {
      console.log('');
      console.log('queryArray');
      console.log(queryArray);
      console.log('');
      console.log('');
      const write = await db.query(queryArray);
      // console.log('write', write);
      return write;
    } catch (err) {
      console.log('Catch in Worker.js @ 38');
      console.log(`    *Database ${err}`);
    }
  },
  listGeneration: async () => {
    const queryArray = {};
    const regions = [
      'Africa',
      'Antarctica',
      'Asia',
      'Europe',
      'North America',
      'Australia',
      'South America',
    ];
    regions.forEach((region) => {
      queryArray[region].text = `SELECT * FROM movies WHERE licensing @> ${region} LIMIT 100`;
    });
    try {
      const write = await db.query(queryArray);
      // console.log('write', write);
      return write;
    } catch (err) {
      console.log('Catch in Worker.js @ 38');
      console.log(`    *Database ${err}`);
    }
  },
};

// SELECT * FROM items WHERE genre @> '["scifi"]'::jsonb;
// NOTE - list data
// {
//   regions: [
//     <regionID_1>: [
//       _videoID,
//       _videoID,
//     ],
//     <regionID_2>: [
//       _videoID,
//       _videoID
//     ],
//   ],
//   videoData: [
//     <videoData_1>,
//     <videoData_2>,
//   ]
// }
