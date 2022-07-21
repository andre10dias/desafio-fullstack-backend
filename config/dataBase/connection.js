var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'us-cdbr-east-06.cleardb.net',
      user : 'b394ff41690e9a',
      password : '560da60f',
      database : 'heroku_206dd31539ff701',
      timezone: '-03:00'
    }
  });

module.exports = knex