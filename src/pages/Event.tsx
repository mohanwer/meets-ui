import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_EVENT_BY_ID } from '../services/apollo/queries'
import { Event as EventType } from '../services/apollo/interfaces'
import GoogleMapReact from 'google-map-react'
import { Marker } from '../components/map/Marker';
import { Comments } from '../components/comments/comments';
import { CommentProps } from '../components/comments/comment';

const useUrlQuery = () => new URLSearchParams(useLocation().search)

export const MapMarker = ({text}: any) => <div>{text}</div>

export const Event = () => {
  
  // Get Event Id
  const urlQuery = useUrlQuery()
  const eventId = urlQuery.get('id')

  const { loading, error, data } = useQuery(GET_EVENT_BY_ID, {
    variables: {id: eventId}
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{`Error! ${error}`}</div>

  
  const event: EventType = data.event
  const eventDate = new Date(event.eventDate)
  const formattedEventDate = `${eventDate.getMonth()}/${eventDate.getDate()}/${eventDate.getFullYear()} @ ${eventDate.getUTCHours()}:${eventDate.getMinutes()}`
  const commentList: CommentProps[] | undefined = event.comments?.map(c => (
    {
      id: c.id,
      commentText: c.commentText,
      modifiedDate: c.modified,
      createdBy: {
        id: c.createdBy.id,
        displayName: c.createdBy.displayName
      }
    }))

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
          <div className=''>
            <div className='text-xl font-bold'>Details</div>
            <p>{event.longDescription}</p>
            
          </div>
          <div className='h-56 shadow-lg rounded-lg'>
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
          {commentList && (
            <Comments
              comments={commentList}
            />
          )}
        </div>
      </div>
    </div>
  )
}