import React from 'react'
import { useAuth0 } from './react-auth0-spa'

//
export const VisibleIfUserIsSignedIn: React.FC<{}> = (props) => {
  const {isAuthenticated, isInitializing} = useAuth0()
  if (isInitializing) return (<div>...Loading</div>)
  if (!isAuthenticated) return <></>
  return <>{props.children}</>
}