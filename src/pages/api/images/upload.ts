import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from 'fs/promises'

export const config = {
  api: {
    bodyParser: false,
  }
}

const readFile = (req: NextApiRequest, saveLocally?: boolean):Promise<{fields: formidable.Fields, files: formidable.Files}> => {
  const options: formidable.Options = {};
  
  if(saveLocally){
    options.uploadDir = path.join(process.cwd(), "/public/images")
    options.filename = (name, ext, path, form) => {
      return "_" + path.originalFilename
    }
  }

  const form = formidable(options)
  return new Promise((resolve, reject)=>{
    form.parse(req, (err, fields, files)=>{
      console.log("Fields",fields)
      if(err) reject(err);
      resolve({fields, files})
    })
  })
}

const handler: NextApiHandler = async (req, res) => {
  console.log("Incoming request: Upload a File")
  try{
    await fs.readdir(path.join(process.cwd() + "/public", "/images"))
  } catch (err) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images"))
  }
  await readFile(req, true)
  res.json({done: "ok"})
}

export default handler