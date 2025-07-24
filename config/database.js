// Database configuration
module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Wappnet@123',
    database: process.env.DB_NAME || 'research_portal',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
      statement_timeout: 10000,
      idle_in_transaction_session_timeout: 10000
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    },

  },
  test: {
    username: process.env.TEST_DB_USER || 'postgres',
    password: process.env.TEST_DB_PASSWORD || 'Wappnet@123',
    database: process.env.TEST_DB_NAME || 'research_portal_test',
    host: process.env.TEST_DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
  },
};
