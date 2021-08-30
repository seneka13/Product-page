import { DataTypes, Model } from 'sequelize';
import sqlize from '../utils/database';

export interface ProductType extends Model {
  readonly id: number;
  title: string;
  price: number;
  description: string;
  imgUrl: string;
}

export const Product = sqlize.define<ProductType>('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
