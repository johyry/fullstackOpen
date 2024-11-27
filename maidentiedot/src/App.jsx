import { useState, useEffect } from 'react'
import countryService from './services/country'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService.getAll()
      .then(result => {
        setCountries(result)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} />
    </div>
  )

}

const Country = ({ country }) => {
  return (
    <div>
      {country.name.common}
    </div>
  )
}

const SingleCountry = ({ country }) => {
  console.log(country)
  return (
    <div><h2>{country.name.common}</h2>
    <p>{country.capital[0]}</p>
    <p>{country.area}</p>
    <Languages languages={country.languages} />
    <Flag flag={country.flags.png} />
    </div>
  )

}

const Flag = ({ flag }) => {
  return (
    <img 
      height={100}
      width={100}
      src={flag}
      alt="new"
      />
  )
}

const Languages = ({ languages }) => {
  const languagesToPrint = []
  for (const [key, value] of Object.entries(languages)) {
    languagesToPrint.push(value) 
  }
  return (
    <ul>
      {
        languagesToPrint.map(language => 
          <li key={language}>{language}</li>
        )
      }
    </ul>
  )
}


const Countries = ({ countries, filter }) => {
  if (filter !== "") {
    const toPrint = countries.filter(country => country.name.common.includes(filter))

    if (toPrint.length === 1) {
      return (
        <SingleCountry country={toPrint[0]} />
      )
    }

    if (toPrint.length > 10) {
      return (
        <p>
          Too many countries. Specify filter.
        </p>
      )
    }

    if (toPrint.length <= 10) {
    return (
      <div>
        {toPrint.map(country => 
          <Country key={country.population} country={country} />
        )}
      </div>
    )
  }
  }
}



const Filter = ({filter, handleFilterChange}) => {
  return (
    <form>
        <div>
          filter countries by name: <input 
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
      </form>
  )
}



export default App