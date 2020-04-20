import React, { ReactNode } from 'react'
import { useAuth0 } from './react-auth0-spa'

interface PersonalComponentProps{
  userId?: string
}

export const PersonalComponent: React.FC<PersonalComponentProps> = (props) => {
  const {isAuthenticated, isInitializing, user} = useAuth0()
  if (isInitializing) return (<div>...Loading</div>)
  if (!isAuthenticated || props.userId !== user?.sub || !props.userId) return <></>
  return (<>{props.children}</>)
}