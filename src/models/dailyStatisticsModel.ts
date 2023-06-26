import {Schema, model, models} from 'mongoose'

const dailyStatisticsSchema: any = new Schema({
  date: String,
  menuStatistics: [{
    name: String,
    amountOfOrders: Number,
  }],
  waitersStatistics: [{
    name: String,
    serverd: Number
  }]
})

const dailyStatistics = models.dailyStatistics || model('dailyStatistics', dailyStatisticsSchema)
export default dailyStatistics