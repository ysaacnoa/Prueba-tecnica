

import {ApolloProvider} from '@apollo/client'
import { client } from './client'
import Content from './components/Content'


export default function App() {
  return (
    <ApolloProvider client={client}>
      <Content/>
    </ApolloProvider>
  )
}
