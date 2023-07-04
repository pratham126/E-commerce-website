import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/ResetdbRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import userRouter from './routes/UserRoute.js';
import orderRouter from './routes/OrderRoute.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.Mongodb_URL)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log(err.message));

app.use('/product/reset', seedRouter);
app.use('/product', ProductRoute);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.listen('4000', () =>
  console.log('Server is active on http://localhost:4000')
);
