import {useState, useEffect, useLayoutEffect} from 'react'
import debounce from 'lodash.debounce'

import drawChart from './chart'
import {getCovidData, getCountryName} from './consumer'
import geolocationStates from './geolocationStates'

const google = window.google
const localStorage = window.localStorage

const useGoogleChartSetUp = ({countries, geolocationState, setGeolocationState, setSelectedCountries, setData}) => {
  const [didChartSetUp, setChartSetUp] = useState(false)

  useEffect(() => {
    google.charts.load('current', {
      packages: ['corechart']
    })
  }, [])

  useEffect(() => {
    if ([geolocationStates.loading, geolocationStates.loadingFallback].includes(geolocationState) && !didChartSetUp) {
      google.charts.setOnLoadCallback(async () => {
        const allData = await Promise.all(countries.map(
          country => getCovidData(country)
        ))
        setGeolocationState(geolocationStates.loaded)
        setSelectedCountries(countries)
        setChartSetUp(true)
        setData(
          allData
            .map((data, index) => ({
              country: countries[index],
              data
            }))
            .reduce((accumulator, {country, data}) => ({
              ...accumulator,
              [country]: data
            }), {})
        )
      })
    }
  }, [geolocationState, countries, didChartSetUp, setData, setGeolocationState, setSelectedCountries])
}

const useChartUpdate = ({data, selectedCountries}) => {
  useLayoutEffect(() => {
    if (google.visualization) {
      if (!selectedCountries.some(country => !data[country])) {
        drawChart({data, selectedCountries})
      }
    }
  }, [data, selectedCountries])
}

const useResizeListener = ({data, selectedCountries, geolocationState}) => {
  useLayoutEffect(() => {
    const listener = debounce(() => {
      if (!selectedCountries.some(country => !data[country]) && geolocationState === geolocationStates.loaded) {
        drawChart({data, selectedCountries})
      }
    }, 250)
    window.addEventListener('resize', listener)
    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [selectedCountries, data, geolocationState])
}

const useGeolocation = ({addCountryToStore}) => {
  const [geolocationState, setGeolocationState] = useState(geolocationStates.requested)
  
  const setUpGeolocation = async ({coords, setGeolocationState, addCountryToStore}) => {
    const countryName = await getCountryName(coords)
    if (countryName) {
      addCountryToStore(countryName.toLowerCase())
      setGeolocationState(geolocationStates.loading)
    }
    else {
      setGeolocationState(geolocationStates.loadingFallback)
    }
  }
  
  const handleGeoError = async ({code, setGeolocationState}) => {
    const disallowedByUser = code === 1
    setGeolocationState(
      disallowedByUser
        ? geolocationStates.loadingFallback
        : geolocationStates.failed
    )
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => setUpGeolocation({coords, setGeolocationState, addCountryToStore}),
        ({code}) => handleGeoError({code, setGeolocationState})
      )
    }
    // eslint-disable-next-line
  }, [])

  return {
    geolocationState,
    setGeolocationState
  }
}

const useCountrySelectionStore = () => {
  const [storedCountries, setStoredCountries] = useState([])

  useEffect(() => {
    const countries = localStorage.getItem('selectedCountries')
    if (countries) {
      setStoredCountries(countries.split(','))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('selectedCountries', storedCountries.join(','))
  }, [storedCountries])

  const addCountryToStore = country => {
    setStoredCountries(storedCountries =>
      !storedCountries.includes(country)
        ? [...storedCountries, country]
        : storedCountries
    )
  }

  const removeCountryFromStore = country => {
    setStoredCountries(storedCountries => storedCountries.filter(
      storedCountry => storedCountry !== country
    ))
  }

  return {
    storedCountries,
    addCountryToStore,
    removeCountryFromStore
  }
}

export {
  useGoogleChartSetUp,
  useChartUpdate,
  useResizeListener,
  useGeolocation,
  useCountrySelectionStore
}
