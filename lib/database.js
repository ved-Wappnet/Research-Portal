const { Sequelize } = require('sequelize');
const config = require('../config/database');
const pg = require('pg');
// Get environment (default to 'development' if not set)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];


let sequelize;

try {
  // If using DATABASE_URL (production)
  if (dbConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[dbConfig.use_env_variable], {
      ...dbConfig,
      dialect: 'postgres',
      logging: dbConfig.logging,
      define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true
      }
    });
  } else {
    // For development/test with explicit config
    const sequelizeConfig = {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: dbConfig.logging,
      dialectOptions: dbConfig.dialectOptions || {},
      pool: dbConfig.pool || {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true
      }
    };

   sequelize = new Sequelize('postgres://postgres:Wappnet@123@localhost:5432/research_portal', {
      dialect: 'postgres',
      dialectModule: pg
    });
  }

  // Test the connection immediately
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connection has been established successfully.');
      
      // Sync all models with force: false to prevent data loss
      await sequelize.sync({ 
        alter: false, // Don't auto-alter tables
        force: false  // Don't drop tables
      });
      console.log('✅ Database synchronized');
      
      // Check if we need to migrate the role column
      const queryInterface = sequelize.getQueryInterface();
      const tableDescription = await queryInterface.describeTable('Users');
      
      if (tableDescription.role && tableDescription.role.type === 'USER-DEFINED') {
        console.log('🚀 Starting role column migration from ENUM to INTEGER...');
        
        try {
          // First, create a temporary column
          await queryInterface.addColumn('Users', 'role_temp', {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          });
          
          // Copy and convert data
          await queryInterface.sequelize.query(`
            UPDATE "Users" 
            SET "role_temp" = CASE 
              WHEN role::text = 'AUTHOR' THEN 0
              WHEN role::text = 'REVIEWER' THEN 1
              WHEN role::text = 'EDITOR' THEN 2
              ELSE 0
            END
          `);
          
          // Drop the old column
          await queryInterface.removeColumn('Users', 'role');
          
          // Rename the temp column
          await queryInterface.renameColumn('Users', 'role_temp', 'role');
          
          console.log('✅ Successfully migrated role column from ENUM to INTEGER');
        } catch (migrationError) {
          console.error('❌ Role column migration failed:', migrationError);
          // Try to clean up if something went wrong
          try {
            await queryInterface.removeColumn('Users', 'role_temp');
          } catch (cleanupError) {
            console.warn('⚠️ Failed to clean up temporary column:', cleanupError.message);
          }
          
          // Try an alternative approach
          try {
            console.log('🔄 Trying alternative migration approach...');
            await queryInterface.sequelize.query(`
              ALTER TABLE "Users" 
              ALTER COLUMN "role" 
              TYPE INTEGER 
              USING (CASE 
                WHEN role::text = 'AUTHOR' THEN 0
                WHEN role::text = 'REVIEWER' THEN 1
                WHEN role::text = 'EDITOR' THEN 2
                ELSE 0
              END);
            `);
            console.log('✅ Successfully migrated role column using alternative approach');
          } catch (altError) {
            console.error('❌ Alternative migration approach failed:', altError);
            throw new Error('Failed to migrate role column. Please check the database schema manually.');
          }
        }
      }
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error);
      process.exit(1); // Exit with error
    }
  })();
} catch (error) {
  console.error('❌ Failed to initialize database:', error);
  process.exit(1); // Exit with error
}

// Initialize models
const User = require('../models/UserSequelize')(sequelize);

const db = {
  sequelize,
  Sequelize,
  User,
};

module.exports = db;
