import Image from "next/image"
import { useEffect, useState } from "react"
import searchIco from '@icons/search.svg'
import closeIco from '@icons/close.svg'
import trashIco from '@icons/trash.svg'
import infoIco from '@icons/list2.svg'
import useDialog from "@/hooks/useDialog"


export default function SelectOrder({selectedItem, menu, clearOrder, order, removeOne}:any) {
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
          {order ? <button onClick={()=>ask("Очистить выбор?", clearOrder)}><Image src={trashIco} alt="ico" className="ico3"/>Очистить заказ</button> : ""}
        </div>
      </div>
      <div className="menu-waiter">
        {search?.map((item: any, index: number)=>(
          <div className={`vertical menu-waiter-dish${!item.available ? "unavailable" : ""}`} key={index}>
            <div className="images">
              <Image src={infoIco} className="ico4" alt="info"/>
              {item.amount ? <span>Выбрано: {item.amount * item.weight.amount}{item.weight?.value} ({item.amount} шт)</span> : ""}
              <Image src={`/images/${item.filename}`} width={400} height={400} alt="dish"/>
            </div>
            <div className="infoblock">
              <span className="title">{item.name}</span>
              <div>
                <div>
                  <button disabled={!item.amount} onClick={()=>removeOne(item._id)}>Убрать</button>
                  <button onClick={()=>selectedItem(item)}>Добавить</button>
                </div>
                <div>
                  <span className="cost">{item.cost} ₸ / {item.weight?.amount} {item.weight?.value}</span>
                </div>
              </div>
            </div>
          </div>
        )).reverse()}
        <DialogWindow/>
      </div>
    </>
  )
}

//()=>removeOne(item._id)
//()=>selectedItem(item)