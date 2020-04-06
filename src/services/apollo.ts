import ApolloClient from 'apollo-boost'

const apiUrl = process.env.API_URL || 'http://localhost:5000'

export const client = new ApolloClient({
  uri: `${apiUrl}/graphql`
})