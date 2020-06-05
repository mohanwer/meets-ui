import ApolloClient from "apollo-boost";

const apiUrl = process.env.REACT_APP_API_URL;

export const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('assemble-anywhere-token')
    operation.setContext({
      uri: apiUrl,
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})