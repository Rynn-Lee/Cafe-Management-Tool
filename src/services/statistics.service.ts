const api = "../../api/dailyStatistics"
import axios from "axios"

export const statisticsService = {
  async getDailyStatistics(){

  },
  async finishOrder(order: any){
    const date = new Date()
    const dateNow = `'${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}'`
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
      statistics.menuStatistics = [...statistics.menuStatistics, ...stats.data[0].menuStatistics.filter((statsItem: any) => {
        const filtered = statistics.menuStatistics.find((item: any) => item._id == statsItem._id)
        if(filtered){return}
        return {...stats}
      })]

      // statistics.waitersStatistics = stats.data[0].waitersStatistics.map((item:any) => {
      //   const filtered = stats.data[0].waitersStatistics.find((statsItem: any) => statsItem.name == order.waiter.full_name)
      //   if(filtered){return {name: filtered.name, served: filtered.served + 1}}
      //   return [...stats.data[0].waitersStatistics, ...[{name: order.waiter.full_name, served: 1}]]
      // })
      // console.log("stats waiters", statistics.waitersStatistics)
      // statistics.waitersStatistics = [...stats.data[0].waitersStatistics, ...[{name: order.waiter.full_name, served: stats.data[0].waitersStatistics[0].served + 1}]]
      return await axios.patch(api, {statistics, id: stats.data[0]._id})
    }
  }
}