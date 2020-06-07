import React from 'react';
import { Registration } from '../../../../dataServices/apollo/interfaces';

export const Attendees = ({attendees}: {attendees: Registration[] | null | undefined}) => {
  if (!attendees || attendees?.length == 0)
    return (
      <div className='bg-white rounded shadow inner-spacing'>
        No one has registered yet
      </div>
    )

  const attendeeList = attendees.map(a => {
    return {name: a.attendee.displayName, id: a.attendee.id}
  })

  return (
    <div className='bg-white rounded shadow inner-spacing'>
      <div className='text-lg font-bold'>Attendees</div>
      <div className='flex flex-wrap'>
        {attendeeList.map(a => {
          return (
            <div 
              className='btn-gray mr-2' 
              key={a.id}>
              {a.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}