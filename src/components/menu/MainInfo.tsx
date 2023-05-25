import lightbulbIco from '@icons/lightbulb.svg'
import Image from "next/image";

export default function MainInfo({info, setInfo, categories, setDefaultValue, defaultValue}: any){
  return(
    <fieldset className='px-6 py-2'>
      <legend><Image src={lightbulbIco} alt="Image" className="ico"/>Основная информация</legend>
        <div className='fields'><span>* Название</span><input value={info.name} className='right-input' onChange={(e) => setInfo({...info, name: e.target.value})} required/></div>
        <div className='fields'><span>* Цена</span><input value={info.cost} type='number' className='right-input' onChange={(e) => setInfo({...info, cost: e.target.value})} required/></div>
        <div className='fields'><span>* Вес</span>
          <input value={info.weight?.number} type='number' className='right-input' onChange={(e) => setInfo({...info, weight: {...info.weight, number: e.target.value}})} required/>
          <select className='w-20' onChange={(e)=>{setInfo({...info, weight: {...info.weight, value: e.target.value}}); setDefaultValue(e.target.value)}} value={defaultValue}>
            <option value={"штука"}>шт.</option>
            <option value={"грамм"}>гр.</option>
            <option value={"килограмм"}>кг.</option>
          </select>
        </div>
        <div className='fields'><span>* Категория</span>
          <select className='right-input' onChange={(e)=>{setInfo({...info, category: e.target.value}); setDefaultValue(e.target.value)}} value={defaultValue}>
            <option value="none" hidden>Выберите категорию блюда</option>
            {categories?.data?.map((category: any) => (
              <option key={category?.title} value={category?.title}>{category?.title}</option>
            )).reverse()}
          </select>
        </div>
        <div className='fields'><span>Доступно после добавления? | <input type='checkbox' onChange={(e) => setInfo({...info, available: e.target.checked})}/></span></div>
      </fieldset>
  )
}