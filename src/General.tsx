import React from 'react'
import { useAuth0 } from './auth/react-auth0-spa';

export const General = () => {
  const {user} = useAuth0()
  return(
    <div className="m-4 text-center">
      You should only be able to access this page 
      if you are authenticated.
    <br/>
    <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  )
  }