import connectDB from '@/lib/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  DBresponse: string
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>){
  console.log("Incoming connection request!")
  connectDB()
  console.log("Connected!")
  res.status(200).json({ DBresponse: 'Lemmi sleep! What do you want???' })
}
