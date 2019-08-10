// require('dotenv').config();

const { Model } = require('objection');
const Knex = require('knex');

// const knex = Knex({
  const knexSettings = {
  client: 'pg',
  dialect: 'postgresql',
  connection: {
    host: '/var/run/postgresql',
    port: 5432,
    database: 'bookmarked_dev'
  },
  // connection: {
  //   username: 'hatsumei',
  //   password: 'hatsu_dev',
  //   port: 5432,
  //   database: 'bookmarked_dev'
  // },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migrations'
  }
};

const knex = Knex(knexSettings)

Model.knex(knex);

module.exports = knexSettings;

/**
 * // Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

 */