import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'

export default async function removeImages(req: NextApiRequest, res: NextApiResponse){
  const { arr } = req.body
  console.log("Images waiting to be obliterated: " + arr.length)

  arr.forEach((image: string) => {
    console.log("Image deleted: " + image)
    fs.unlink(process.cwd() + '/public/images/' + image)
  });

  res.send({done: "Unlinked succesfully!"})
}