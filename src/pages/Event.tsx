import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_EVENT_BY_ID } from '../services/event';

const useUrlQuery = () => new URLSearchParams(useLocation().search)

export const Event = () => {
  
  // Get Event Id
  const urlQuery = useUrlQuery()
  const eventId = urlQuery.get('id')

  const { loading, error, data } = useQuery(GET_EVENT_BY_ID, {
    variables: {id: eventId}
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{`Error! ${error}`}</div>

  return (
    <p>
      {JSON.stringify(data)}
    </p>
  )
}