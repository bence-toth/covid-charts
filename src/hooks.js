import {useState, useEffect, useLayoutEffect} from 'react'
import debounce from 'lodash.debounce'
import countryIso from 'country-iso'
import countryData from 'country-data'

import drawChart from './chart'
import getCountryData from './consumer'
import geolocationStates from './geolocationStates'

const google = window.google
const localStorage = window.localStorage

const getCountrySlug = coords => {
  const code = countryIso.get(coords.latitude, coords.longitude)
  return countryData.countries[code].name
}

const setUpChart = ({country, setGeolocationState, setSelectedCountries, setData}) => {
  google.charts.setOnLoadCallback(async () => {
    const data = await getCountryData(country)
    setGeolocationState(geolocationStates.loaded)
    setSelectedCountries([country])
    setData({ [country]: data })
  })
}

const setUpGeolocation = async ({coords, setGeolocationState, setSelectedCountries, setData, addCountryToStore}) => {
  const slug = getCountrySlug(coords).toLowerCase()
  setGeolocationState(geolocationStates.loading)
  addCountryToStore(slug)
  setUpChart({country: slug, setGeolocationState, setSelectedCountries, setData})
}

const handleGeoError = async ({code, fallbackCountry, setGeolocationState, setSelectedCountries, setData}) => {
  const disallowedByUser = code === 1
  setGeolocationState(
    disallowedByUser
      ? geolocationStates.loadingFallback
      : geolocationStates.failed
  )
  if (disallowedByUser) {
    setUpChart({country: fallbackCountry, setGeolocationState, setSelectedCountries, setData})
  }
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

const useGeolocation = ({fallbackCountry, addCountryToStore, setGeolocationState, setSelectedCountries, setData}) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => setUpGeolocation({coords, setGeolocationState, setSelectedCountries, setData, addCountryToStore}),
        ({code}) => handleGeoError({code, fallbackCountry, setGeolocationState, setSelectedCountries, setData})
      )
    }
    // eslint-disable-next-line
  }, [])
}

const useCountrySelectionStore = () => {
  const [storedCountries, setStoredCountries] = useState([])

  useEffect(() => {
    const countries = localStorage.getItem('storedCountries')
    if (countries) {
      setStoredCountries(countries.split(','))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('storedCountries', storedCountries.join(','))
  }, [storedCountries])

  const addCountryToStore = country => {
    setStoredCountries(storedCountries =>
      !storedCountries.includes(country)
        ? [...storedCountries, country]
        : storedCountries
    )
  }

  const removeCountryFromStore = country => {
    setStoredCountries(storedCountries => storedCountries.filter(storedCountry => storedCountry !== country))
  }

  return {
    storedCountries,
    addCountryToStore,
    removeCountryFromStore
  }
}

const useGoogleCharts = () => {
  useEffect(() => {
    google.charts.load('current', {
      packages: ['corechart']
    })
  }, [])
}

export {
  useChartUpdate,
  useResizeListener,
  useGeolocation,
  useCountrySelectionStore,
  useGoogleCharts
}
