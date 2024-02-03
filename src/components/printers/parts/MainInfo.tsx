export function MainInfo({printer, setPrinter, printerCopy}: any){
  return(
    <fieldset className="form">
      <legend>Printer Information</legend>
      <div className="fields">
        <span>Name</span>
        <input value={printer?.name} onChange={(e)=>setPrinter({...printer, name: e.target.value})}/>
      </div>
      <div className="fields">
        <span>IP</span>
        <input value={printer?.ip} onChange={(e)=>setPrinter({...printer, ip: e.target.value})}/>
      </div>
      <div className="fields w-max">
        <span>Method</span>
        <select value={printer?.method} onChange={(e)=>setPrinter({...printer, method: e.target.value})}>
          <option value={"EPSON"}>EPSON</option>
          <option value={"STAR"}>STAR</option>
        </select>
      </div>
    </fieldset>
  )
}