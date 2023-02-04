import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import Error from './components/Error'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomLocation from './utils/getRandomLocation'

function App() {

  const [infoAPI, setInfoAPI] = useState()
  const [location, setLocation] = useState(getRandomLocation())
  const [hasError, setHasError] = useState(false)
  const [listLocation, setListLocation] = useState()
  const [isShow, setIsShow] = useState(true)

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${location}`;

    axios.get(url)
      .then(res => {
        setInfoAPI(res.data)
        setHasError(false)
      })
      .catch(err => {
        console.log(err)
        setHasError(true)
      })

  }, [location])

  const handleSubmit = e => {
    e.preventDefault()
    setLocation(e.target.inputLocation.value.trim())
    e.target.inputLocation.value = e.target.inputLocation.value.trim()
  }

  const handleChange = e => {
    const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
    axios.get(url)
      .then(res => setListLocation(res.data.results))
      .catch(err => console.log(err))
  }

  // const handleFocus = () => setIsShow(true)
  // const handleBlur = () => setIsShow(false)

  return (
    <div className="App">
      <Banner />
      <h1 className='tittle'>Rick and Morty</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input
          id='inputLocation'
          type="number"
          onChange={handleChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        />
        <button id='btn__search'>Search</button>
      </form>
      {
        isShow &&
        <ul>
          {
            listLocation?.map(loc => (
              <li onClick={() => setLocation(loc.id)} key={loc.id}>{loc.name}</li>
            ))
          }
        </ul>
      }

      {
        hasError ?
          <Error />
          :
          <>
            <LocationInfo infoAPI={infoAPI} />
            <div className='container__resident'>
              {
                infoAPI?.residents.map(url => (
                  <ResidentInfo
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
    </div>
  )
}

export default App
