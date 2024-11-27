import { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'

const Numbers = ({ numbers, filter, handleDelete }) => {
  if (filter) {
    numbers = numbers.filter(number => number.name.includes(filter))
  }
  return (
    <ul>
    {numbers.map(number => 
      <Person key={number.name} person={number} handleDelete={handleDelete} />
      )}
    </ul>
  )
}

const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name} - {person.number} <DeleteButton person={person} handleDelete={handleDelete}/>
    </li>
  )
}

const DeleteButton = ({ handleDelete, person }) => {
  return (
    <button onClick={() => handleDelete(person)}>delete</button>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          setConfMessage(`${returnedPerson.name} successfully added.`)
        })

    } else {
      alert("Name already exists")
    }
  }

  const setConfMessage = (string) => {
    setMessage(string)
    setTimeout(() => {
      setMessage("")
    }, 5000)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
    personService.deletePerson(person.id)
      .then(returned => {
        setPersons(persons.filter(person => person.id != returned.id))
        setConfMessage(`${returned.name} successfully deleted.`)
    })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <AddPersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <AddSuccesfullConfirmation message={message} />
      <Numbers filter={filter} numbers={persons} handleDelete={handleDelete} />
    </div>
  )

}

const AddSuccesfullConfirmation = ({message}) => {
  if (message !== "") {
    return (
      <div className="addSuccessConfirmation">
        {message}
      </div>
    )
  }
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