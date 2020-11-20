import {useEffect, useLayoutEffect} from 'react'
import debounce from 'lodash.debounce'
import countryIso from 'country-iso'
import countryData from 'country-data'

import drawChart from './chart'
import getCountryData from './consumer'
import geolocationStates from './geolocationStates'

const google = window.google

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

const setUpGeolocation = async ({coords, setGeolocationState, setSelectedCountries, setData}) => {
  const slug = getCountrySlug(coords).toLowerCase()
  setGeolocationState(geolocationStates.loading)
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

const useGeolocation = ({fallbackCountry, setGeolocationState, setSelectedCountries, setData}) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => setUpGeolocation({coords, setGeolocationState, setSelectedCountries, setData}),
        ({code}) => handleGeoError({code, fallbackCountry, setGeolocationState, setSelectedCountries, setData})
      )
    }
    // eslint-disable-next-line
  }, [])
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
  useGoogleCharts
}
