const mapDataToState = ({ setData, selectedCountries, allData }) => {
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
};

export { mapDataToState };
