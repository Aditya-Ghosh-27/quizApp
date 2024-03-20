

export default function StartScreen({ numQuestions }) {
  return (
    <div className="start">
        <h2>Welcome to the REACT Quiz!</h2>
        <h3>{numQuestions} questions to test your REACT mastery</h3>
        <button className="btn btn-ui">Let's Start</button>
    </div>
  )
}
