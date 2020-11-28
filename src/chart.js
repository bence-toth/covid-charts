const google = window.google;

const getChartOptions = ({isDark = false, chartElement}) => {
  return {
    fontName: "Poppins",
    chartArea: {
      width: chartElement.clientWidth,
      height: chartElement.clientHeight - 50,
      top: 0,
      right: 0,
    },
    tooltip: {
      trigger: "selection",
      isHtml: true
    },
    crosshair: {
      trigger: "both",
      orientation: "vertical",
    },
    hAxis: {
      format: "yyyy-MM-dd",
      viewWindowMode: "pretty",
      textPosition: "out",
      ...(isDark && {
        gridlines: {
          color: '#121212'
        },
        minorGridlines: {
          color: '#121212'
        },
        textStyle: {
          color: '#e6e6e6'
        }
      })
    },
    ...(isDark && {
      backgroundColor: '#000000',
      vAxis: {
        gridlines: {
          color: '#121212'
        },
        minorGridlines: {
          color: '#121212'
        },
        textStyle: {
          color: '#e6e6e6'
        }
      },
      legend: {
        textStyle: {
          color: '#e6e6e6'
        }
      }
    }),
    theme: "maximized",
  };
};

const drawChart = ({ data, selectedCountries, countries, isDark }) => {
  if (countries.length === 0) {
    return
  }

  const displayedCountries = selectedCountries.map((country) => ({
    slug: country,
    name: countries.find(({ slug }) => slug === country).name,
    data: data[country].movingWeeklyAverageOfDailyDeathsPerMillion,
    startDate: data[country].dateOfFirstConfirmedCase,
    endDate: data[country].dateOfLastConfirmedCase,
  }));

  const startDate = 1579651200000 // 22 January 2020

  const chartDataSource = [
    ["Date", ...displayedCountries.map(({ name }) => name)],
    ...displayedCountries[0].data
      .map((_, dataPointIndex) => [
        new Date(startDate + dataPointIndex * 1000 * 60 * 60 * 24),
        ...displayedCountries.map(({ data }) => data[dataPointIndex]),
      ]),
  ]

  const chartData = google.visualization.arrayToDataTable(chartDataSource);

  const chartElement = document.getElementById("chart");

  if (chartElement) {
    const chart = new google.visualization.LineChart(chartElement);

    const options = getChartOptions({isDark, chartElement})

    chart.draw(chartData, options);
  }
};

export default drawChart;
