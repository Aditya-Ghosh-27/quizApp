import { useState, useReducer } from "react";

// reducer has 2 arguements -> current state and the action
function reducer(state, action){
  console.log(state, action)
  if(action.type === 'inc') return state + 1;
  if(action.type === 'dec') return state - 1;
  if(action.type === "setCount") return action.payload;
}

// When does this reducer function get called?
// -> 

function DateCounter() {
  // const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);
  // const [state-variable, dispatch  is a function] = useReducer(reducer function, initial state value);
  // This dispatch function can also be used to update the state
  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  // Here actually we have 3 actions -> 1.Increasing the state 2. Decreasing the state 3. Setting the state

  const dec = function () {
    dispatch({type: "dec"});
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({type: "inc"})
    // dispatch(1);  the value of action is what we pass into the dispatch function
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({type: "setCount", payload: Number(e.target.value)})
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    setCount(0);
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;