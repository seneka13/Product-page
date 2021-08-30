import { Sequelize } from 'sequelize';
// const Sequelize = require('sequelize')

const sequelize = new Sequelize('nodejs', 'root', 'seneka130293', {
  dialect: 'mysql',
  host: 'localhost',
});


export default sequelize;
