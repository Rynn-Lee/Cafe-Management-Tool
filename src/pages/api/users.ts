import type { NextApiRequest, NextApiResponse } from 'next'
import users from '@/models/userModel'

type Data = {
  name: String,
}

export default async function usersApi(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    if(req.method == "POST"){
      res.json(await users.create(req.body))
    }

    if(req.method == "GET"){
      const user = req.query;
      let result
      
      user.full_name || user.id
        ? user.full_name //if 1
            ? result = await users.findOne({'full_name': user.full_name}) // if 2
            : result = await users.findById(user.id) // else 2
        : result = await users.find({}) //else 1

      res.json(result as any)
    }
    
    if(req.method == "DELETE"){
      const id = req.query;
      let result

      id._id
        ? result = await users.deleteOne(id)
        : result = await users.deleteMany({})
      res.json(result as unknown as Data)
    }
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}