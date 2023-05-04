import Image from "next/image"
import { useEffect, useState } from "react"
import searchIco from '@icons/search.svg'


export default function SelectOrder({selectedItem, menu}:any) {
  const [query, setQuery] = useState<any>()
  const [search, setSearch] = useState<any>()

  
  useEffect(()=>{
      if(query){
        setSearch(menu.filter((item: any) => item.name.toLowerCase().includes(query.toLowerCase())))
        return
      }
      setSearch(menu)
      console.log(menu)
  },[menu, query])


  return (
    <><div className='form'>
      <Image src={searchIco} alt="search" className="ico" /><input placeholder='Поиск по названию' onChange={(e) => setQuery(e.target.value)} className='right-input'/>
    </div>
    <div className="menu-waiter">
      {search?.map((item: any, index: number)=>(
        <div className={`horizontal menu-waiter-dish${!item.available ? "unavailable" : ""}`} key={index} onClick={()=>selectedItem(item)}>
          <div>
            <div>
              <span className="title">{item.name}</span>
              <span className="cost">{item.cost} тг.</span>
            </div>
            <Image src={"/images/" + item.filename} alt="image" width={400} height={400} className="img-fill2"/>
          </div>
        </div>
      ))}
    </div></>
  )
}