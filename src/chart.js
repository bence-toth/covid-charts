import countries from './countries'

const google = window.google

const drawChart = ({data, selectedCountries}) => {
  const displayedCountries = selectedCountries.map(country => ({
    slug: country,
    name: countries.find(({slug}) => slug === country).name,
    data: data[country].movingWeeklyAverageOfDailyDeathsPerMillion,
    startDate: data[country].dateOfFirstConfirmedCase,
    endDate: data[country].dateOfLastConfirmedCase
  }))

  const longestDatasetLength = Math.max(
    ...(displayedCountries.map(
      ({data}) => data.length
    ))
  )

  const earliestStartDate = Math.min(
    ...(displayedCountries.map(
      ({startDate}) => startDate.getTime()
    ))
  )

  displayedCountries.forEach(country => {
    if (country.data.length < longestDatasetLength) {
      country.data.unshift(...(new Array(longestDatasetLength - country.data.length).fill(0)))
    }
  })

  const chartData = google.visualization.arrayToDataTable([
    [
      'Date',
      ...displayedCountries.map(({name}) => name)
    ],
    ...(new Array(longestDatasetLength).fill(null).map((_, dataPointIndex) => [
      new Date(earliestStartDate + (dataPointIndex * 1000 * 60 * 60 * 24)),
      ...displayedCountries.map(({data}) => data[dataPointIndex])
    ]))
  ])

  const chartElement = document.getElementById('chart')

  if (chartElement) {
    const chart = new google.visualization.LineChart(chartElement)

    const options = {
      fontName: 'Poppins',
      chartArea: {
        width: chartElement.clientWidth,
        height: chartElement.clientHeight - 50,
        top: 0,
        right: 0,
      },
      tooltip: {
        trigger: 'selection'
      },
      crosshair: {
        trigger: 'both',
        orientation: 'vertical'
      },
      hAxis: {
        format: 'yyyy-MM-dd',
        viewWindowMode: 'pretty',
        textPosition: 'out'
      },
      theme: 'maximized'
    }

    chart.draw(chartData, options)
  }
}

export default drawChart
