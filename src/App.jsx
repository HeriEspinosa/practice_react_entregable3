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

  console.log(isShow);

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${location}`;

    axios.get(url)
      .then(res => {
        setInfoAPI(res.data)
        setHasError(false)
        setIsShow(false)
      })
      .catch(err => {
        console.log(err)
        setHasError(true)
        setIsShow(false)
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
    setIsShow(true)
  }
  const handleFocus = e => {
    e.target.value = listLocation
  }


  return (
    <div className="App">
      <Banner />
      <h1 className='tittle'>Rick and Morty</h1>
      <form className='form' autocomplete='off' onSubmit={handleSubmit}>
        <input
          id='inputLocation'
          type="number"
          placeholder='Insert location'
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <button id='btn__search'>Search</button>
      </form>
      {
        isShow ?
          <div className='list__location'>
            <ul className='list__location__ul'>
              {
                listLocation?.map(loc => (
                  <li className='list__location__li'
                    onClick={
                      () => {
                        setLocation(loc.id)
                        setIsShow(false)
                      }}
                    key={loc.id}
                  >
                    {loc.name}
                  </li>))
              }
            </ul>
          </div>
          :
          <div className='list__display'>
          </div>
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
