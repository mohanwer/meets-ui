import {useMutation} from '@apollo/react-hooks'
import {Event as EventType, EventComment} from '../apollo/interfaces'
import {ADD_EVENT_COMMENT, DELETE_EVENT_COMMENT, GET_EVENT_BY_ID, UPDATE_EVENT_COMMENT} from '../apollo/queries'

// Adds a comment to an event and updates the cache.
export const useAddCommentMutation = (eventId: string) => {
  const [addCommentMutation] = useMutation<{ addCommentToEvent: EventComment }>(ADD_EVENT_COMMENT, {
    update(cache) {
      const commentToAdd = arguments[1].data.addEventComment
      const {event}: any = cache.readQuery<EventType>({
        query: GET_EVENT_BY_ID,
        variables: {id: eventId},
      })
      event.comments.push(commentToAdd)
      cache.writeQuery({
        query: GET_EVENT_BY_ID,
        data: {event: event},
      })
    },
  })

  return (txt: string) => addCommentMutation({variables: {eventId: eventId, commentText: txt}})
}

// Updates a comment in an event and updates cache.
export const useUpdateCommentMutation = (eventId: string) => {
  const [mutation] = useMutation<{ updateComment: EventComment }>(UPDATE_EVENT_COMMENT, {
    update(cache) {
      const updateEventComment = arguments[1].data.updateEventComment
      const {event}: any = cache.readQuery({
        query: GET_EVENT_BY_ID,
        variables: {id: eventId},
      })
      const commentIdx = event.comments.findIndex((c: EventComment) => c.id === updateEventComment.id)
      event.comments[commentIdx] = updateEventComment
      cache.writeQuery({
        query: GET_EVENT_BY_ID,
        data: {event: event},
      })
    }
  })

  return (id: string, txt: string) => mutation({
    variables: {
      eventId: eventId,
      commentId: id,
      commentText: txt
    },
  })
}

// Deletes a comment from an event and updates cache
export const useDeleteCommentMutation = (eventId: string) => {
  const [mutation] = useMutation(DELETE_EVENT_COMMENT, {
    update(cache, {data: {deleteCommentInEvent: deleteCommentInEvent}}) {
      const deleteEventComment = arguments[1].data.deleteEventComment
      const {event}: any = cache.readQuery({
        query: GET_EVENT_BY_ID,
        variables: {id: eventId},
      })
      const commentIdx = event.comments.findIndex((c: EventComment) => c.id === deleteEventComment.id)
      event.comments.splice(commentIdx, 1)
      cache.writeQuery({
        query: GET_EVENT_BY_ID,
        data: {event: event},
      })
    },
  })

  return (id: string) => mutation({variables: {eventCommentId: id}})
}