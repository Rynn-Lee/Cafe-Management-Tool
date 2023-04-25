import Image from "next/image"
import imageIco from "@icons/image.svg"

export default function AddPhoto({setSelectedImage, setSelectedFile, selectedImage, setFileName}: any){

  return(
    <fieldset className='add-photo'>
    <legend><Image src={imageIco} alt="Image" className="ico"/>Фото</legend> 
      <label>
        <input type='file' hidden onChange={({ target }) => {
          if(target.files){
            const file = target.files[0];
            if(!file){return}
            const newFile = new File([file], Date.now().toString() + "_" + file.name)
            setSelectedImage(URL.createObjectURL(newFile))
            setSelectedFile(newFile)
            setFileName(newFile.name)
          }
        }}/>
        {selectedImage ? (
          <Image src={selectedImage} alt="" fill className="img-fill round-10"/>
        ):(
          <span className='photo'>Выберите фото</span>
        )}
      </label>
    </fieldset>
  )
}