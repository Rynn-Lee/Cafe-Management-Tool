import useDialog from "@/hooks/useDialog"

export default function PrinterFinale({newPrinter, addPrinter}: any){
  const {DialogWindow, ask} = useDialog()
  return(
    <div className="summary">
      <span className="title">Проверьте информацию</span>
      <span>Название: {newPrinter.name}</span>
      <span>IP адрес:  {newPrinter.ip}</span>
      {newPrinter.category?.length ?
      <>
        <br/><span>----Категории----</span>
        <ul>
          {newPrinter.category?.map((item: any) => <li key={item}>* {item}</li>)}
        </ul>
      </> : ""}
      <button onClick={()=>ask("Уверены что хотите завершить?", addPrinter)}>Завершить создание принтера</button>
      <DialogWindow />
    </div>
  )
}