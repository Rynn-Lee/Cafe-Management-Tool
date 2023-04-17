import Image from "next/image"

export default function AddPhoto({setSelectedImage, setSelectedFile, selectedImage, setFileName}: any){

  return(
    <fieldset className='padding-5 margin-10 b-radius-10 square-175 center'>
    <legend>Фото</legend> 
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
          <span className='padding-5 width-150 height-150 center'>Выберите фото</span>
        )}
      </label>
    </fieldset>
  )
}