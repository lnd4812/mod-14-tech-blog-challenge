const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

// set up table structure
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: FontFaceSetLoadEvent,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password:   {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6] // establish minimum length at 6 characters 
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;