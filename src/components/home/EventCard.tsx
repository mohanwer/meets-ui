import React from 'react'
import { Link } from 'react-router-dom'

export interface EventCardProps {
  id: string
  briefDescription: string
  name: string
  eventDate: Date
}

export const EventCard = (props: EventCardProps) => (
 <div
    className="max-w-sm rounded overflow-hidden shadow-lg"
  >
    <div className="p-4">
      <div className="font-bold text-xl mb-2">
        <Link to={`/Event?id=${props.id}`}>
          {props.name}
        </Link> 
        </div>
      <div className="text-gray-700 text-base">{props.briefDescription}</div>
      <div className="text-gray-500">{props.eventDate.toLocaleDateString}</div>
    </div>
  </div>
)