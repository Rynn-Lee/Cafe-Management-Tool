import Image from "next/image";

export default function MenuList({menu}: any){
  return(
    <div className="menu-body">
      {menu.map((item: any, index: number)=>(
        <div className="bg-3 horizontal menu-card" key={index}>
          <Image src={"/images/" + item.filename} alt="image" width={300} height={300} className="round-left img-fill"/>
          <div className="vertical menu-card-info">
            <div className="name">{item.name}</div>
            <div className="category">{item.category}</div><hr/>
            <div className="description">{item.description}</div>
            <div className="cost">{item.cost} тг.</div>
          </div>
        </div>
      ))}
    </div>
  )
}