import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

//  Create a New Order
const createNewOrder = async (order: TOrder) => {
  const product = await Product.findById(order.productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const newOrder = new Order(order);
  await newOrder.save();

  // inventory update
  product.inventory.quantity -= order.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  return newOrder;
};


// check inventory quantity
const checkAvailableQuantity = async (productId: string) => {
  const product = await Product.findById(productId);
  return product ? product.inventory.quantity : 0;
};


// Retrieve All Orders
const getAllOrders = async (email?: string) => {
  if (email) {
    return await Order.find({
      email: { $regex: email, $options: 'i' },
    });
  } else {
    return await Order.find();
  }
};

export const orderService = {
  createNewOrder,
  checkAvailableQuantity,
  getAllOrders,
};
