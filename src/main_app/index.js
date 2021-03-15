import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'

import client from 'services/graphql/client'
import SignUp from './components/SignUp' 

const exampleQuery = loader('./graphql/currentUser.graphql')

function App () {
  const { loading, error, data } = useQuery(exampleQuery, { client })

  console.log(loading, error, data)

  return (
    <SignUp />
  )
}

export default App
