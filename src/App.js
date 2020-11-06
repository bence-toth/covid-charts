import {useEffect, useState} from 'react'

import countries from './countries'
import getCountryData from './consumer'
import drawChart from './chart'

const google = window.google

function debounce(functionToDebounce, wait) {
  // From underscore.js
	let timeout
	return function() {
    const context = this
    const args = arguments
		const later = () => {
			timeout = null
      functionToDebounce.apply(context, args)
		}
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	};
};

const initialCountries = ['denmark', 'hungary']

function App() {
  const [selectedCountries, setSelectedCountries] = useState(initialCountries)
  const [data, setData] = useState({})

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

  useEffect(() => {
    if (selectedCountries.some(country => !data[country])) {
      return
    }
    console.log('useEffect', {data, selectedCountries})
    drawChart({data, selectedCountries})
  }, [data, selectedCountries])

  useEffect(() => {
    google.charts.load('current', {
      packages: ['corechart']
    })
    google.charts.setOnLoadCallback(() => {
      Promise.all(
        initialCountries
          .map(country => getCountryData(country))
      ).then(initialData => {
        console.log('setting data in []')
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
    })
  }, [])

  useEffect(() => {
    const listener = window.addEventListener('resize', debounce(() => {
      if (selectedCountries.some(country => !data[country])) {
        return
      }
      drawChart({data, selectedCountries})
    }, 250))
    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [data, selectedCountries])

  return (
    <>
      <input type="checkbox" id="countryMenuVisible" />
      <aside>
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
      <label htmlFor="countryMenuVisible"></label>
    </>
  );
}

export default App;
