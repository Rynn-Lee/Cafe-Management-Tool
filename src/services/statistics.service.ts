const api = "../../api/dailyStatistics"
import { getDateNow } from "@/utils/getDate"
import axios from "axios"

export const statisticsService = {
  async getDailyStatistics(){

  },
  async finishOrder(order: any){
    const dateNow: any = getDateNow('classic')
    const stats: any = await axios.get(api + "?filter=" + JSON.stringify({'date': new Date(dateNow)}))

    const statistics: any = {
      date: dateNow,
      menuStatistics: [] as any,
      waitersStatistics: [] as any,
    }

    if(!stats.data.length){
      statistics.menuStatistics = order.cart.map((item: any) => ({name: item.name, amount: item.amount, _id: item._id}))
      statistics.waitersStatistics = [{name: order.waiter.full_name, served: 1}]
      return await axios.post(api, {statistics})
    }
    else{

      statistics.menuStatistics = order.cart.map((item:any) => {
        const filtered = stats.data[0].menuStatistics.find((statsItem: any) => statsItem._id == item._id)
        if(filtered){return {name: filtered.name, amount: filtered.amount + item.amount, _id: filtered._id}}
        return {name: item.name, amount: item.amount, _id: item._id}
      })
  
      statistics.menuStatistics.push(...stats.data[0].menuStatistics.filter((statsItem: any) => {
        const foundItem = statistics.menuStatistics.find((item: any) => item._id == statsItem._id);
        return !foundItem;
      }));

      const filtered = stats.data[0].waitersStatistics.find((statsItem: any) => statsItem.name == order.waiter.full_name)
      statistics.waitersStatistics = filtered 
      ? stats.data[0].waitersStatistics.map((item: any) => filtered.name == order.waiter.full_name ? ({...item, served: item.served + 1}) : ({name: order.waiter.full_name, served: 1}))
      : [...stats.data[0].waitersStatistics, {name: order.waiter.full_name, served: 1}]

      console.log(statistics.date)
      console.log(order.waiter.full_name)
      console.log(statistics.waitersStatistics)
      console.log(stats.data[0].waitersStatistics.length)
      return await axios.patch(api, {statistics, id: stats.data[0]._id})
    }
  }
}