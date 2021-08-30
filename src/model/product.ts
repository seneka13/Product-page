import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';

export interface ProductType {
  readonly id: number;
  title: string;
  price: number;
  description: string;
  imgUrl: string;
  readonly userId?: number;
}

interface ProductTypeAttributes extends Optional<ProductType, 'id'> {}

class Product extends Model<ProductType, ProductTypeAttributes> implements ProductType {
  public id!: number;
  public title!: string;
  public price!: number;
  public description!: string;
  public imgUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
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
  },
  { sequelize, modelName: 'product' }
);

export default Product;

// export const Product = sequelize.define<ProductType>('product', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: DataTypes.STRING,
//   price: {
//     type: DataTypes.DOUBLE,
//     allowNull: false,
//   },
//   imgUrl: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });
