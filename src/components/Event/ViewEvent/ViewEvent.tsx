import React, {useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {useQuery, useMutation} from '@apollo/react-hooks'
import GoogleMapReact from 'google-map-react'
import {
  GET_EVENT_BY_ID,
  ATTEND_EVENT,
  REMOVE_ATTENDANCE,
} from '../../../dataServices/apollo/queries'
import {Event as EventType, EventComment, Registration} from '../../../dataServices/apollo/interfaces'
import {Marker} from './Map/Marker'
import {Comments, CreateCommentTextBox} from './Comments'
import {CommentProps} from './Comments/Comment'
import {VisibleIfUserIsSignedIn, VisibleIfUserIsOwner} from '../../Security'
import {Attendees, AttendBtn} from './Attendees'
import {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} from '../../../dataServices/events/CommentMutations'
import {useAddAttendeeMutation, useRemoveAttendeeMutation} from '../../../dataServices/events/AttendeeMutations'
import {LoadingSpinner} from '../../General/LoadingSpinner'

const useUrlQuery = () => new URLSearchParams(useLocation().search)

export const formatDateTime = (dateToFormat: Date): string => {
  const date = new Date(dateToFormat)
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} @ ${date.getUTCHours()}:${date.getMinutes()}`
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
  const eventId = urlQuery.get('id') ?? ''

  const addCommentMutation = useAddCommentMutation(eventId)
  const updateCommentMutation = useUpdateCommentMutation(eventId)
  const deleteCommentMutation = useDeleteCommentMutation(eventId)
  const addAttendeeMutation = useAddAttendeeMutation(eventId)
  const removeAttendeeMutation = useRemoveAttendeeMutation(eventId)

  const {loading, error, data, refetch} = useQuery<{ event: EventType }>(GET_EVENT_BY_ID, {
    variables: {id: eventId},
  })

  const addCommentToEvent = async (commentTxt: string) => {
    await addCommentMutation(commentTxt)
    await refetch()
  }

  const updateComment = async (id: string, commentTxt: string) => {
    await updateCommentMutation(id, commentTxt)
    await refetch()
  }

  const deleteComment = async(id: string) => {
    await deleteCommentMutation(id)
    await refetch()
  }

  const addAttendee = async() => {
    await addAttendeeMutation()
    await refetch()
  }

  const removeAttendee = async(registrationId: string) => {
    await removeAttendeeMutation(registrationId)
    await refetch()
  }

  if (loading || !data) return <LoadingSpinner/>
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
          onAttendClick={async () => await addAttendee()}
          onRemoveAttendanceClick={async (id) => await removeAttendee(id)}
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
              center={{lat: event.address.lat, lng: event.address.lng}}
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
          <Attendees attendees={event?.attendees}/>
        </div>
        <div className="w-full pt-4">
          <VisibleIfUserIsSignedIn>
            <CreateCommentTextBox
              onSubmit={async (commentText) => await addCommentToEvent(commentText)}
            />
          </VisibleIfUserIsSignedIn>
          {commentList && <Comments comments={commentList} eventId={event.id}/>}
        </div>
      </div>
    </div>
  )
}
