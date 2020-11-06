import countries from './countries'
import getCountryData from './consumer'
import drawChart from './chart'

const google = window.google

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
  [...document.querySelectorAll('input[type=checkbox]:not(#countryMenuVisible)')].forEach(
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

function App() {
  return (
    <>
      <input type="checkbox" id="countryMenuVisible" />
      <aside></aside>
      <main>
        <h1>
          <div>
            7-day moving average of COVID-19 <br />deaths per million people
          </div>
        </h1>
        <div id='chart'></div>
      </main>
      <label htmlFor="countryMenuVisible"></label>
    </>
  );
}

export default App;
