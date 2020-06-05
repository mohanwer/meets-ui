import React from 'react'
import { Link } from 'react-router-dom'
import { EventSearchResponse } from '../../dataServices/apollo/interfaces';
import {ReactComponent as CalendarSvg} from '../../assets/calendar.svg'
import { ReactComponent as UserSvg} from '../../assets/user.svg'

export const formatDate = (dateToFormat: Date): string => {
  const date = new Date(dateToFormat)
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  return formattedDate
}

export const EventCard = (props: EventSearchResponse) => (
  <Link to={`/Event?id=${props.id}`}>
    <div
      className="md:max-w-sm shadow rounded flex content-between flex-wrap bg-white h-48 p-6"
    >
      <div>
        <div className="font-bold text-lg">
            {props.name}
        </div>
        <div className="text-gray-700 text-base">{props.briefDescription}</div>
      </div>
      <div className='flex text-blue-600 text-sm align-bottom w-full'>
        <div className='mr-2'>
          <CalendarSvg/>
        </div>
        <div className=' mr-4'>
          {formatDate(props.eventDate)}
        </div>
        <div className='mr-2'>
          <UserSvg/>
        </div>
        <div className='text-blue-600 text-sm'>
          {props.displayName}
        </div>
      </div>
    </div>
  </Link>
)