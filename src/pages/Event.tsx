import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_EVENT_BY_ID, ADD_EVENT_COMMENT } from '../services/apollo/queries';
import { Event as EventType, EventComment } from '../services/apollo/interfaces';
import GoogleMapReact from 'google-map-react'
import { Marker } from '../components/map/Marker';
import { Comments } from '../components/comments/Comments';
import { CommentProps } from '../components/comments/Comment';
import { CreateCommentTextBox } from '../components/comments/CreateCommentTextBox';
const useUrlQuery = () => new URLSearchParams(useLocation().search)

export const MapMarker = ({text}: any) => <div>{text}</div>

export const formatDate = (dateToFormat: string): string => {
  const date = new Date(dateToFormat)
  const formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} @ ${date.getUTCHours()}:${date.getMinutes()}`
  return formattedDate
}

export const mapCommentToCommentProps = (commentList: EventComment[] | null | undefined): CommentProps[] | undefined =>
  commentList?.map(c => (
    {
      id: c.id,
      commentText: c.commentText,
      modifiedDate: c.modified,
      createdBy: {
        id: c.createdBy.id,
        displayName: c.createdBy.displayName
    }
  }))

export const Event = () => {
  
  const urlQuery = useUrlQuery()
  const eventId = urlQuery.get('id')

  const { loading, error, data, refetch } = useQuery(GET_EVENT_BY_ID, {
    variables: {id: eventId}
  })

  const [addCommentToEvent] = useMutation<EventComment>(
    ADD_EVENT_COMMENT,
    {
      update(cache, {data: {addCommentToEvent}}) {
        const commentToAdd = arguments[1].data.addEventComment
        const {event}: any = cache.readQuery<Event>({query: GET_EVENT_BY_ID, variables: {id: eventId}})
        event.comments.push(commentToAdd)
        cache.writeQuery({
          query: GET_EVENT_BY_ID,
          data: { event: event}
        })
        refetch()
      }
    }
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>{`Error! ${error}`}</div>
  
  const event: EventType = data.event
  const formattedEventDate = formatDate(event.eventDate)
  const commentList = mapCommentToCommentProps(event.comments)

  return (
    <div className="w-full bg-gray-100 text-left"
    >
      <div className='border-b-2 bg-white shadow text-center'>
        <div className='text-3xl ml-4'>{event.name}</div>
        <div className='text-xl ml-4'>Hosted by: <span className='bold capitalize'>{event.createdBy.displayName}</span></div>
        <div className='text-lg text-gray-700 italic'>{formattedEventDate}</div>
      </div>
      <div className="p-4">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
          <div className='bg-white shadow-sm p-2'>
            <div className='text-xl font-bold'>Details</div>
            <p>{event.longDescription}</p>
            
          </div>
          <div className='h-56 shadow-sm rounded-lg'>
            <GoogleMapReact
              bootstrapURLKeys={{key: 'AIzaSyAKtW-Qwq1_FLWtNApheCngp4xMFTSa7E4'}}
              center={{lat: event.address.lat, lng:event.address.lng}}
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
        <div className="w-full pt-4">
          <CreateCommentTextBox
            onSubmit={(commentText) => addCommentToEvent({variables: {eventId: event.id, commentText: commentText}})}
          />
          {commentList && (
            <Comments
              comments={commentList}
              eventId={event.id}
            />
          )}
        </div>
      </div>
    </div>
  )
}