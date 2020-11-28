const getCountries = async () => {
  const response = await fetch('https://raw.githubusercontent.com/bence-toth/covid-data/main/data/countries.json');
  const result = await response.json();
  return result.countriesAndProvinces.filter(area => !area.province)
}

const getMovingWeeklyAverage = (dataPoints) =>
  dataPoints.map((dataPoint, dataPointIndex, dataPoints) => {
    return (
      (dataPoint +
        (dataPoints[dataPointIndex - 1] || 0) +
        (dataPoints[dataPointIndex - 2] || 0) +
        (dataPoints[dataPointIndex - 3] || 0) +
        (dataPoints[dataPointIndex - 4] || 0) +
        (dataPoints[dataPointIndex - 5] || 0) +
        (dataPoints[dataPointIndex - 6] || 0)) /
      7
    );
  });

const getCovidData = async (slug) => {
  const response = await fetch(
    `https://raw.githubusercontent.com/bence-toth/covid-data/main/data/died/daily/per-million/${slug}.json`
  );
  const {dailyDeathsPerMillion} = await response.json();
  return {
    movingWeeklyAverageOfDailyDeathsPerMillion: getMovingWeeklyAverage(dailyDeathsPerMillion),
  };
};

const getCountryName = async ({ latitude, longitude }) => {
  const response = await fetch(
    [
      "https://api.bigdatacloud.net/data/reverse-geocode-client",
      `?latitude=${latitude}`,
      `&longitude=${longitude}`,
      "&localityLanguage=en",
    ].join("")
  );
  const geoData = await response.json();
  return geoData?.countryName;
};

export { getCountries, getCovidData, getCountryName };
