import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createNewOrder = async (order: TOrder) => {
  const product = await Product.findById(order.productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const newOrder = new Order(order);
  await newOrder.save();



  return newOrder;
};



export const orderService = {
  createNewOrder,
  checkAvailableQuantity,
};
