import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'],
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
});

export const Order = model<TOrder>('Order', orderSchema);
