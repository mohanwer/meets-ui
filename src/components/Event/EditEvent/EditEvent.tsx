import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_EVENT_BY_ID, UPDATE_EVENT } from '../../../services/apollo/queries';
import { EventData } from '../CreateEvent/interfaces';
import { EditEventForm } from './EditEventForm';
import { Event } from '../../../services/apollo/interfaces';

const useUrlQuery = () => new URLSearchParams(useLocation().search)

export const EditEvent = () => {
  const history = useHistory()
  const urlQuery = useUrlQuery()
  const eventId = urlQuery.get('id')

  const { loading, error, data, refetch } = useQuery<Event>(GET_EVENT_BY_ID, { variables: {id: eventId} })

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

  const submitUpdatedEvent = async(updatedEventDetails: EventData) =>
    updateEvent({variables: {eventData: updatedEventDetails}})

  if (loading) return <div>Loading...</div>
  if (error) return <div>{`Error! ${error}`}</div>
  if (!data) return <div>Event not found</div>

  return (
    <EditEventForm 
      initialValues={data}
      onSubmit={(updatedInfo) => submitUpdatedEvent(updatedInfo)}
    />
  )
}