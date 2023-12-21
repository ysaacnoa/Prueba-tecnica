/* eslint-disable react/prop-types */



import { useState } from 'react';
import '../css/CountriesList.css';


export default function CountriesList({ countries, flagImages, cityImages, showCountry, search }) {
  const [selectedContinents, setSelectedContinents] = useState([]);

  const filterByContinent = continent => {
    const index = selectedContinents.indexOf(continent);
    if (index === -1) {
      setSelectedContinents(prev => [...prev, continent]); // Si no está seleccionado, añadirlo a la lista
    } else {
      setSelectedContinents(prev => prev.filter(item => item !== continent)); // Si ya está seleccionado, quitarlo de la lista
    }
  };

  const continents = ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'];

  const filteredBySearch = countries.filter(country => {
    const name = country && country.name && typeof country.name === 'string' ? country.name : '';
    return name.toLowerCase().includes(search.toLowerCase());
  });
  
  
  const filteredCountries = selectedContinents.length > 0
    ? filteredBySearch.filter(country =>
        country &&
        country.continent &&
        country.continent.name &&
        typeof country.continent.name === 'string' &&
        selectedContinents.includes(country.continent.name)
      )
    : filteredBySearch;


  return (
    <main className="container mx-auto px-4 mt-8 my-32">
      <div className="ml-4 mb-4 flex justify-center flex-wrap gap-3 md:gap-6 lg:gap-10">
        {continents.map(continent => (
          <button
            key={continent}
            onClick={() => filterByContinent(continent)}
            className={`px-4 py-2 rounded-lg focus:outline-none ${
              selectedContinents.includes(continent)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-400 transition duration-300'
            }`
            }>
              {continent}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {filteredCountries.map(country => (
        <article
          key={country.code}
          onClick={() => showCountry(country.name)}
          className="list bg-white rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:bg-blue-100 hover:scale-105 hover:shadow-lg cursor-pointer"
        >
          <header className=" rounded-t-lg">
            <img
              className="w-full h-40 object-cover object-center"
              src={cityImages[country.name]}
              alt={`${country.name} city`}
            />
          </header>
          <section className="p-4  rounded-b-lg">
            <div className="flex items-center mb-2">
              <img
                className="w-12 h-12 mr-2 rounded-full"
                src={flagImages[country.name]}
                alt={`${country.name} flag`}
              />
              <div>
                <span className="font-semibold">{country.name}</span>
                <p className="text-sm">
                  <span className="inline-block bg-gray-200 px-2 py-1 rounded-xl mt-1">
                    {country.continent && country.continent.name ? country.continent.name : ''}
                  </span>
                </p>
              </div>
            </div>
          </section>
        </article>
))}
      </section>
    </main>
  );
}
 