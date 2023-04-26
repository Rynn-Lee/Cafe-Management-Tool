import {Schema, model, models} from 'mongoose'

const categorySchema: any = new Schema({
  title: String
})

const category = models.category || model('category', categorySchema)
export default category