const pgp = require('pg-promise')({
    query: e => {
    }
});

const options = {
    host: 'localhost',
    database: 'golfcourseapp',
    password: 'Fiddle123'
};
const db = pgp(options);

module.exports = db;