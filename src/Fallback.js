import geolocationStates from './geolocationStates'

const Fallback = ({geolocationState}) => (
  <div className="fallbackWrapper">
    {
      geolocationState === geolocationStates.requested && (
        <div className='spinner-border spinner-warning'></div>
      )
    }
    {
      geolocationState === geolocationStates.loading && (
        <div className='spinner-border spinner-success'></div>
      )
    }
    {
      geolocationState === geolocationStates.loadingFallback && (
        <div className='spinner-border spinner-danger'></div>
      )
    }
    {
      geolocationState === geolocationStates.failed && (
        <h2>We failed getting your location. Please try refreshing the page.</h2>
      )
    }
  </div>
)

export default Fallback
