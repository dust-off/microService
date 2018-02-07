const environment = process.env.NODE_ENV || 'development';
const config = require('../../../knexfile.js')[environment];

console.log('');
console.log('KNEX environment =', environment);

module.exports = require('knex')(config);
