import Image from "next/image";
import plusIco from "@icons/plus.svg"
import tagIco from "@icons/tag.svg"
import listIco from "@icons/list.svg"
import webLinkIco from "@icons/web-link.svg"

export function AddNewPrinter({addPrinter, categories, setNewPrinter, newPrinter, vacantCategories}: any){
  return(
    <form className='form w-max printers-form' onSubmit={addPrinter}>
      <fieldset>
        <legend><Image src={plusIco} className="ico" alt="ico"/>Добавить новый принтер</legend>
        <div className='fields'><span><Image src={tagIco} className="ico35" alt="ico"/>Название</span><input placeholder='Введите Название' value={newPrinter.name} onChange={(e)=>setNewPrinter({...newPrinter, name: e.target.value})}/></div>
        <div className='fields'><span><Image src={listIco} className="ico35" alt="ico"/>Категории</span>
          <ul>
            {categories?.map((item: any) => (
              <li key={item._id}><input type='checkbox' value={item.title} className='categories-checkboxes'/><span> - {item.title}</span></li>
            ))}
          </ul>
        </div>
        <div className='fields'><span><Image src={webLinkIco} className="ico35" alt="ico"/>ip</span><input value={newPrinter.ip} onChange={(e)=>setNewPrinter({...newPrinter, ip: e.target.value})}/></div>
        <button type='submit' disabled={!vacantCategories.length}>{vacantCategories.length ? <><Image src={plusIco} className="ico" alt="ico"/>Добавить</> : <>Нет свободных категорий!</>}</button>
      </fieldset>
    </form>
  )
}