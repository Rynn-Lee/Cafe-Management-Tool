import Image from "next/image";

export default function MenuList({menu, dirs}: any){
  return(
    <div>
    {menu.map((item: any, index: number)=>(
        <div className="padding-0 margin-5 width-max-content horizontal b-none disp-inline-box round-10 " key={index}>
          <span><Image src={'/images/' + item.filename} alt="Image" width={148} height={148} className="b-radius-left-10 img-fill" priority/></span>
          <div className="vertical">
            <span className=""><input className="left-input width-100 padding-10 round-0" value="Название" readOnly/><input className="right-input width-150 padding-10" value={item.name} readOnly/></span>
            <span><input className="left-input width-100 padding-10 round-0" value="Цена" readOnly/><input className="right-input width-150 padding-10" value={item.cost} readOnly/></span>
            <span><input className="left-input width-100 padding-10 round-0" value="Категория" readOnly/><input className="right-input width-150 padding-10" value={item.category} readOnly/></span>
            <span><input className="left-input width-100 padding-10 round-0" value="Цена" readOnly/><input className="right-input width-150 padding-10" value={item.cost} readOnly/></span>
            <span></span>
          </div>
        </div>
    ))}
    </div>
  )
}