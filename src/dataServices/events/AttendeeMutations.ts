import {useMutation} from '@apollo/react-hooks'
import {Event as EventType, Registration} from '../apollo/interfaces'
import {ATTEND_EVENT, GET_EVENT_BY_ID, REMOVE_ATTENDANCE} from '../apollo/queries'

export const useAddAttendeeMutation = (eventId: string) => {
  const [mutation] = useMutation<{ attendEvent: Registration }>(ATTEND_EVENT, {
    update(cache) {
      const updatedAttendee = arguments[1].data.addAttendee
      const {event}: any = cache.readQuery<EventType>({
        query: GET_EVENT_BY_ID,
        variables: {id: eventId},
      })
      event.attendees.push(updatedAttendee)
      cache.writeQuery({
        query: GET_EVENT_BY_ID,
        data: {event: event},
      })
    }
  })

  return () => mutation({variables: {eventId: eventId}})
}

export const useRemoveAttendeeMutation = (eventId: string) => {
  const [mutation] = useMutation(REMOVE_ATTENDANCE, {
    update(cache) {
      const deleteAttendee = arguments[1].data.deleteAttendee
      const {event}: any = cache.readQuery({
        query: GET_EVENT_BY_ID,
        variables: {id: eventId},
      })
      const idx = event.attendees.findIndex((c: Registration) => c.id === deleteAttendee.id)
      event.attendees.splice(idx, 1)
      cache.writeQuery({
        query: GET_EVENT_BY_ID,
        data: {event: event},
      })
    }
  })

  return (registrationId: string) => mutation({variables: {registrationId: registrationId}})
}