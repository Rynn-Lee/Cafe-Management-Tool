export function MainInfo({printer, setPrinter}: any){
  return(
    <fieldset className="form">
      <legend>Основная информация</legend>
      <div className="fields">
        <span>Название</span>
        <input value={printer?.name} onChange={(e)=>setPrinter({...printer, name: e.target.value})}/>
      </div>
      <div className="fields">
        <span>IP</span>
        <input value={printer?.ip} onChange={(e)=>setPrinter({...printer, ip: e.target.value})}/>
      </div>
    </fieldset>
  )
}