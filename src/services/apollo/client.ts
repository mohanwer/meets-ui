import ApolloClient from 'apollo-boost'

const apiUrl = process.env.REACT_APP_API_URL

export const client = new ApolloClient({
  uri: `${apiUrl}/graphql`
})