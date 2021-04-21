const geolocationStates = Object.freeze({
  requested: "requested",
  failed: "failed",
  loadingFallback: "loadingFallback",
  loading: "loading",
  loaded: "loaded",
});

const dataTypes = Object.freeze({
  died: "deaths",
  confirmed: "cases",
  recovered: "recoveries",
});

export {
  geolocationStates,
  dataTypes,
};
