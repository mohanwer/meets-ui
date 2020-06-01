import ApolloClient from "apollo-boost";

const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token')

export const client = new ApolloClient({
  uri: `${apiUrl}`,
  headers: {
    authorization: token ? `Bearer ${token}`: ''
  }
});