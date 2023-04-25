import Image from "next/image";
import { useEffect, useState } from "react";
import removeIco from '@icons/removeFile.svg'
import eyeIco from '@icons/eye-coral.svg'
import Dialog from "../modal/Dialog";

export default function MenuList({menu, query, deleteDish, changeVisibility}: any){
  const [search, setSearch] = useState<any>([])
  const [showDialog, setShowDialog] = useState<any>({})

  const prepareDialog = (id: string, name: string, message: string, func: any, funcParam: boolean = false) => {
    setShowDialog({id, name, progress: true, message, func, funcParam})
  }

  const confirmDialog = (choose: boolean) => {
    choose && showDialog.func(showDialog.id, showDialog.funcParam)
    setShowDialog({progress: false})
  }


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
          <Image src={"/images/" + item.filename} alt="image" width={300} height={300} className="img-fill"/>
          <div className="vertical menu-card-info">
            <div className="name">
              {item.name}
              <span className="dishActions">
                <Image src={eyeIco} width={18} height={18} className="icon visibility" alt="ico" onClick={()=>prepareDialog(item._id, item.name, `Изменить видимость: ${item.name}`, changeVisibility, !item.available)}/>
                <Image src={removeIco} width={18} height={18} className="icon remove" alt="ico" onClick={()=>prepareDialog(item._id, item.name, `Удалить блюдо: ${item.name}`, deleteDish)}/>
              </span>
            </div><hr/>
            <div className="description">{item.description}</div>
            <div className="cost"><span>{item.category} • </span>{item.cost} тг.</div>
          </div>
        </div>
      ))}
      <Dialog show={showDialog?.progress} message={showDialog?.message} confirmDialog={confirmDialog}/>
    </div>
  )
}