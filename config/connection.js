const Sequelize = require('sequelize');

// prevent username/password from being visibly passed to GitHub
require('dotenv').config();

// connection to database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW,  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
   
});


module.exports = sequelize;