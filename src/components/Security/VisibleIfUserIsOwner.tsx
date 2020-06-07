import React from 'react'
import { useAuth0 } from '../../auth/react-auth0-spa'

interface PersonalComponentProps {
  userId: string
}

/**
 * Will only display children component passed to it if user is equal to the user passed in props.
 * @param props: children components.
 * @constructor
 */
export const VisibleIfUserIsOwner: React.FC<PersonalComponentProps> = (props) => {
  const { isAuthenticated, isInitializing, user } = useAuth0()
  const { userId } = props

  if (isInitializing) return (<div>...Loading</div>)

  if (
    !isAuthenticated ||
    !userId ||
    userId !== user?.sub
  )
    return <></>

  return (<>{props.children}</>)
}