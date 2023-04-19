import Image from "next/image";
import { useEffect, useState } from "react";
import removeIco from '@/assets/icons/removeFile.svg'

export default function MenuList({menu, query, deleteDish}: any){
  const [search, setSearch] = useState<any>([])

  const newQuery = () =>{
    if(query){
      setSearch(menu.filter((item: any) => item.name.toLowerCase().includes(query.toLowerCase())))
      return
    }
    setSearch(menu)
  }

  useEffect(()=>{
    newQuery()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, menu])

  return(
    <div className="menu-body">
      {search.map((item: any, index: number)=>(
        <div className={`bg-3 horizontal menu-card ${!item.available ? "unavailable" : ""}`} key={index}>
          <Image src={"/images/" + item.filename} alt="image" width={300} height={300} className="img-fill"/>
          <div className="vertical menu-card-info">
            <div className="name">
              {item.name}
              <span className="dishActions">
                <Image src={removeIco} width={18} height={18} className="icon remove" alt="ico" onClick={()=>deleteDish(item._id)}/>
              </span>
            </div><hr/>
            <div className="description">{item.description}</div>
            <div className="cost"><span>{item.category} • </span>{item.cost} тг.</div>
          </div>
        </div>
      ))}
    </div>
  )
}