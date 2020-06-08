import React, {useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {useQuery, useMutation} from '@apollo/react-hooks'
import GoogleMapReact from 'google-map-react'
import {
  GET_EVENT_BY_ID,
} from '../../../dataServices/apollo/queries'
import {Event as EventType, EventComment} from '../../../dataServices/apollo/interfaces'
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
import { lightFormat } from 'date-fns'

const useUrlQuery = () => new URLSearchParams(useLocation().search)

export const formatDateTime = (dateToFormat: Date): string => {
  const date = new Date(dateToFormat)
  return lightFormat(date, 'MM/dd/yy HH:mm aaa')
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
      <div className="bg-gray-800 shadow text-center inner-spacing">
        <div className="text-3xl ml-4 text-teal-200">{event.name}</div>
        <div className="text-xl ml-4 text-white">
          Hosted by: <span className="bold capitalize text-white">{event.createdBy.displayName}</span>
        </div>
        <div className="text-lg italic text-white">{formattedEventDate}</div>
      </div>
      <div className="inner-spacing">
        <div className='outer-spacing-bottom'>
          <VisibleIfUserIsOwner userId={event.createdBy.id}>
            <button
              className="btn-gray mr-2"
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
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
          <div className="bg-white shadow inner-spacing">
            <div className="text-xl font-bold">Details</div>
            <p>{event.longDescription}</p>
            <div className='text-xl font-bold outer-spacing-top'>Address</div>
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
        <div className="outer-spacing-top">
          <Attendees attendees={event?.attendees}/>
        </div>
        <div className="w-full outer-spacing-top">
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
