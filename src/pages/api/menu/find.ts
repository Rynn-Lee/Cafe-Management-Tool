import type { NextApiRequest, NextApiResponse } from 'next'
import menu from '@/models/menuModel'

type Data = {
  name: String,
}

export default async function findMenu(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const query = req.query;
    const dish = query
    let result
    
    if(dish.id){
      console.log(`Incoming request: Find one dish - ${dish.id}`)
      result = await menu.findOne({'_id': dish.id})
    }
    else{
      console.log(`Incoming request: Find ALL dishes`)
      result = await menu.find({})
    }
    res.json(result as unknown as Data)
  }
  catch(error){
    console.log(error)
    return {
      notFound: true,
    };
  }
}
