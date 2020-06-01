import React from 'react'
import { Link } from 'react-router-dom'
import { EventSearchResponse } from '../../services/apollo/interfaces';
import { formatDate } from '../Event/ViewEvent/ViewEvent';

export const EventCard = (props: EventSearchResponse) => (
 <div
    className="max-w-sm shadow rounded flex content-between flex-wrap bg-white h-48 p-6"
  >
    <div>
      <div className="font-bold text-lg">
        <Link to={`/Event?id=${props.id}`}>
          {props.name}
        </Link> 
      </div>
      <div className="text-gray-700 text-base">{props.briefDescription}</div>
    </div>
    <div>
      <div className='text-gray-500 text-sm'>
        {formatDate(props.eventDate)}
      </div>
    </div>
  </div>
)