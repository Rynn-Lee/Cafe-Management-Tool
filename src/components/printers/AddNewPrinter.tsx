export function AddNewPrinter({addPrinter, categories, setNewPrinter, newPrinter}: any){
  return(
    <form className='form w-max printers-form' onSubmit={addPrinter}>
      <fieldset>
        <legend>Добавить новый принтер</legend>
        <div className='fields'><span>Название</span><input placeholder='Введите Название' value={newPrinter.name} onChange={(e)=>setNewPrinter({...newPrinter, name: e.target.value})}/></div>
        <div className='fields'><span>Категории<br />(не занятые)</span>
          <ul>
            {categories?.data?.map((item: any) => (
              <li key={item._id}><input type='checkbox' value={item.title} className='categories-checkboxes'/> - {item.title}</li>
            ))}
          </ul>
        </div>
        <div className='fields'><span>ip</span><input value={"192.1.1.0"} readOnly/></div>
        <button type='submit'>Добавить</button>
      </fieldset>
    </form>
  )
}