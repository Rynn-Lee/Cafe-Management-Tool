import users from '@/models/userModel';
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'

type Data = {
  name: String,
}

export default async function findOne(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const query = req.query;
    const name = query

    await connectDB()
    console.log("Searching for exact user!")
    const foundUser = await users.findOne({'full_name': name.full_name})

    res.json(foundUser as unknown as Data)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
