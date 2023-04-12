import type { NextApiRequest, NextApiResponse } from 'next'
import users from '@/models/userModel'

type Data = {
  name: String,
}

export default async function addUser(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const query = req.query;
    const user = query
    let result
    
    if(user.full_name || user.id){
      console.log(`Incoming request: Find one user - ${user.full_name}`)
      if(user.full_name) result = await users.findOne({'full_name': user.full_name})
      else result = await users.findById(user.id)
    }
    else{
      console.log(`Incoming request: Find ALL users`)
      result = await users.find({})
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
