import React, {useEffect, useState} from 'react'
import { CreateEventForm } from './CreateEventForm'
import { useMutation } from '@apollo/react-hooks';
import { ADD_EVENT } from '../../../dataServices/apollo/queries';
import { Event } from '../../../dataServices/apollo/interfaces'
import { EventData } from './interfaces';
import { Redirect } from 'react-router';
import {LoadingSpinner} from "../../General/LoadingSpinner";

export const CreateEvent = () => {
  const [isGoogleDoneLoading, setGoogleDone] = useState(false)
  const [eventCreationStatus, setEventCreationStatus] = useState({eventCreationComplete: false, eventId: ''})
  const [addingEvent, setAddingEvent] = useState(false)
  const [addEvent] = useMutation<{addEvent: Event}>(ADD_EVENT)

  const submitNewEvent = async(eventDetails: EventData) => {
    setAddingEvent(true)
    const result = await addEvent({variables: {eventData: eventDetails}})
    const newEventId = result?.data?.addEvent?.id || ''
    await setEventCreationStatus({eventCreationComplete: true, eventId: newEventId})
    setAddingEvent(false)
  }

  useEffect(() => {
    if(window.google)
      setGoogleDone(true)
  })

  if (eventCreationStatus.eventCreationComplete)
    return <Redirect to={`/Event?id=${eventCreationStatus.eventId}`} />
  if (!isGoogleDoneLoading || addingEvent)
    return <LoadingSpinner/>
    
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
