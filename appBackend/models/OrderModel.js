import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      add: { type: String, required: true },
      city: { type: String, required: true },
      pcode: { type: Number, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResults: {
      id: String,
      status: String,
      updata_item: String,
      email_address: String,
    },
    itemPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidOn: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredOn: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;
