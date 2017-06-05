module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/providerswap_dev',
    migrations : {
      directory: __dirname + '/server/migrations'
    },
    seeds: {
      directory: __dirname + '/server/seeds/dev'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/providerswap_test',
    migrations : {
      directory: __dirname + '/server/migrations'
    },
    seeds: {
      directory: __dirname + '/server/seeds/test'
    }
   },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations : {
      directory: __dirname + './server/db/migrations'
    },
    seeds: {
      directory: __dirname + './server/db/seeds/production'
    }
   },

};
