import { useState } from 'react'

const Numbers = ({ numbers, filter }) => {
  if (filter) {
    numbers = numbers.filter(number => number.name.includes(filter))
  }
  return (
    <ul>
    {numbers.map(number => 
      <Person key={number.name} person={number} />
      )}
    </ul>
  )
}

const Person = ({ person }) => {
  return (
    <li>
      {person.name} - {person.number}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personExistsAlready = persons.find(person => person.name === newName)
    
    if(!personExistsAlready) {
    const personObject = {
      name: newName,
      number: newNumber
    }

      setPersons(persons.concat(personObject))
      setNewName("")
    } else {
      alert("Name already exists")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <AddPersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers filter={filter} numbers={persons} />
    </div>
  )

}

const Filter = ({filter, handleFilterChange}) => {
  return (
    <form>
        <div>
          filter shown with: <input 
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
      </form>
  )
}

const AddPersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default App