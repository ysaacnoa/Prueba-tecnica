/* eslint-disable react/prop-types */


import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

export default function CountriesFilter ({setSearch}){
  const [placeholder, setPlaceholder] = useState('United States');

  const handleInputClick = () => {
    setPlaceholder('');
  };

  const handleInputBlur = () => {
    if (!placeholder) {
      setPlaceholder('United States');
    }
  };


  return(
    <header className="bg-gray-800 text-white py-4 px-6 sticky top-0 z-10">
      <section className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="relative flex items-center mb-2 lg:mb-0 min-w-[476px] sm:min-w-[476px]">
          <input
            id="countrySearch"
            placeholder={placeholder}
            onChange={(e) => setSearch(e.target.value)}
            onClick={handleInputClick}
            onBlur={handleInputBlur}
            className="bg-gray-700 ml-10 text-white py-2 px-4 rounded-full pl-12 w-72 lg:w-auto text-lg transition-all duration-300 focus:outline-none focus:bg-gray-600 hover:bg-gray-600 mr-4"
          />
          <FaSearch className="absolute ml-10 text-gray-400 top-1/2 left-3 transform -translate-y-1/2" />
        </div>
      </section>
    </header>
  )
} 