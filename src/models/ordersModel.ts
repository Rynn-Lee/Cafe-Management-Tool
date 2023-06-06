import {Schema, model, models} from 'mongoose'

const orderSchema: any = new Schema({
  cart: [
    {
      amount: Number,
      available: Boolean,
      category: String,
      cost: Number,
      filename: String,
      ingredients: [String],
      name: String,
      weight: {
        amount: Number,
        value: String
      }
    }
  ],
  table: String,
  totalCost: Number,
  waiter:{
    full_name: String,
    _id: String
  }
})

const orderModel = models.orders || model('orders', orderSchema)
export default orderModel