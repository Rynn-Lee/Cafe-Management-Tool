import Image from "next/image";
import editIco from "@icons/edit-white.svg"
import useDialog from "@/hooks/useDialog";

export default function DishPhoto({setSetupStep, setupStep, info, setSelectedImage, setSelectedFile, setFileName, selectedImage}:any){
  const {DialogWindow, ask} = useDialog()

  return(
    <>
    <span className="title">Добавьте изображение блюда &quot;{info.name}&quot;</span>
    <center><span className="hint">* Фото будет отображаться рядом с блюдом </span></center>
    <fieldset className='add-photo'>
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

    {info?.name ? <button onClick={()=>setSetupStep(setupStep + 1)}>Продолжить</button> : ""}
  </>
  )
}