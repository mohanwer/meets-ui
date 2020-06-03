import React from 'react'
import { Link } from 'react-router-dom'
import { EventSearchResponse } from '../../services/apollo/interfaces';

export const formatDate = (dateToFormat: Date): string => {
  const date = new Date(dateToFormat)
  const formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
  return formattedDate
}

export const EventCard = (props: EventSearchResponse) => (
  <Link to={`/Event?id=${props.id}`}>
    <div
      className="max-w-sm shadow rounded flex content-between flex-wrap bg-white h-48 p-6"
    >
      <div>
        <div className="font-bold text-lg">
            {props.name}
        </div>
        <div className="text-gray-700 text-base">{props.briefDescription}</div>
      </div>
      <div>
        <div className='text-gray-500 text-sm'>
          {formatDate(props.eventDate)}
        </div>
      </div>
    </div>
  </Link>
)