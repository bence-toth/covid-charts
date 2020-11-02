let selectedCountries = ['denmark', 'hungary']

const data = {}

const init = async () => {
  // Render sidebar
  const sidebarHtml = countries.map(country => `
    <label for="${country.slug}">
      <input
        type="checkbox"
        id="${country.slug}"
        ${selectedCountries.includes(country.slug) ? 'checked' : ''}
      />
      ${country.name}
    </label>
  `).join('\n')
  document.querySelector('aside').innerHTML = sidebarHtml;

  // Handle checkbox check/uncheck
  [...document.querySelectorAll('input[type=checkbox]')].forEach(
    checkbox => {
      checkbox.addEventListener('click', async event => {
        const selectedCountry = event.target.id
        if (selectedCountries.includes(selectedCountry)) {
          if (selectedCountries.length <= 1) {
            event.preventDefault()
          }
          else {
            selectedCountries = selectedCountries.filter(slug => slug !== selectedCountry)
            drawChart({data, selectedCountries})
          }
        }
        else {
          selectedCountries.push(selectedCountry)
          if (!data[selectedCountry]) {
            const newData = await getCountryData(selectedCountry)
            data[selectedCountry] = newData
          }
          drawChart({data, selectedCountries})
        }
      })
    }
    // TODO: Add country filter feature
  )

  // Load and show initial data
  const initialData = await Promise.all(
    selectedCountries.map(country => getCountryData(country))
  )
  selectedCountries.forEach((country, countryIndex) => {
    data[country] = initialData[countryIndex]
  })
  drawChart({data, selectedCountries})

  // TODO: Redraw chart on window resize (debounce)
}

google.charts.load('current', {
  packages: ['corechart']
})

google.charts.setOnLoadCallback(init)
