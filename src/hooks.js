import { useState, useEffect, useLayoutEffect } from "react";
import debounce from "lodash.debounce";

import drawChart from "./chart";
import { getCovidData, getCountryName } from "./consumer";
import { mapDataToState } from './helper';
import { geolocationStates } from "./constants";

const google = window.google;
const localStorage = window.localStorage;

const useGoogleChartSetUp = ({
  selectedCountries,
  geolocationState,
  displayedDataType,
  setGeolocationState,
  setData,
}) => {
  const [didChartSetUp, setChartSetUp] = useState(false);

  useEffect(() => {
    google.charts.load("current", {
      packages: ["corechart"],
    });
  }, []);

  useEffect(() => {
    if (
      [geolocationStates.loading, geolocationStates.loadingFallback].includes(
        geolocationState
      ) &&
      !didChartSetUp
    ) {
      google.charts.setOnLoadCallback(async () => {
        const allData = await Promise.all(
          selectedCountries.map((country) => getCovidData({ slug: country, type: displayedDataType }))
        );
        setGeolocationState(geolocationStates.loaded);
        setChartSetUp(true);
        mapDataToState({ setData, selectedCountries, allData });
      });
    }
  }, [
    geolocationState,
    selectedCountries,
    displayedDataType,
    didChartSetUp,
    setData,
    setGeolocationState,
  ]);
};

const useChartUpdate = ({ data, selectedCountries, countries, isDark }) => {
  useLayoutEffect(() => {
    if (google.visualization) {
      if (!selectedCountries.some((country) => !data[country])) {
        drawChart({ data, selectedCountries, countries, isDark });
      }
    }
  }, [data, selectedCountries, countries, isDark]);
};

const useResizeListener = ({ data, selectedCountries, geolocationState, countries, isDark }) => {
  useLayoutEffect(() => {
    const listener = debounce(() => {
      if (
        !selectedCountries.some((country) => !data[country]) &&
        geolocationState === geolocationStates.loaded
      ) {
        drawChart({ data, selectedCountries, countries, isDark });
      }
    }, 250);
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [selectedCountries, data, geolocationState, countries, isDark]);
};

const useGeolocation = ({
  addCountryToSelection,
  fallbackCountry,
  selectedCountries,
  countries
}) => {
  const [geolocationState, setGeolocationState] = useState(
    geolocationStates.requested
  );

  const setUpGeolocation = async ({ coords }) => {
    const countryName = await getCountryName(coords);
    const countrySlug = countryName.toLowerCase();
    if (countryName && countries.find(({ slug }) => countrySlug === slug)) {
      addCountryToSelection(countrySlug);
      setGeolocationState(geolocationStates.loading);
    } else {
      addCountryToSelection(fallbackCountry);
      setGeolocationState(geolocationStates.loadingFallback);
    }
  };

  const handleGeoError = async ({ code }) => {
    addCountryToSelection(fallbackCountry);
    const disallowedByUser = code === 1;
    setGeolocationState(
      disallowedByUser
        ? geolocationStates.loadingFallback
        : geolocationStates.failed
    );
  };

  useEffect(() => {
    if (countries.length > 0) {
      const isNoCountrySelected = selectedCountries.length === 0;
      if (isNoCountrySelected && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          setUpGeolocation,
          handleGeoError
        );
      } else {
        setGeolocationState(geolocationStates.loading);
      }
    }
    // eslint-disable-next-line
  }, [countries]);

  return {
    geolocationState,
    setGeolocationState,
  };
};

const useCountrySelectionStore = () => {
  const countries = localStorage.getItem("selectedCountries");
  const [selectedCountries, setSelectedCountries] = useState(
    countries ? countries.split(",") : []
  );

  useEffect(() => {
    const countries = localStorage.getItem("selectedCountries");
    if (countries) {
      setSelectedCountries(countries.split(","));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCountries", selectedCountries.join(","));
  }, [selectedCountries]);

  const addCountryToSelection = (country) => {
    setSelectedCountries((selectedCountries) =>
      !selectedCountries.includes(country)
        ? [...selectedCountries, country]
        : selectedCountries
    );
  };

  const removeCountryFromSelection = (country) => {
    setSelectedCountries((selectedCountries) =>
      selectedCountries.filter((storedCountry) => storedCountry !== country)
    );
  };

  return {
    selectedCountries,
    addCountryToSelection,
    removeCountryFromSelection,
  };
};

const useDataTypeSwitch = ({
  selectedCountries,
  displayedDataType,
  setData,
}) => {
  useEffect(() => {
    const fetchAndMapData = async () => {
      const allData = await Promise.all(
        selectedCountries.map((country) => getCovidData({ slug: country, type: displayedDataType }))
      );
      mapDataToState({ setData, selectedCountries, allData });
    };
    fetchAndMapData();
    // eslint-disable-next-line
  }, [displayedDataType])
}

export {
  useGoogleChartSetUp,
  useChartUpdate,
  useResizeListener,
  useGeolocation,
  useCountrySelectionStore,
  useDataTypeSwitch,
};
