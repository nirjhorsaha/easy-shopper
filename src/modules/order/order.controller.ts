import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { orders: orderData } = req.body;
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
export const OrderController = {
  createOrder,
};
