import {useEffect, useLayoutEffect, useState} from 'react'
import debounce from 'lodash.debounce'

import countries from './countries'
import getCountryData from './consumer'
import drawChart from './chart'

import HamburgerMenu from 'react-hamburger-menu'

const google = window.google

const initialCountries = ['denmark', 'hungary']

const App = () => {
  const [selectedCountries, setSelectedCountries] = useState(initialCountries)
  const [data, setData] = useState({})
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false)

  const toggleHamburgerMenu = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen)
  }

  const toggleCountry = async selectedCountry => {
    if (selectedCountries.includes(selectedCountry)) {
      if (selectedCountries.length > 1) {
        setSelectedCountries(selectedCountries.filter(slug => slug !== selectedCountry))
      }
    }
    else {
      setSelectedCountries([...selectedCountries, selectedCountry])
      if (!data[selectedCountry]) {
        const newData = await getCountryData(selectedCountry)
        setData({
          ...data,
          [selectedCountry]: newData
        })
      }
    }
  }

  useLayoutEffect(() => {
    if (!selectedCountries.some(country => !data[country])) {
      drawChart({data, selectedCountries})
    }
  }, [data, selectedCountries])

  useEffect(() => {
    google.charts.load('current', {
      packages: ['corechart']
    })
    google.charts.setOnLoadCallback(async () => {
      const initialData = await Promise.all(
        initialCountries.map(country => getCountryData(country))
      )
      setData(
        initialData
          .map((data, index) => ({
            country: initialCountries[index],
            data
          }))
          .reduce((accumulator, current) => ({
            ...accumulator,
            [current.country]: current.data
          }), {})
      )
    })
  }, [])

  useLayoutEffect(() => {
    const listener = debounce(() => {
      if (!selectedCountries.some(country => !data[country])) {
        drawChart({data, selectedCountries})
      }
    }, 250)
    window.addEventListener('resize', listener)
    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [selectedCountries, data])

  return (
    <>
      <aside className={isHamburgerMenuOpen ? 'open' : ''}>
        {countries.map(country =>
          <label
            key={country.slug}
            htmlFor={country.slug}
          >
            <input
              type="checkbox"
              id={country.slug}
              checked={selectedCountries.includes(country.slug)}
              onChange={() => {
                toggleCountry(country.slug)
              }}
            />
            {country.name}
          </label>
        )}
      </aside>
      <main>
        <h1>
          <div>
            7-day moving average of COVID-19 <br />deaths per million people
          </div>
        </h1>
        <div id='chart'></div>
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
