// Update with your config settings.

require('dotenv').config()
const pg = require('pg');

if(process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
};

const sharedConfig = {
  client: 'pg',
  migrations: { directory: './db/migrations'}
}

module.exports = {

  development: {
    ...sharedConfig,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    }
  },

  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 }
  }

};
