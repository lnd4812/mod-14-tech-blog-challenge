const Sequelize = require('sequelize');

// prevent username/password from being visibly passed to GitHub
require('dotenv').config();

// connection to database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,  {
    // host: 'cxmgkzhk95kfgbq4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
   
});

module.exports = sequelize;