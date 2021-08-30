import { DataTypes, Model, Sequelize } from 'sequelize';
import { CartType } from '../types';
import sqlize from '../utils/database';

export interface UserType extends Model {
  readonly id: number;
  name: string;
  email: string;
  createCart: () => Promise<CartType>;
}

export const User = sqlize.define<UserType>('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});
