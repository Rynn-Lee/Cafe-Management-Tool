export default function PrinterCategories({newPrinter, setNewPrinter, setSetupStep, setupStep, vacantCategories, categories, checkCategories}:any){
  return(
    <>
    <span className="title">Добавление категорий принтеру</span>
    <span className="hint">* Категории необходимы для того, чтобы знать какой принтер за что отвечает</span>

    {vacantCategories.length
    ? <span className="hint">* Отметьте необходимые принтеру категории</span>
    : <span className="hint">* Свободные категории отсутствуют, вы можете добавить их позже</span>}
    
    <ul className="categories-list">
      {categories?.map((item: any) => (
        <li key={item._id}>
          <input type='checkbox' onChange={checkCategories} value={item.title} className='categories-checkboxes'/><span> - {item.title}</span>
        </li>
      ))}
    </ul>

    <button onClick={()=>setSetupStep(setupStep + 1)}>Продолжить</button>
  </>
  )
}