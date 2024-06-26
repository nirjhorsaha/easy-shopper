import express, { Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/product/product.routes';
import { OrderRoutes } from './modules/order/order.routes';
import globalErrorHandler from './middleware/globalErrorHandler';

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

// initial response check
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Backend Developer..!');
});

// Not Found Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// global error handler
app.use(globalErrorHandler);

export default app;
