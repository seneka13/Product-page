import { DataTypes, Model, Sequelize } from 'sequelize';
import sqlize from '../utils/database';

interface UsetType extends Model {
  readonly id: number;
  name: string;
  email: string;
}

const User = sqlize.define<UsetType>('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});
