import {Schema, model, models} from 'mongoose'

const menuSchema: any = new Schema({
  name: String,
  cost: Number,
  category: String,
  description: String,
  filename: String
})

const menu = models.menu || model('menu', menuSchema)
export default menu