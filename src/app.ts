import express, { Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/product/product.routes';
import { OrderRoutes } from './modules/order/order.routes';

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

// Not Found Route
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// initial response check
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Backend Developer..!');
});

export default app;
