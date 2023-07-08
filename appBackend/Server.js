import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/SeedRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import userRouter from './routes/UserRoute.js';
import orderRouter from './routes/OrderRoute.js';
// import cors from 'cors';
import path from 'path';

dotenv.config();
const app = express();

// const corsOptions = {
//   origin: 'https://e-commerce-website-frontend-uv84.onrender.com',
// };
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsOptions));

mongoose
  .connect(process.env.Mongodb_URL)
  .then(() => {
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/seed', seedRouter);
app.use('/product', ProductRoute);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});

// app.get('/', (req, res) => {
//   res.status(201).json({ message: 'Connected to Backend!' });
// });

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/shopnow/build')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/shopnow/build/index.html'))
);

// app.listen('4000', () =>
//   console.log('Server is active on http://localhost:4000')
// );
