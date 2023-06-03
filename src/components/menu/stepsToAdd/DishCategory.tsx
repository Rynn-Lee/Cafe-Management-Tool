import Image from "next/image";
import editIco from "@icons/edit-white.svg"

export default function DishCategory({setSetupStep, setupStep, info, setInfo, setDefaultValue, defaultValue, categories}:any){
  return(
    <>
    <span className="title">Добавьте категорию и состав блюду &quot;{info.name}&quot;</span>
    <center><span className="hint">* Ввыберите подходящую категорию для блюда</span></center>
    
    <div>
      <Image src={editIco} alt="ico" className="ico revert"/>
      <select className='printer-select !w-max' onChange={(e)=>{setInfo({...info, category: e.target.value}); setDefaultValue(e.target.value)}} value={defaultValue}>
        <option value="none" hidden>Выберите категорию</option>
        {categories?.data?.map((category: any) => (
          <option key={category?.title} value={category?.title}>{category?.title}</option>
        )).reverse()}
      </select>
    </div>

    {info.category ? 
      <><br />
        <center><span className="hint">* Введите состав блюда</span></center>
        <center><span className="hint">* Необходимо для работы фильтра и быстрого поиска</span></center>
        <center><span className="hint">* Пример: &quot;Курица, соус, приправы, соль, вода&quot;</span></center>
        <fieldset>
        <legend>Состав [теги]</legend>
          <textarea
            value={info.ingredients}
            onChange={(e) => setInfo({...info, ingredients: e.target.value})}
            placeholder='Введите состав'
            className="w-96"
            required />
      </fieldset>
      </>
    : ""}

    {info?.name ? <button onClick={()=>setSetupStep(setupStep + 1)}>Продолжить</button> : ""}
  </>
  )
}