import express, { Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/product/product.routes';

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', ProductRoutes);
// app.use('/api/orders', orderRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello Backend Developer..!');
});

export default app;
