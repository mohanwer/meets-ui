import React, { useState, useEffect } from "react"
import { EventCardGrid } from "./EventCardGrid"
import { EventSearchResponse } from '../../services/apollo/interfaces';
import { SEARCH_EVENTS } from '../../services/apollo/queries';
import { useLazyQuery } from '@apollo/react-hooks';
import { SearchBox } from './SearchBox';

export interface SearchParams {
  eventName?: string,
  postal?: string,
  location?: {
    distance: string
  }
}

export const Home = () => { 
  const [searchResults, setSearchResults] = useState([])
  const [searchParameters, setSearchParameters] = useState({variables: {eventSearchRequest: {}}})
  const [getEvents, {loading, data}] = useLazyQuery<{searchEvents: EventSearchResponse[]}>(SEARCH_EVENTS, searchParameters)

  const onSearchParamChange = (searchParams: SearchParams) => {
    // Create a search parameter object. Only assign values that are not empty strings.
   
    setSearchParameters({variables: {eventSearchRequest: searchParams}})
  }

  useEffect(() => getEvents(), [searchParameters])

  if (loading || !data) 
    return <div>Loading...</div>
  
  return(
    <div className=''>
      <div className="px-8 pt-2 flex flex-col justify-center">
        <div className="text-center pb-2">
          <h2>
            Welcome to meets!
          </h2>
        </div>
        <div className="self-center">

        </div>
          <SearchBox onSubmit={onSearchParamChange} />
          <div className='mt-2'>
            <EventCardGrid
              cardList={data.searchEvents}
            />
          </div>
      </div>
    </div>
  )
}