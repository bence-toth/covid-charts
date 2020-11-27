import {useState} from 'react'

import countries from './countries'
import {getCovidData} from './consumer'
import geolocationStates from './geolocationStates'
import {
  useCountrySelectionStore,
  useGeolocation,
  useChartUpdate,
  useResizeListener,
  useGoogleChartSetUp
} from './hooks'

import HamburgerMenu from 'react-hamburger-menu'
import Fallback from './Fallback'

const fallbackCountry = 'denmark'

const App = () => {
  const [selectedCountries, setSelectedCountries] = useState([])
  const [data, setData] = useState({})
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false)
  const [countryFilter, setCountryFilter] = useState('')

  const {
    storedCountries,
    addCountryToStore,
    removeCountryFromStore
  } = useCountrySelectionStore()

  const {
    geolocationState,
    setGeolocationState
  } = useGeolocation({addCountryToStore})

  useChartUpdate({data, selectedCountries})
  useResizeListener({data, selectedCountries, geolocationState})
  useGoogleChartSetUp({
    countries: storedCountries.length > 0
      ? storedCountries
      : [fallbackCountry],
    geolocationState,
    setGeolocationState,
    setSelectedCountries,
    setData
  })

  const toggleHamburgerMenu = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen)
  }

  const toggleCountry = async selectedCountry => {
    if (selectedCountries.includes(selectedCountry)) {
      if (selectedCountries.length > 1) {
        setSelectedCountries(selectedCountries.filter(slug => slug !== selectedCountry))
        removeCountryFromStore(selectedCountry)
      }
    }
    else {
      setSelectedCountries([...selectedCountries, selectedCountry])
      addCountryToStore(selectedCountry)
      if (!data[selectedCountry]) {
        const newData = await getCovidData(selectedCountry)
        setData({
          ...data,
          [selectedCountry]: newData
        })
      }
    }
  }
  
  const actualCountryFilter = countryFilter.trim().toLowerCase()

  return (
    <>
      <aside className={isHamburgerMenuOpen ? 'open' : ''}>
        <input
          type='search'
          value={countryFilter}
          onChange={(event) => {
            setCountryFilter(event.target.value)
          }}
          placeholder='Search for country...'
        />
        <div className='countries'>
          {countries
            .filter(country => {
              if (actualCountryFilter.length === 0) {
                return true
              }
              if (selectedCountries.includes(country.slug)) {
                return true
              }
              return country.name.toLowerCase().includes(actualCountryFilter)
            })
            .map(country =>
              <label
                key={country.slug}
                htmlFor={country.slug}
              >
                <input
                  type="checkbox"
                  id={country.slug}
                  checked={selectedCountries.includes(country.slug)}
                  onChange={() => {
                    if (geolocationState === geolocationStates.loaded) {
                      toggleCountry(country.slug)
                    }
                  }}
                />
                {country.name}
              </label>
            )
          }
        </div>
      </aside>
      <main>
        <h1>
          <div>
            7-day moving average of COVID-19 <br />deaths per million people
          </div>
        </h1>
        {
          (geolocationState === geolocationStates.loaded)
          ? (
            <div id='chart'></div>
          )
          : (
            <Fallback geolocationState={geolocationState} />
          )
        }
      </main>
      <div className='hamburgerWrapper'>
        <HamburgerMenu
          isOpen={isHamburgerMenuOpen}
          menuClicked={toggleHamburgerMenu}
          strokeWidth={3}
          color='black'
          animationDuration={0.25}
          width={30}
          height={30}
        />
      </div>
    </>
  )
}

export default App
