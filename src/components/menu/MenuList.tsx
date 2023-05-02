import Image from "next/image";
import { useEffect, useState } from "react";
import removeIco from '@icons/removeFile.svg'
import eyeIco from '@icons/eye-coral.svg'
import useDialog from "@hooks/useDialog";

export default function MenuList({menu, query, deleteDish, changeVisibility}: any){
  const [search, setSearch] = useState<any>([])
  const { DialogWindow, ask } = useDialog()

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
      {search?.map((item: any, index: number)=>(
        <div className={`horizontal menu-card ${!item.available ? "unavailable" : ""}`} key={index}>
          <Image src={"/images/" + item.filename} alt="image" width={140} height={140} className="img-fill"/>
          <div className="vertical menu-card-info">
            <div className="name">
              {item.name}
              <span className="dishActions">
                <Image src={eyeIco} width={18} height={18} className="icon visibility" alt="ico" onClick={()=>ask(`Изменить видимость: ${item.name}`, ()=>changeVisibility(item._id, !item.available))}/>
                <Image src={removeIco} width={18} height={18} className="icon remove" alt="ico" onClick={()=>ask(`Удалить блюдо: ${item.name}`, ()=>deleteDish(item._id))}/>
              </span>
            </div><hr/>
            <div className="description">{item.description}</div>
            <div className="cost"><span>{item.category} • </span>{item.cost} тг.</div>
          </div>
        </div>
      ))}
      <DialogWindow />
    </div>
  )
}