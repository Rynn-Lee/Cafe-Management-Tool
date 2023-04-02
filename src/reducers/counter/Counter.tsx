import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import {increment, decrement, reset, incrementByAmount} from './counterSlice'

const Counter = () => {
  const count = useSelector((state: any) => state.counter.count)
  const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState(0)

  const resetAll = () => {
    setIncrementAmount(0)
    dispatch(reset())
  }

  return(
    <section>
      <p>{count}</p>
      <div>
        <button onClick={()=>dispatch(increment())}>+</button>
        <button onClick={()=>dispatch(decrement())}>-</button>
        <button onClick={resetAll}>Reset</button>
      </div>
      <input value={incrementAmount} onChange={(e)=>setIncrementAmount(Number(e.target.value))}/>
      <button onClick={()=>dispatch(incrementByAmount(incrementAmount as any))}>Add Amount</button>
    </section>
  )
}

export default Counter