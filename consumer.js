const getDateOfFirstConfirmedCase = dataPoints => (
  new Date(dataPoints[0].Date)
)

const getDateOfLastConfirmedCase = dataPoints => (
  new Date(dataPoints[dataPoints.length - 1].Date)
)

const getDailyDeaths = dataPoints => (
  dataPoints
    .map((dataPoint, dataPointIndex, dataPoints) => {
      const deathsToday = dataPoint.Cases
      if (dataPointIndex === 0) {
        return deathsToday
      }
      const deathsYesterday = dataPoints[dataPointIndex - 1].Cases
      // Ignore decreasing total deaths
      const correctedDeathsToday = (
        (deathsYesterday > deathsToday)
          ? deathsYesterday
          : deathsToday
      )
      return (correctedDeathsToday - deathsYesterday)
    })
)

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

const getCountryData = async slug => {
  const population = countries.find(({slug: slugToFind}) => slug === slugToFind).population
  const response = await fetch(`https://api.covid19api.com/total/dayone/country/${slug}/status/deaths`)
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