import { gql } from '@apollo/client';

export const GET_COUNTRY = gql`
query countries {
  countries{
    code
    name
    continent{
      name
    }
  }
}
`


export const DETAILS_COUNTRY = gql` 
query GetCountryByName($name: String!) {
  countries(filter: { name: { eq: $name } }) {
    code
    name
    capital
    currency
    languages{
      code
      name
    }
    states{
      code
      name
    }
    continent{
      name
    }
  }
}
`
