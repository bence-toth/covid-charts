let selectedCountries = ['denmark', 'hungary']

const data = {}

const init = async () => {
  // Render sidebar
  const sidebarHtml = countries.map(country => `
    <div>
      <input
        type="checkbox"
        id="${country.slug}"
        ${selectedCountries.includes(country.slug) ? 'checked' : ''}
      />
      <label for="${country.slug}">${country.name}</label>
    </div>
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
            // TODO: Rerender chart
            console.log(data)
            console.log(selectedCountries)
          }
        }
        else {
          selectedCountries.push(selectedCountry)
          if (!data[selectedCountry]) {
            const newData = await getCountryData(selectedCountry)
            data[selectedCountry] = newData
          }
          // TODO: Rerender chart
          console.log(data)
          console.log(selectedCountries)
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
  // TODO: Render chart
  console.log(data)
  console.log(selectedCountries)
}
