import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import GoogleMapReact from 'google-map-react'
import {
  GET_EVENT_BY_ID,
  ADD_EVENT_COMMENT,
  UPDATE_EVENT_COMMENT,
  DELETE_EVENT_COMMENT,
  ATTEND_EVENT,
  REMOVE_ATTENDANCE,
} from '../../../services/apollo/queries'
import { Event as EventType, EventComment, Registration } from '../../../services/apollo/interfaces'
import { Marker } from './Map/Marker'
import { Comments, CreateCommentTextBox } from './Comments'
import { CommentProps } from './Comments/Comment'
import { VisibleIfUserIsSignedIn, VisibleIfUserIsOwner } from '../../Security'
import { Attendees, AttendBtn } from './Attendees'

const useUrlQuery = () => new URLSearchParams(useLocation().search)

export const formatDateTime = (dateToFormat: Date): string => {
  const date = new Date(dateToFormat)
  const formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} @ ${date.getUTCHours()}:${date.getMinutes()}`
  return formattedDate
}

export const mapCommentToCommentProps = (
  commentList: EventComment[] | null | undefined,
  updateComment: (commentId: string, commentText: string) => Promise<any>,
  deleteComment: (commentId: string) => Promise<any>,
): CommentProps[] | [] | undefined =>
  commentList?.map((c) => ({
    id: c.id,
    commentText: c.commentText,
    modifiedDate: c.modified,
    createdBy: {
      id: c.createdBy.id,
      displayName: c.createdBy.displayName,
    },
    updateComment: updateComment,
    deleteComment: deleteComment,
  }))

export const ViewEvent = () => {
  const history = useHistory()
  const urlQuery = useUrlQuery()
  const eventId = urlQuery.get('id')

  const { loading, error, data, refetch } = useQuery<{ event: EventType }>(GET_EVENT_BY_ID, {
    variables: { id: eventId },
  })

  const [addCommentToEvent] = useMutation<{ addCommentToEvent: EventComment }>(ADD_EVENT_COMMENT, {
    update(cache) {
      const commentToAdd = arguments[1].data.addEventComment
      const { event }: any = cache.readQuery<EventType>({
        query: GET_EVENT_BY_ID,
        variables: { id: eventId },
      })
      event.comments.push(commentToAdd)
      cache.writeQuery({
        query: GET_EVENT_BY_ID,
        data: { event: event },
      })
      refetch()
    },
  })

  const [updateCommentInEvent] = useMutation<{ updateComment: EventComment }>(UPDATE_EVENT_COMMENT, {
    update(cache) {
      const updateEventComment = arguments[1].data.updateEventComment
      const { event }: any = cache.readQuery({
        query: GET_EVENT_BY_ID,
        variables: { id: eventId },
      })
      const commentIdx = event.comments.findIndex((c: EventComment) => c.id === updateEventComment.id)
      event.comments[commentIdx] = updateEventComment
      cache.writeQuery({
        query: GET_EVENT_BY_ID,
        data: { event: event },
      })
      refetch()
    },
  })

  const [deleteCommentMutation] = useMutation(DELETE_EVENT_COMMENT, {
    update(cache, { data: { deleteCommentInEvent: deleteCommentInEvent } }) {
      const deleteEventComment = arguments[1].data.deleteEventComment
      const { event }: any = cache.readQuery({
        query: GET_EVENT_BY_ID,
        variables: { id: eventId },
      })
      const commentIdx = event.comments.findIndex((c: EventComment) => c.id === deleteEventComment.id)
      event.comments.splice(commentIdx, 1)
      cache.writeQuery({
        query: GET_EVENT_BY_ID,
        data: { event: event },
      })
      refetch()
    },
  })

  const [attendEvent] = useMutation<{ attendEvent: Registration }>(ATTEND_EVENT, {
    update(cache) {
      const updatedAttendee = arguments[1].data.addAttendee
      const { event }: any = cache.readQuery<EventType>({
        query: GET_EVENT_BY_ID,
        variables: { id: eventId },
      })
      event.attendees.push(updatedAttendee)
      cache.writeQuery({
        query: GET_EVENT_BY_ID,
        data: { event: event },
      })
      refetch()
    },
  })

  const [deleteAttendee] = useMutation(REMOVE_ATTENDANCE, {
    update(cache) {
      const deleteAttendee = arguments[1].data.deleteAttendee
      const { event }: any = cache.readQuery({
        query: GET_EVENT_BY_ID,
        variables: { id: eventId },
      })
      const idx = event.attendees.findIndex((c: Registration) => c.id === deleteAttendee.id)
      event.attendees.splice(idx, 1)
      cache.writeQuery({
        query: GET_EVENT_BY_ID,
        data: { event: event },
      })
      refetch()
    }
  })

  const updateComment = async (commentId: string, commentText: string) =>
    await updateCommentInEvent({
      variables: {
        eventId: eventId,
        commentId: commentId,
        commentText: commentText,
      },
    })

  const deleteComment = async (commentId: string) =>
    await deleteCommentMutation({ variables: { eventCommentId: commentId } })

  if (loading || !data) return <div>Loading...</div>
  if (error) return <div>{`Error! ${error}`}</div>

  const event: EventType = data.event
  const formattedEventDate = formatDateTime(event.eventDate)
  const commentList = mapCommentToCommentProps(event.comments, updateComment, deleteComment)

  return (
    <div className="w-full bg-gray-100 text-left">
      <div className="border-b-2 bg-white shadow text-center">
        <div className="text-3xl ml-4">{event.name}</div>
        <div className="text-xl ml-4">
          Hosted by: <span className="bold capitalize">{event.createdBy.displayName}</span>
        </div>
        <div className="text-lg text-gray-700 italic">{formattedEventDate}</div>
      </div>
      <div className="p-4">
        <VisibleIfUserIsOwner userId={event.createdBy.id}>
          <button
            className="btn-gray mb-2 mr-2"
            onClick={() => history.push(`/EditEvent?id=${eventId}`)}
          >
            Edit Event
          </button>
        </VisibleIfUserIsOwner>
        <AttendBtn
          attendees={event.attendees}
          onAttendClick={async() => await attendEvent({ variables: { eventId: event.id } })}
          onRemoveAttendanceClick={async(id) => await deleteAttendee({ variables: { registrationId: id } })}
        />
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
          <div className="bg-white shadow p-2">
            <div className="text-xl font-bold">Details</div>
            <p>{event.longDescription}</p>
            <div className='text-xl font-bold mt-4'>Address</div>
            <div>{event.address.addr1}, {event.address.city}, {event.address.state}</div>
          </div>
          <div className="h-56 shadow rounded-lg">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API_URL || 'missing',
              }}
              center={{ lat: event.address.lat, lng: event.address.lng }}
              zoom={15}
            >
              <Marker
                lat={event.address.lat}
                lng={event.address.lng}
                text="a"
              />
            </GoogleMapReact>
          </div>
        </div>
        <div className="pt-4">
          <Attendees attendees={event?.attendees} />
        </div>
        <div className="w-full pt-4">
          <VisibleIfUserIsSignedIn>
            <CreateCommentTextBox
              onSubmit={async (commentText) =>
                await addCommentToEvent({
                  variables: { eventId: event.id, commentText: commentText },
                })
              }
            />
          </VisibleIfUserIsSignedIn>
          {commentList && <Comments comments={commentList} eventId={event.id} />}
        </div>
      </div>
    </div>
  )
}
