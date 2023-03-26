import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'
import users from '../../../models/userModel'

type Data = {
  name: String,
}

export default async function addUSer(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const { full_name, password, hire_date, email} = req.body

  console.log("Connecting to DB...")
  await connectDB()
  console.log("Connected!")

  console.log("Creating document...")
  const userResult= await users.create(req.body)
  console.log("Created!")

  res.json(userResult)
  }
  catch(error){
    console.log(error)
    res.json(error)
  }
}
