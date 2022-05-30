const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// create Post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        
        post_title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        post_link: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },

        post_body: {
            type: DataTypes.STRING(1234),
            allowNull: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;