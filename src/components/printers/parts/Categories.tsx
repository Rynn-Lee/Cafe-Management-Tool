import Image from 'next/image'
import addIco from '@icons/plus-square.svg'
import deleteIco from '@icons/trash-red.svg'
import { useState } from 'react'

export function Categories({setNewCategory, newCategory, vacantCategories, ask, printer, removeCategory, addCategory}: any){

  const [defaulValue, setdefaulValue] = useState("")
  const handleCategory = (printer: any, newCategory: any) => {
    addCategory(printer, newCategory)
    setdefaulValue("")
  }

  return(
    <fieldset>
      <legend>Categories</legend>
      {vacantCategories.length ? <>
      <div>
        <select onChange={(e)=>{setNewCategory(e.target.value); setdefaulValue(e.target.value)}} value={defaulValue}>
          <option value="" disabled>Choose a category</option>
          {vacantCategories.map((category: any, index: number)=>(
            <option key={category._id} value={category.title}>{category.title}</option>
          ))}
        </select>
        <button onClick={()=>ask(`Add category "${newCategory}" to printer "${printer.name}"?`, ()=>handleCategory(printer, newCategory))}>
          <Image src={addIco} alt="right" className='ico4'/>
        </button>
      </div>
      </> : ""}
      {printer?.category?.map((el: any)=>(
        <span key={el}>
          <Image src={deleteIco} alt="delete" className='ico3 revert'
            onClick={()=>ask(`Remove category "${el}" from printer "${printer.name}"?`, ()=>removeCategory(printer, el))}/>
          <span>{el}<br/></span>
        </span>
      ))}
    </fieldset>
  )
}