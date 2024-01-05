/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import {useLazyQuery} from '@apollo/client'
import { DETAILS_COUNTRY} from '../graphql/getCountry-graphql';


import CountryDetails from './CountryDetails'
import CountriesList from './CountriesList'
import CountriesFilter from './CountriesFilter'
import Sidebar from './Sidebar'

import Page2 from '../Router/Page2'
import Page3 from '../Router/Page3'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useImages } from '../hooks/useImages';



//endpoint a consumir
//"https://pixabay.com/api/?key="+{API_KEY}+"&q="+{variable}+&image_type=photo

export default function Countries({countries}) {
  //controlar la llamada a detalles
  const [getCountry, result] = useLazyQuery(DETAILS_COUNTRY)
  const [selectedCountry, setSelectedCountry] = useState(null)

  const [search, setSearch] = useState('')
  const { flagImages, cityImages } = useImages({ countries });
  

  const showCountry = (name) => {
    getCountry({variables: {name: name}})
  }

  const handleCloseModal = () => {
    setSelectedCountry(null); // Esta función cerrará el modal
  };

  // guardamos en selectedCountry mediante su estado el resultado de la consulta, useEffect se ejecuta cuando cambia el estado de result
  useEffect(() => {
    if(result.data){
      setSelectedCountry(result.data.countries[0])
    }
  }, [result])


  if(countries === null) return <p>Country not found</p>
  return(
    <BrowserRouter>
      <Sidebar/>
      <CountriesFilter setSearch={setSearch} />
      <Routes>
        <Route path='/' element={
          <>
            <CountriesList
              search={search}
              countries={countries}
              flagImages={flagImages}
              cityImages={cityImages}
              showCountry={showCountry}
            />
            <CountryDetails 
            selectedCountry = {selectedCountry}
            cityImages={cityImages}
            flagImages={flagImages}
            onClose={handleCloseModal}
            />
          </>
        }></Route>
        <Route path='/page2' element={<Page2/>}></Route>
        <Route path='/page3' element={<Page3/>}></Route>
      </Routes>
      
    </BrowserRouter> 
  )
}