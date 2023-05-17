import type { NextApiRequest, NextApiResponse } from 'next'
import users from '@/models/userModel'

type Data = {
  name: String,
}

export default async function addUSer(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    if(req.method == "POST"){
      const { full_name } = req.body
      console.log(`Incoming request: Add new user - ${full_name}`)
      const userResult= await users.create(req.body)
      res.json(userResult)
    }
    if(req.method == "GET"){
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
    if(req.method == "DELETE"){
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
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}