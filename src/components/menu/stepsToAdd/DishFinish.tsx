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
      <td>
        <tr>Название:</tr>
        <tr>Категория:</tr>
        <tr>Стоимость:</tr>
      </td>
      <td>
        <tr>{info.name}</tr>
        <tr>{info.category}</tr>
        <tr>{info.cost}тг. за {info.weight.amount} {info.weight.value}</tr>
      </td>
    </table>
    <div className="horizontal">
      <button className="dishfinish-buttons" onClick={()=>{
        setInfo({...info, available: true})
        ask("Уверены что хотите завершить и опубликовать блюдо??", handleUpload)
      }}>Опубликовать</button>
      <button className="dishfinish-buttons" onClick={()=>ask("Уверены что хотите завершить блюдо без публикации?", handleUpload)}>Завершить</button>
    </div>
    <DialogWindow />
  </>
  )
}