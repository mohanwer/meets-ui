import React, {useEffect, useState} from 'react'
import { CreateEventForm } from './CreateEventForm'
import { useMutation } from '@apollo/react-hooks';
import { ADD_EVENT } from '../../../dataServices/apollo/queries';
import { Event } from '../../../dataServices/apollo/interfaces'
import { EventData } from './interfaces';
import { Redirect } from 'react-router';

export const CreateEvent = () => {
  const [isGoogleDoneLoading, setGoogleDone] = useState(false)
  const [eventCreationStatus, setEventCreationStatus] = useState({eventCreationComplete: false, eventId: ''})
  const [addEvent] = useMutation<{addEvent: Event}>(ADD_EVENT)

  const submitNewEvent = async(eventDetails: EventData) => {
    const result = await addEvent({variables: {eventData: eventDetails}})
    const newEventId = result?.data?.addEvent?.id || ''
    setEventCreationStatus({eventCreationComplete: true, eventId: newEventId})
  }

  useEffect(() => {
    if(window.google)
      setGoogleDone(true)
  })

  if (eventCreationStatus.eventCreationComplete)
    return <Redirect to={`/Event?id=${eventCreationStatus.eventId}`} />
  if (!isGoogleDoneLoading)
    return <div>Loading...</div> 
    
  return (
    <div className='bg-gray-100 p-4'>
      <div className=' bg-white shadow text-center'>
        <div className='text-xl p-4'>Create an Event</div>
      </div>
      <div className='mt-2'>
        <CreateEventForm 
          onSubmit={submitNewEvent}
        />
      </div>
    </div>
  )
}
