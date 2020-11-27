import countries from './countries'

const getDateOfFirstConfirmedCase = dataPoints => (
  new Date(dataPoints[0].Date)
)

const getDateOfLastConfirmedCase = dataPoints => (
  new Date(dataPoints[dataPoints.length - 1].Date)
)

const getDailyDeaths = dataPoints => {
  const correctedDataPoints = dataPoints
    .map(({Cases}) => Cases)
    .map((_, todayIndex, dataPoints) => {
      return Math.min(...dataPoints.slice(todayIndex))
    })
  return (
    correctedDataPoints
      .map((deathsToday, todayIndex, dataPoints) => {
        if (todayIndex === 0) {
          return deathsToday
        }
        const deathsYesterday = dataPoints[todayIndex - 1]
        return (deathsToday - deathsYesterday)
      })
  )
}

const getMovingWeeklyAverageOfDailyDeaths = dataPoints => (
  getDailyDeaths(dataPoints)
    .map((dataPoint, dataPointIndex, dataPoints) => {
      return (
        (dataPoint
          + (dataPoints[dataPointIndex - 1] || 0)
          + (dataPoints[dataPointIndex - 2] || 0)
          + (dataPoints[dataPointIndex - 3] || 0)
          + (dataPoints[dataPointIndex - 4] || 0)
          + (dataPoints[dataPointIndex - 5] || 0)
          + (dataPoints[dataPointIndex - 6] || 0)
        ) / 7
      )
    })
)

const getCovidData = async slug => {
  const population = countries.find(({slug: slugToFind}) => slug === slugToFind).population
  const response = await fetch(
    `https://api.covid19api.com/total/dayone/country/${slug}/status/deaths`
  )
  const dataPoints = await response.json()
  const dateOfFirstConfirmedCase = getDateOfFirstConfirmedCase(dataPoints)
  const dateOfLastConfirmedCase = getDateOfLastConfirmedCase(dataPoints)
  const movingWeeklyAverageOfDailyDeaths = getMovingWeeklyAverageOfDailyDeaths(dataPoints)
  const movingWeeklyAverageOfDailyDeathsPerMillion = movingWeeklyAverageOfDailyDeaths.map(
    deaths => deaths * 1000000 / population
  )
  return {
    dateOfFirstConfirmedCase,
    dateOfLastConfirmedCase,
    movingWeeklyAverageOfDailyDeathsPerMillion
  }
}

const getCountryName = async ({latitude, longitude}) => {
  const response = await fetch([
    'https://api.bigdatacloud.net/data/reverse-geocode-client',
    `?latitude=${latitude}`,
    `&longitude=${longitude}`,
    '&localityLanguage=en'
  ].join(''))
  const geoData = await response.json()
  return geoData?.countryName
}

export {
  getCovidData,
  getCountryName
}
