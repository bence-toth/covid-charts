import geolocationStates from './geolocationStates'

const Fallback = ({geolocationState}) => (
  <div className="spinnerWrapper">
    {
      geolocationState === geolocationStates.requested && (
        <div className='spinner-border text-warning'></div>
      )
    }
    {
      geolocationState === geolocationStates.loading && (
        <div className='spinner-border text-success'></div>
      )
    }
    {
      geolocationState === geolocationStates.disallowed && (
        <div className='spinner-border text-danger'></div>
      )
    }
    {
      geolocationState === geolocationStates.failed && (
        <h2>We failed getting your location. Please try again.</h2>
      )
    }
  </div>
)

export default Fallback
