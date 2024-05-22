import { Request, Response } from 'express';
import { orderService } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData  = req.body;
    const zodParsedData = orderValidationSchema.parse(orderData);

    const availableQuantity = await orderService.checkAvailableQuantity(
      orderData.productId,
    );

    if (availableQuantity < orderData.quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
      return;
    }

    const order = await orderService.createNewOrder(zodParsedData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Order not found',
      error: error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const orders = await orderService.getAllOrders(email as string);

    if (email && orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No orders found for email '${email}'`,
      });
    }
    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully!',
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
export const OrderController = {
  createOrder,
  getAllOrders,
};
