const { DataTypes } = require('sequelize');
const database = require('../database/index');
 
const User = database.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    interests: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    term: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    subjects: {
        type: DataTypes.STRING,
        allowNull: true,
    },
})
User.sync({alter: true, force: false})
  .then(() => {
    console.log('User table was (re)created');
  })
  .catch((err) => console.log(err));

module.exports = User;