import {Schema, model, models} from 'mongoose'

const dailyStatisticsSchema: any = new Schema({
  date: Date,
  menuStatistics: [{
    name: String,
    amount: Number,
    _id: String
  }],
  waitersStatistics: [{
    name: String,
    served: Number,
    _id: String
  }]
})

const dailyStatistics = models.dailyStatistics || model('dailyStatistics', dailyStatisticsSchema)
export default dailyStatistics