const knex = require('knex');
const path = require('path');

const config = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, '../database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '../database/seeds'),
    },
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, '../database/migrations'),
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, '../database/migrations'),
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

module.exports = db;
