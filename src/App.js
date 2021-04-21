import { useEffect, useState } from "react";
import useMediaQuery from 'react-hook-media-query'

import { getCovidData, getCountries } from "./consumer";
import { geolocationStates, dataTypes } from "./constants";
import {
  useCountrySelectionStore,
  useGeolocation,
  useChartUpdate,
  useResizeListener,
  useGoogleChartSetUp,
  useDataTypeSwitch,
} from "./hooks";

import HamburgerMenu from "react-hamburger-menu";
import Select from 'react-select';
import Fallback from "./Fallback";

const fallbackCountry = "denmark";

const App = () => {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    getCountries().then(setCountries)
  }, [])

  const [data, setData] = useState({});
  const [displayedDataType, setDisplayedDataType] = useState(Object.keys(dataTypes)[0]);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [countryFilter, setCountryFilter] = useState("");
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')

  const {
    selectedCountries,
    addCountryToSelection,
    removeCountryFromSelection,
  } = useCountrySelectionStore();

  const { geolocationState, setGeolocationState } = useGeolocation({
    addCountryToSelection,
    fallbackCountry,
    selectedCountries,
    countries
  });

  useChartUpdate({ data, selectedCountries, countries, isDark });
  useResizeListener({ data, selectedCountries, geolocationState, countries, isDark });
  useGoogleChartSetUp({
    selectedCountries,
    geolocationState,
    displayedDataType,
    setGeolocationState,
    setData,
  });

  useDataTypeSwitch({
    selectedCountries,
    displayedDataType,
    setData,
  });

  const toggleHamburgerMenu = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  const toggleCountry = async (selectedCountry) => {
    if (selectedCountries.includes(selectedCountry)) {
      if (selectedCountries.length > 1) {
        removeCountryFromSelection(selectedCountry);
      }
    } else {
      addCountryToSelection(selectedCountry);
      if (!data[selectedCountry]) {
        const newData = await getCovidData({ slug: selectedCountry, type: displayedDataType });
        setData({
          ...data,
          [selectedCountry]: newData,
        });
      }
    }
  };

  const actualCountryFilter = countryFilter.trim().toLowerCase();

  return (
    <>
      <aside className={isHamburgerMenuOpen ? "open" : ""}>
        <input
          type="search"
          value={countryFilter}
          onChange={(event) => {
            setCountryFilter(event.target.value);
          }}
          placeholder="Search for country..."
        />
        <div className="countries">
          {countries
            .filter((country) => {
              if (actualCountryFilter.length === 0) {
                return true;
              }
              if (selectedCountries.includes(country.slug)) {
                return true;
              }
              return country.name.toLowerCase().includes(actualCountryFilter);
            })
            .map((country) => (
              <label key={country.slug} htmlFor={country.slug}>
                <input
                  type="checkbox"
                  id={country.slug}
                  checked={selectedCountries.includes(country.slug)}
                  onChange={() => {
                    if (geolocationState === geolocationStates.loaded) {
                      toggleCountry(country.slug);
                    }
                  }}
                />
                {country.name}
              </label>
            ))}
        </div>
      </aside>
      <main>
        <div className="header">
          <span className="headerText">7-day moving average of COVID-19</span>
          <Select
            className="dataTypeSelector"
            value={{ value: displayedDataType, label: dataTypes[displayedDataType] }}
            options={Object.keys(dataTypes).map(dataType => ({ value: dataType, label: dataTypes[dataType] }))}
            onChange={({value}) => setDisplayedDataType(value)}
          />
          <span className="headerText">per million people</span>
        </div>
        {geolocationState === geolocationStates.loaded ? (
          <div id="chart"></div>
        ) : (
          <Fallback geolocationState={geolocationState} />
        )}
      </main>
      <div className="hamburgerWrapper">
        <HamburgerMenu
          isOpen={isHamburgerMenuOpen}
          menuClicked={toggleHamburgerMenu}
          strokeWidth={3}
          color={isDark ? "hsl(0, 0%, 90%)" : "black"}
          animationDuration={0.25}
          width={30}
          height={30}
        />
      </div>
    </>
  );
};

export default App;
