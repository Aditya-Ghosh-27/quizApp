import { useEffect, useReducer } from "react"
import Body from "./Body"
import  DateCounter  from "./DateCounter"
import Header from "./Header"

// 1.We have to grab this URL and then fetch it into our application. // We want to load the data on mount and for that we need to use useEffect hook
// 2. At some point we will have to display the fetched data here in the UI and so for that we are going to need state which we will get using the useReducer hook

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading"
}
// status: loading means the questions are being fetched

function reducer(state, action){
  switch(action.type){
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case "dataFailed":
      return {
        ...state,
        status: "error"
      };
    default: 
      throw new Error("Unknown Action")
  }
}

export default function App({children}){
  const [state, dispatch] = useReducer(reducer, initialState)
  
  useEffect(async function(){
    try {
      const resposne = await fetch("http://localhost:8000/questions");
      const data = await resposne.json();
      dispatch({ type: "dataReceived", payload: data }) 
    } catch(e){
      dispatch({ type: "dataFailed" })
    }
  }, [])
  return(
    <div className="app">
      <Header />
      <Body >  
        <p>1/15</p>
        <p>Questions?</p>
      </Body>
    </div>
  )
}