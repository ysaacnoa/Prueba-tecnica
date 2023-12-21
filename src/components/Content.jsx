

import {GET_COUNTRY}  from "../graphql/getCountry-graphql"
import { useQuery} from '@apollo/client'
import Countries from "./Countries"


export default function Content (){
  //esto retorna un result que es un objeto con los datos de la consulta result
  const {data, error, loading} = useQuery(GET_COUNTRY)
  if ( loading ) return  <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>

  return (
    <Countries countries={data?.countries}/>
  )
}