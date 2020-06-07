import React, {useState} from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_EVENT_BY_ID, UPDATE_EVENT } from '../../../dataServices/apollo/queries';
import { EventData } from '../CreateEvent/interfaces';
import { EditEventForm } from './EditEventForm';
import { Event } from '../../../dataServices/apollo/interfaces';
import {LoadingSpinner} from "../../General/LoadingSpinner";

const useUrlQuery = () => new URLSearchParams(useLocation().search)

export const EditEvent = () => {
  const history = useHistory()
  const urlQuery = useUrlQuery()
  const eventId = urlQuery.get('id')

  const { loading, data } = useQuery<{event: Event}>(GET_EVENT_BY_ID, { variables: {id: eventId} })

  const [eventSubmitted, setEventSubmitted] = useState(false)
  const [updateEvent] = useMutation<{updateEvent: Event}>(
    UPDATE_EVENT, 
    {
      update(cache, {data: updateEvent}) {
        const updatedEvent = arguments[1].data.updateEvent
        cache.writeQuery({
          query: GET_EVENT_BY_ID,
          data: {event: updatedEvent}
        })
        history.push(`/Event?id=${eventId}`)
      }
    }
  )

  const submitUpdatedEvent = async(updatedEventDetails: EventData) => {
    setEventSubmitted(true)
    Object.assign(updatedEventDetails, {id: eventId})
    await updateEvent({variables: {eventData: updatedEventDetails}})
  }

  if (loading || eventSubmitted) return <LoadingSpinner/>
  if (!data) return <div>Event not found</div>
  return (
    <EditEventForm
      initialValues={data.event}
      onSubmit={(updatedInfo) => submitUpdatedEvent(updatedInfo)}
    />
  )
}