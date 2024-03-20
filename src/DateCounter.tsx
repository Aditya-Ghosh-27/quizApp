import { useReducer } from "react";

const initialState = { count: 0, step: 1 }

// reducer has 2 arguements -> current state and the action
function reducer(state, action){
  console.log(state, action);
  // We could also change the current state by creating a new object by destructuring and spreading the previous state and overwritting the current state
  switch(action.type){
    case "inc":
      return {...state, count: state.count + state.step}
    case "dec":
      return {...state, count: state.count - state.step}
    case "setCount":
      return {...state, count: action.payload }
    case "setStep":
      return {...state, step: action.payload }
    case "reset":
      return initialState
    default:
      throw new Error("Unknown action");
  }
}


// When does this reducer function get called?
// -> The reducer function gets called when you dispatch an action, where action is basically an object containing all the state pieces.

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {count, step} = state;
  // const [state-object, dispatch  is a function] = useReducer(reducer function, initial state value);
  // This dispatch function can also be used to update the state

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  // Here actually we have 3 actions -> 1.Increasing the state 2. Decreasing the state 3. Setting the state

  const dec = function () {
    dispatch({type: "dec" })
  };

  const inc = function () {
    dispatch({ type: "inc" })
    // dispatch(1);  the value of action is what we pass into the dispatch function
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value)})
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value)})
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "reset" })
    // setCount(0);
    // setStep(1);
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