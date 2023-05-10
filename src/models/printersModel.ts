import {Schema, model, models} from 'mongoose'

const printerSchema: any = new Schema({
  name: String,
  category: [String],
  ip: String
})

const printers = models.printers || model('printers', printerSchema)
export default printers