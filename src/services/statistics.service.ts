const api = "../../api/dailyStatistics"
import axios from "axios"

export const statisticsService = {
  async getDailyStatistics(){

  },
  async finishOrder(order: any){
    const date = new Date()
    const dateNow = `'${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}'`
    const stats: any = await axios.get(api + "?filter=" + JSON.stringify({'date': new Date(dateNow)}))
    console.log("stats: ", stats.data)

    const statistics = {
      date: dateNow,
      menuStatistics: [] as any,
      waitersStatistics: [] as any,
    }

    if(!stats.data.length){
      statistics.menuStatistics = order.cart.map((item: any) => ({name: item.name, amount: item.amount}))
      statistics.waitersStatistics = [{name: order.waiter.full_name, served: 1}]
      console.log("statistics: ", statistics)
      return await axios.post(api, {statistics})
    }
    else{
      statistics.menuStatistics = stats.data[0].menuStatistics.map((item:any) => item)
      statistics.menuStatistics = [...statistics.menuStatistics, ...order.cart.map((item: any) => ({name: item.name, amount: item.amount}))]
      console.log("FinaleeEEeeEE: ", statistics)
    }
    
  }
}