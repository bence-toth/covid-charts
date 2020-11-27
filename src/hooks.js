import { useState, useEffect, useLayoutEffect } from "react";
import debounce from "lodash.debounce";

import drawChart from "./chart";
import { getCovidData, getCountryName } from "./consumer";
import geolocationStates from "./geolocationStates";

import countries from "./countries";

const google = window.google;
const localStorage = window.localStorage;

const useGoogleChartSetUp = ({
  selectedCountries,
  geolocationState,
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
          selectedCountries.map((country) => getCovidData(country))
        );
        setGeolocationState(geolocationStates.loaded);
        setChartSetUp(true);
        setData(
          allData
            .map((data, index) => ({
              country: selectedCountries[index],
              data,
            }))
            .reduce(
              (accumulator, { country, data }) => ({
                ...accumulator,
                [country]: data,
              }),
              {}
            )
        );
      });
    }
  }, [
    geolocationState,
    selectedCountries,
    didChartSetUp,
    setData,
    setGeolocationState,
  ]);
};

const useChartUpdate = ({ data, selectedCountries }) => {
  useLayoutEffect(() => {
    if (google.visualization) {
      if (!selectedCountries.some((country) => !data[country])) {
        drawChart({ data, selectedCountries });
      }
    }
  }, [data, selectedCountries]);
};

const useResizeListener = ({ data, selectedCountries, geolocationState }) => {
  useLayoutEffect(() => {
    const listener = debounce(() => {
      if (
        !selectedCountries.some((country) => !data[country]) &&
        geolocationState === geolocationStates.loaded
      ) {
        drawChart({ data, selectedCountries });
      }
    }, 250);
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [selectedCountries, data, geolocationState]);
};

const useGeolocation = ({
  addCountryToSelection,
  fallbackCountry,
  selectedCountries,
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
    const isNoCountrySelected = selectedCountries.length === 0;
    if (isNoCountrySelected && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        setUpGeolocation,
        handleGeoError
      );
    } else {
      setGeolocationState(geolocationStates.loading);
    }
    // eslint-disable-next-line
  }, []);

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

export {
  useGoogleChartSetUp,
  useChartUpdate,
  useResizeListener,
  useGeolocation,
  useCountrySelectionStore,
};
