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

  product.inventory.quantity -= order.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  return newOrder;
};

const checkAvailableQuantity = async (productId: string) => {
  const product = await Product.findById(productId);
  return product ? product.inventory.quantity : 0;
};

export const orderService = {
  createNewOrder,
  checkAvailableQuantity,
};
