import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_EVENT_BY_ID } from '../services/apollo/queries'
import { Event as EventType } from '../services/apollo/interfaces'

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

  
  const event: EventType = data.event
  const eventDate = new Date(event.eventDate)
  const formattedEventDate = `${eventDate.getMonth()}/${eventDate.getDate()}/${eventDate.getFullYear()} @ ${eventDate.getUTCHours()}:${eventDate.getMinutes()}`
  return (
    <div className="w-full bg-gray-100 text-left"
    >
      <div className='border-b-2 bg-white shadow text-center'>
        <div className=''></div>
        <div className='text-3xl ml-4'>{event.name}</div>
        <div className='text-xl ml-4'>Hosted by: <span className='bold capitalize'>{event.createdBy.displayName}</span></div>
        <div className='text-lg text-gray-700 italic'>{formattedEventDate}</div>
      </div>
      <div className=' m-4'>
        <div className='text-xl'>Details</div>
        <p>{event.longDescription}</p>
      </div>
      <p className='mt-10'>
      </p>
    </div>
  )
}