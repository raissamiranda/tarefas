const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sequelizenode', 'root', '@Gabi2803', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;