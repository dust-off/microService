/* ----------- IMPORT PACKAGES ----------- */
const faker = require('faker');
const fs = require('fs');
const csvStringify = require('csv-stringify');

/* ----------- Lists ----------- */
const regions = [
  'Africa',
  'Antarctica',
  'Asia',
  'Europe',
  'North America',
  'Australia',
  'South America',
];

const genres = [
  'action',
  'international',
  'comedies',
  'scifi',
  'horror',
  'dramas',
  'thriller',
  'romance',
  'docuseries',
  'mysteries',
];

/* ----------- Helpers ----------- */
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

// 1 min = 6000 ms
// basic movie is 90 minutes -> 540000
// 75 minutes (450000) + (up to 60 minutes)

/* ----------- Generate Fake Data ----------- */
const fakeItToMakeIt = (counter) => {
  const notRealArray = [];

  for (let i = 0; i < 1000000; i++) {
    const genreCount = getRandomInt(2) + 1;
    const regionCount = getRandomInt(5) + 3;

    const a = faker.commerce.product();
    const b = faker.commerce.productMaterial();
    const c = faker.commerce.productAdjective();

    const id = i + 1000000 * counter;
    const title = `${a} ${b} ${c}`;
    const genre = [];
    const time = 540000 + (getRandomInt(60) * 6000);
    const licensing = [];
    let original = 0;
    const popularity = getRandomInt(1000);

    for (let j = 0; j < genreCount; j++) {
      genre.push(genres[getRandomInt(genres.length)]);
    }

    for (let j = 0; j < regionCount; j++) {
      licensing.push(regions[getRandomInt(regions.length)]);
    }

    if (getRandomInt(10) > 8) {
      original = 1;
    }

    notRealArray.push({
      id,
      title,
      genre,
      time,
      licensing,
      original,
      popularity,
    });
  }

  console.log('notRealArray finished generating:', notRealArray.length);

  const writeStream = fs.createWriteStream('liesOfTruth.csv', { flags: 'a' });
  const result = notRealArray;
  csvStringify(result, (error, output) => {
    writeStream.write(output, 'utf8');
    writeStream.end();

    console.log('   #inserted:', result.length * counter);
    console.log('');

    if (counter < 10) {
      fakeItToMakeIt(counter + 1);
    } else {
      console.log('');
      console.log('Done with all 10 million');
    }
  });
};

fakeItToMakeIt(0);


// for (let i = 0; i < 10; i++) {
//   const a = faker.commerce.product();
//   const b = faker.commerce.productMaterial();
//   const c = faker.commerce.productAdjective();
//   console.log(a, b, c);
// }
//
// module.exports = (size = 1) => {
//   const notRealArray = [];
//
//   for (let i = 0; i < size; i++) {
//     const genreCount = getRandomInt(2) + 1;
//     const regionCount = getRandomInt(5) + 3;
//
//     const id = i;
//     const title = faker.lorem.words();
//     const genre = [];
//     const time = 540000 + (getRandomInt(60) * 6000);
//     const licensing = [];
//     let original = 0;
//
//     for (let j = 0; j < genreCount; j++) {
//       genre.push(genres[getRandomInt(genres.length)]);
//     }
//
//     for (let j = 0; j < regionCount; j++) {
//       licensing.push(regions[getRandomInt(regions.length)]);
//     }
//
//     if (getRandomInt(10) > 8) {
//       original = 1;
//     }
//
//     notRealArray.push({
//       id,
//       title,
//       genre,
//       time,
//       licensing,
//       original,
//     });
//   }
//   // if (size === 1) return notRealArray[0];
//   return notRealArray;
// };
