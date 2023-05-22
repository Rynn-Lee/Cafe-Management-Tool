import Image from "next/image"
import messageIco from "@icons/message.svg"

export default function Ingredients({setInfo, info}: any){
  return(
    <fieldset>
      <legend><Image src={messageIco} alt="Image" className="ico"/>Состав [теги]</legend>
      <textarea
        value={info.ingredients}
        onChange={(e) => setInfo({...info, ingredients: e.target.value})}
        placeholder='
Введите ингридиенты использованные в блюде через запятую
К примеру: "Курица, помидоры, огурцы, масло, перец, соль". Необходимо для фильтра по ингридиентам
        '
        required />
    </fieldset>
  )
}