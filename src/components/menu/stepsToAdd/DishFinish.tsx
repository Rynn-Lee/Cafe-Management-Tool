import useDialog from "@/hooks/useDialog"

export default function DishFinish({info, setInfo, handleUpload}:any){
  const {DialogWindow, ask} = useDialog()
  return(
    <>
    <span className="title">Завершение добавления блюда</span>
    <center><span className="hint">* Выберите, опубликовать блюдо сразу или добавить без публикации?</span></center>
    <center><span className="hint">* После публикации блюдо сразу станет доступно официантам</span></center>
    <center><span className="hint">* Неопубликованное блюдо можно будет опубликовать позже</span></center>
    
    <table className="dish-table">
      <tr>
        <td>Название:</td>
        <td>{info.name}</td>
      </tr>
      <tr>
        <td>Категория:</td>
        <td>{info.category}</td>
      </tr>
      <tr>
        <td>Стоимость:</td>
        <td>{info.cost}тг. за {info.weight.amount} {info.weight.value}</td>
      </tr>
    </table>
    <div className="horizontal">
      <button className="dishfinish-buttons" onClick={()=>{
        setInfo({...info, available: true})
        ask("Уверены что хотите завершить и опубликовать блюдо?", handleUpload)
      }}>Опубликовать</button>
      <button className="dishfinish-buttons" onClick={()=>ask("Уверены что хотите завершить блюдо без публикации?", handleUpload)}>Завершить</button>
    </div>
    <DialogWindow />
  </>
  )
}