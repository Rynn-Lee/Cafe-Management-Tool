import {Schema, model, models} from 'mongoose'

const orderSchema: any = new Schema({
  
})

const orderModel = models.orders || model('orders', orderSchema)
export default orderModel