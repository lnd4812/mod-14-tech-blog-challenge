const Sequelize = require('sequelize');

// prevent username/password from being visibly passed to GitHub
require('dotenv').config();

// connection to database
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306
   
});

module.exports = sequelize;