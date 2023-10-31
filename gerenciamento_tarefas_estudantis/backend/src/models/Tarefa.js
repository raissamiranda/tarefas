const { DataTypes } = require('sequelize');
const database = require('../database/index');

const User = require('./User');

const Tarefa = database.define('Tarefa', {
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

  deadline: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  activity: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

Tarefa.sync({alter: true, force: false})
  .then(() => {
    console.log('Tarefa table was (re)created');
  })
  .catch((err) => console.log(err));

module.exports = Tarefa;