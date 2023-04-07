import users from '@/models/userModel';
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'

type Data = {
  name: String,
}

export default async function findOne(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const query = req.query;
    const user = query

    await connectDB()
    console.log("Searching for exact user!")
    let foundUser

    if(user.full_name)
      foundUser = await users.findOne({'full_name': user.full_name})
    else
      foundUser = await users.findById(user.id)

    res.json(foundUser as unknown as Data)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
