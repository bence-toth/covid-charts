function debounce(functionToDebounce, wait) {
  // From underscore.js
	let timeout
	return function() {
    const context = this
    const args = arguments
		const later = () => {
			timeout = null
      functionToDebounce.apply(context, args)
		}
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	};
};

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

  window.addEventListener('resize', debounce(function() {
    drawChart({data, selectedCountries})
  }, 250))
}

google.charts.load('current', {
  packages: ['corechart']
})

google.charts.setOnLoadCallback(init)
