import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/ClearAndFillProducts.js';
import ProductRoute from './routes/ProductRoute.js';

dotenv.config();
const app = express();

mongoose.connect(process.env.Mongodb_URL)
.then(()=> console.log('Connected to db')).catch((err)=> console.log(err.message));

app.use('/product/reset', seedRouter);
app.use('/product', ProductRoute);

app.listen('4000',()=> console.log('Server is active on http://localhost:4000'));