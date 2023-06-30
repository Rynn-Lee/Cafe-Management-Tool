import {Schema, model, models} from 'mongoose'

const dailyStatisticsSchema: any = new Schema({
  date: Date,
  menuStatistics: [{
    name: String,
    amountOfOrders: Number,
  }],
  waitersStatistics: [{
    name: String,
    served: Number
  }]
})

const dailyStatistics = models.dailyStatistics || model('dailyStatistics', dailyStatisticsSchema)
export default dailyStatistics