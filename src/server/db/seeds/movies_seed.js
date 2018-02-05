exports.seed = (knex, Promise) => knex('movies').del()
  .then(() => knex('movies').insert({
    title: 'The Land Before Time',
    genre: JSON.stringify(['mysteries', 'dramas', 'international', 'action']),
    time: 556000,
    licensing: JSON.stringify(['Africa', 'North America', 'Europe', 'Australia']),
    original: false,
    popularity: 500,
  }))
  .then(() => knex('movies').insert({
    title: 'Jurassic Park',
    genre: JSON.stringify(['scifi', 'thriller', 'action']),
    time: 549000,
    licensing: JSON.stringify(['Africa', 'Antarctica', 'Asia', 'Europe']),
    original: true,
    popularity: 900,
  }))
  .then(() => knex('movies').insert({
    title: 'Ice Age: Dawn of the Dinosaurs',
    genre: JSON.stringify(['action', 'comedies']),
    time: 551000,
    licensing: JSON.stringify(['Antarctica', 'Asia', 'Europe', 'North America', 'Australia', 'South America']),
    original: false,
    popularity: 300,
  }));


// table.increments();
// table.string('title', 120).notNullable();
// table.jsonb('genre');
// table.integer('time').notNullable();
// table.jsonb('licensing');
// table.boolean('original');
// table.integer('popularity');

// const regions = [
// 'Africa',
// 'Antarctica',
// 'Asia',
// 'Europe',
// 'North America',
// 'Australia',
// 'South America',
// ];
//
// const genres = [
//   'action',
//   'international',
//   'comedies',
//   'scifi',
//   'horror',
//   'dramas',
//   'thriller',
//   'romance',
//   'docuseries',
//   'mysteries',
// ];
