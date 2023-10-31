const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sequelizenode', 'root', 'Berisa@2122', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;