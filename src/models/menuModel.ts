import {Schema, model, models} from 'mongoose'

const menuSchema: any = new Schema({
  name: String,
  cost: Number,
  category: String,
  ingredients: [String],
  available: Boolean,
  filename: String,
  weight: {
    number: String,
    value: String
  }
})

const menu = models.menu || model('menu', menuSchema)
export default menu