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

const imagesApi: NextApiHandler = async (req, res) => {
  if(req.method == "POST"){
    try{
      await fs.readdir(path.join(process.cwd() + "/public", "/images"))} 
    catch(err){
      await fs.mkdir(path.join(process.cwd() + "/public", "/images"))}
    await readFile(req, true)
    res.json({done: "ok"})
  }

  if(req.method == "DELETE"){
    const images = req.query;
    const toDelete: any = Object.values(images)
    const filtered: string[] = toDelete[0].split(',')
    if(!filtered.length || filtered[0] == ''){
      res.json({error: "Нет изображений для удаления"})
      return
    }

    filtered.forEach((image: string, index: number) => {
      console.log(`#${index} - Image deleted:  + ${image}`)
      fs.unlink(process.cwd() + '/public/images/' + image)
    });
    res.send({info: "Лишние изображения удалены!"})
  }
}

export default imagesApi