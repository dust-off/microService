const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/flix_v1';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE movies_v1(id SERIAL PRIMARY KEY, title VARCHAR(120) not null, genre JSONB, time INTEGER, licensing JSONB, original BOOLEAN)');
query.on('end', () => { client.end(); });


// {
//   _id: Number,
//   title: String,
//   genre: [Strings],
//   time: Number <milliseconds>,
//   licensing: [Strings <regionID>],
//   original: Boolean,
// }


// CREATE TABLE measurements (tick BIGSERIAL PRIMARY KEY, record JSONB);
// INSERT INTO measurements (record)
//   SELECT (
//     '{ "value_1":' || trunc(2 * random()) ||
//     ', "value_2":' || trunc(2 * random()) ||
//     ', "value_3":' || trunc(2 * random()) ||
//     ', "scientist_id":' || trunc(10000 * random() + 1) || ' }')::JSONB
//   FROM generate_series(0, 999999) i
