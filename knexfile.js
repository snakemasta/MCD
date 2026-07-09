/**
 * Knexfile for database migrations
 */
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgresql://mcd_user:mcd_password@localhost:5432/mcd_db',
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL_TEST || 'postgresql://mcd_user:mcd_password@localhost:5432/mcd_test',
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
