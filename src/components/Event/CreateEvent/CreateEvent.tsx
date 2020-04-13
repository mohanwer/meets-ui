import React, {useEffect, useState} from 'react'
import { CreateEventForm } from './CreateEventForm'
import { useMutation } from '@apollo/react-hooks';
import { ADD_EVENT } from '../../../services/apollo/queries';
import { Event } from '../../../services/apollo/interfaces'
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
  if (isGoogleDoneLoading)
    return (<CreateEventForm onSubmit={submitNewEvent}/>)
  else return (<div>Loading...</div>)
}
