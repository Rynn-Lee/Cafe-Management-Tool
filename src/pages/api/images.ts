import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
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
      return "" + path.originalFilename
    }
  }

  const form = formidable(options)
  return new Promise((resolve, reject)=>{
    form.parse(req, (err, fields, files)=>{
      if(err) reject(err);
      resolve({fields, files})
    })
  })
}

const handler: NextApiHandler = async (req, res) => {
  if(req.method == "POST"){
    console.log("Incoming request: Upload a File")
    try{
      await fs.readdir(path.join(process.cwd() + "/public", "/images"))
    } catch (err) {
      await fs.mkdir(path.join(process.cwd() + "/public", "/images"))
    }
    await readFile(req, true)
    res.json({done: "ok"})
  }

  if(req.method == "DELETE"){
    const query = req.query;
    const images: any = query
    const toDelete: any = Object.values(images)
    const filtered: string[] = toDelete[0].split(',')

    console.log("Images waiting to be obliterated: ", filtered)
    
    filtered.forEach((image: string) => {
      console.log("Image deleted: " + image)
      fs.unlink(process.cwd() + '/public/images/' + image)
    });
  
    res.send({done: "Unlinked succesfully!"})
  }
}

export default handler