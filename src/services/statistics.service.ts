const api = "../../api/dailyStatistics"
import { getDateNow } from "@/utils/getDate"
import axios from "axios"

export const statisticsService = {
  async finishOrder(order: any, waiterServed: any){
    const dateNow: any = getDateNow('classic')
    const stats: any = await axios.get(api + "?filter=" + JSON.stringify({'date': new Date(dateNow)}))
    const statistics: any = {
      date: dateNow,
      menuStatistics: [] as any,
      waitersStatistics: [] as any,
    }

    if(!stats.data.length){
      statistics.menuStatistics = order.cart.map((item: any) => ({name: item.name, amount: item.amount, _id: item._id}))
      order.waiter._id == waiterServed._id
        ? statistics.waitersStatistics = [{name: waiterServed.full_name, served: 1, servedOthers: 0, _id: waiterServed._id}]
        : statistics.waitersStatistics = [{name: waiterServed.full_name, served: 0, servedOthers: 1, _id: waiterServed._id}]
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

      const filtered = stats.data[0].waitersStatistics.find((statsItem: any) => statsItem._id == waiterServed._id)
      statistics.waitersStatistics = filtered 
      ? stats.data[0].waitersStatistics.map((waiter: any) => waiter._id == waiterServed._id
        ? waiter._id == order.waiter._id
          ? ({...waiter, served: waiter.served + 1})
          : ({...waiter, servedOthers: waiter.servedOthers + 1})
        : waiter)
      : waiterServed._id == order.waiter._id
        ? [...stats.data[0].waitersStatistics, {name: waiterServed.full_name, served: 1, servedOthers: 0, _id: waiterServed._id}]
        : [...stats.data[0].waitersStatistics, {name: waiterServed.full_name, served: 0, servedOthers: 1, _id: waiterServed._id}]
        
      return await axios.patch(api, {statistics, id: stats.data[0]._id})
    }
  }
}