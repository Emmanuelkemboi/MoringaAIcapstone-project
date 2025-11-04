import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1> React Beginner’s Toolkit</h1>
      <p>
        This project was built as part of the Moringa AI Capstone to help beginners
        understand how React works using generative AI prompts.
      </p>
      <button onClick={() => setCount(count + 1)}>
        You clicked {count} times
      </button>
      <p>
        Keep exploring and building — each click is a step forward in your learning journey!
      </p>
    </div>
  )
}

export default App
