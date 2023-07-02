import type { NextApiRequest, NextApiResponse } from 'next'
import dailyStatistics from '@/models/dailyStatisticsModel'

type Data = { name: String }

export default async function statisticsApi(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    if(req.method == "GET"){
      const filter: any = req.query.filter;
      const query = JSON.parse(filter)
      const result = await dailyStatistics.find(query)
      res.json(result as any)
    }
    if(req.method == "POST"){
      const {statistics} = req.body 
      res.json(await dailyStatistics.create(statistics))
    }
    if(req.method == "PATCH"){
      const {statistics, id} = req.body 
      res.json(await dailyStatistics.updateOne({_id: id}, statistics) as any)
    }
    if(req.method == "DELETE"){
      const id: any = req.query.id;
      const result = await dailyStatistics.deleteOne({"_id": id})
      res.json(result as any)
    }
  } catch (error) {
      console.log(error)
      res.json(error as Data)
  }
}