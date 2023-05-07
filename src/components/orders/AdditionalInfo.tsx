export default function AdditionalInfo({cart, setTotal, total}: any) {
  return (
    <table>
      <thead>
        <tr>
          <th>Действия</th>
          <th>Блюдо</th>
          <th>Количество</th>
          <th>Цена в общем</th>
        </tr>
      </thead>
      <tbody>
      {cart.map((item: any)=>(
        <tr key={item._id}>
          <td><button>Добавить 1</button>  <button>Убрать 1</button></td>
          <td>{item.name}</td>
          <td>x{item.amount} ({item.cost}тг)</td>
          <td>{item.cost * item.amount}тг.</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}