exports.up = (knex, Promise) => knex.schema.createTable('movies', (table) => {
  table.increments();
  table.string('title', 120).notNullable();
  table.jsonb('genre');
  table.integer('time').notNullable();
  table.jsonb('licensing');
  table.boolean('original');
  table.integer('popularity');
});

// 'CREATE TABLE movies_v1(id SERIAL PRIMARY KEY, title VARCHAR(120) not null, genre JSONB, time INTEGER, licensing JSONB, original BOOLEAN)');

exports.down = (knex, Promise) => knex.schema.dropTable('movies');
