import React from 'react'
import {Route, RouteProps} from "react-router"
import { useAuth0 } from './react-auth0-spa'

export const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const {isAuthenticated, loginWithRedirect, isInitializing} = useAuth0()
  if (isInitializing)
    return (<div>...Loading</div>)
  if (!isAuthenticated) loginWithRedirect({})
  return (
    <Route {...props} />
  )
}