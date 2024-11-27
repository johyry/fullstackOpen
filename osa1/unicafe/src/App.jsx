import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine =({text, value}) => {
  return (
    <div>{text}: {value}</div>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral
  const average = (good+bad*-1+neutral*0)/3
  const positive = good/(good+bad)*100

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <StatisticsLine text={"Good"} value={good}/>
      <StatisticsLine text={"Bad"} value={bad}/>
      <StatisticsLine text={"Neutral"} value={neutral}/>
      <StatisticsLine text={"All"} value={total}/>
      <StatisticsLine text={"Average"} value={average}/>
      <StatisticsLine text={"Positive"} value={positive}/>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App