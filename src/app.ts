import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

// Routes
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
