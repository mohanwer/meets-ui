import React, { useState, useEffect } from 'react'
import {useLazyQuery} from '@apollo/react-hooks'
import {EventSearchResponse} from '../apollo/interfaces'
import {SEARCH_EVENTS} from '../apollo/queries'

export interface SearchParams {
  eventName: string,
  postal: string,
  location: {
    distance: number
  }
}

// Hook for retrieving event search data.
export const Search = (params: SearchParams) => {
  const [searchParameters, setSearchParameters] = useState({variables: {eventSearchRequest: {}}})
  const query = useLazyQuery<{searchEvents: EventSearchResponse[]}>(SEARCH_EVENTS, searchParameters)
  useEffect(() => {
    const paramsToSend = {}
    if (params.eventName !== '')
      Object.assign(paramsToSend, {eventName: params.eventName})
    if (params.postal !== ''){
      Object.assign(paramsToSend, {postal: params.postal})
      Object.assign(paramsToSend, {location:{distance:`${params.location.distance}miles`}})
    }
    setSearchParameters({variables: {eventSearchRequest: paramsToSend}})
  }, [params])
  return query
}