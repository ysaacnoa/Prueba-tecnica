/* eslint-disable react/prop-types */
export default function CountryDetails({selectedCountry, flagImages, cityImages, onClose}) {
  
  const handleClose = () => {
    onClose(); // Esta función cerrará el modal
  };
  
  if (!selectedCountry) {
    return
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-50"></div>
      <article className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg overflow-hidden shadow-md max-w-xl w-full z-50">
        <header className="rounded-t-lg">
          <button onClick={handleClose} className="absolute top-2 right-2 bg-gray-200 rounded-full p-2 focus:outline-none z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            className="w-full h-60 object-cover object-center"
            src={cityImages[selectedCountry.name]}
            alt={`${selectedCountry.name} city`}
          />
          <div className="flex items-center p-4">
            <img
              className="w-12 h-12 mr-2 rounded-full"
              src={flagImages[selectedCountry.name]}
              alt={`${selectedCountry.name} flag`}
            />
            <div>
              <h2>{selectedCountry.name}</h2>
            </div>
          </div>
        </header>
        <section className="p-4 rounded-b-lg">
          <p className="mb-2">Continent: <span className="bg-gray-200 px-2 py-1 rounded-xl">{selectedCountry.continent.name}</span></p>
          <p className="mb-2">Capital: {selectedCountry.capital}</p>
          <p className="mb-2">Currency: {selectedCountry.currency}</p>
          <p className="mb-2">
            Languages: {selectedCountry.languages.map((language, index) => (
              <span key={language.code}>
                {language.name}
                {index !== selectedCountry.languages.length - 1 && ', '}
              </span>
            ))}
          </p>
          {selectedCountry.states && selectedCountry.states.length > 0 ? (
            <div>
              <p className="mb-2">States:</p>
              <div className="bg-gray-200 max-h-40 overflow-y-auto pl-4 rounded-md py-2">
                {selectedCountry.states.map(state => (
                  <p key={state.code}>{state.name}</p>
                ))}
              </div>
            </div>
          ) : (
            <p className="bg-gray-200 rounded-md py-2 px-4">No se encontraron estados</p>
          )}
        </section>
      </article>
    </>
    
  )
}