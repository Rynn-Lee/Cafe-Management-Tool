import type { NextApiRequest, NextApiResponse } from 'next'
import menu from '@/models/menuModel'

type Data = {
  name: String,
}

export default async function RemoveMenu(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const query = req.query;
    const id = query
    let result
    
    if(id._id){
      console.log(`Incoming request: Remove one dish - ${id._id}`)
      result = await menu.deleteOne(id)
    }
    else{
      console.log(`Incoming request: Remove ALL dishes`)
      result = await menu.deleteMany({})
    }

    res.json(result as unknown as Data)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
