import type { NextApiRequest, NextApiResponse } from 'next'
import users from '@/models/userModel'

type Data = {
  name: String,
}

export default async function Remove(req: NextApiRequest, res: NextApiResponse<Data>){
  try{

    const query = req.query;
    const id = query
    let result
    
    if(id._id){
      console.log(`Incoming request: Remove one user - ${id._id}`)
      result = await users.deleteOne(id)
    }
    else{
      console.log(`Incoming request: Remove ALL users`)
      result = await users.deleteMany({})
    }

    res.json(result as unknown as Data)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
