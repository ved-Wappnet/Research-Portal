const { Sequelize } = require('sequelize');
const config = require('../config/database');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

async function runMigration() {
  let sequelize;
  
  try {
    // Initialize Sequelize
    sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: 'postgres',
        logging: console.log,
      }
    );

    // Add the education column
    await sequelize.getQueryInterface().addColumn('Users', 'education', {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: []
    });

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    if (sequelize) {
      await sequelize.close();
    }
  }
}

runMigration();
