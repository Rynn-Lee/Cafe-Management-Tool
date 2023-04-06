import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'
import users from '../../../models/userModel'

type Data = {
  name: String,
}

export default async function addUSer(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const { full_name, password, hire_date, email, job} = req.body
    await connectDB()
    console.log("Connected to DB")
    const userResult= await users.create(req.body)
    res.json(userResult)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
