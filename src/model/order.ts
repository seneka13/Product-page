import { Schema, model, ObjectId, SchemaTypes } from 'mongoose';
import { ProductModel } from './product';
import { UserType } from './user';

interface OrderModel {
  products: {
    product: ProductModel;
    quantity: number;
  }[];
  user: any;
}

const OrderSchema = new Schema({
  products: [
    {
      product: {
        type: Object,
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
  },
});

export const Order = model<OrderModel>('Order', OrderSchema);
