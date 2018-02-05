const db = require('../db')
const faker = require('faker');

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

//SELECT * FROM items WHERE genre @> '["scifi"]'::jsonb;

//http://bit.ly/IqT6zt

// vero vitae reiciendis
// fugit adipisci architecto
// vero et sunt
// quaerat maiores consectetur
// voluptas placeat corporis

// "SELECT * FROM tags WHERE name LIKE $1", ['%' + faker.lorem.word() + '%']
// db.query("SELECT * FROM items WHERE title LIKE $1", ['%' + faker.lorem.word() + '%'], (err, data) => {

const TEST_NUM = 1000;

for (let i = 0; i < TEST_NUM; i++) {
  const start = Date.now()
  db.query("SELECT * FROM items WHERE id = $1", [getRandomInt(10000000 - 1)] , (err, data) => {
    const duration = Date.now() - start
    console.log('@', i, 'for', duration);
    if (err) {
      console.log('');
      console.log('ERROR');
      console.log(err, data);
    }
  })
}


// db.query('INSERT INTO items(title, category) values($1, $2);', [data.title, data.category], (err, data) => {
//   console.log(err, data);
//   res.json(data);
// })
