import Image from "next/image"
import { useEffect, useState } from "react"
import searchIco from '@icons/search.svg'
import closeIco from '@icons/close.svg'
import trashIco from '@icons/trash.svg'
import useDialog from "@/hooks/useDialog"


export default function SelectOrder({selectedItem, menu, clearOrder, cart, removeOne}:any) {
  const [query, setQuery] = useState<any>()
  const [search, setSearch] = useState<any>()
  const {DialogWindow, ask} = useDialog()

  
  useEffect(()=>{
      if(query){
        setSearch(menu.filter((item: any) => item.name.toLowerCase().includes(query.toLowerCase())))
        return
      }
      setSearch(menu)
  },[menu, query])


  return (
    <>
      <div className='form'>
        <div className="menu-actions">
          <div>
            <Image src={searchIco} alt="search" className="ico" />
            <input placeholder='Поиск по названию' value={query} onChange={(e) => setQuery(e.target.value)} className='right-input'/>
            <Image src={closeIco} alt="search" className="ico3" onClick={()=>setQuery("")}/>
          </div>
          {cart ? <button onClick={()=>ask("Очистить выбор?", clearOrder)}><Image src={trashIco} alt="ico" className="ico3"/>Очистить заказ</button> : ""}
        </div>
      </div>
      <div className="menu-waiter">
        {search?.map((item: any, index: number)=>(
          <div className={`horizontal menu-waiter-dish${!item.available ? "unavailable" : ""}`} key={index}>
            <div onClick={()=>selectedItem(item)}>
              <div className={`${item.amount ? "cost-full" : ""}`}>
                <span className="title">{item.name}</span>
                <span className="cost">{item.cost} тг.</span>
                
              </div>
              <Image src={"/images/" + item.filename} alt="image" width={400} height={400} className="img-fill2"/>
            </div>
            {item.amount ?
            <div>
              <span className="amount">{item.amount}<span>шт.</span></span>
              <span className="remove2" onClick={()=>removeOne(item._id)}><Image src={closeIco} alt="remove" className="ico3"/>Убрать</span>
            </div> : ""}
          </div>
        ))}
        <DialogWindow/>
      </div>
    </>
  )
}