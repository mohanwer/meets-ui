import React from 'react'
import {EventCardProps, EventCard} from './EventCard'

export interface EventCardsProps {
  cardList: EventCardProps[]
}

export const EventCardGrid = (props: EventCardsProps) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {props.cardList.map(card => 
        <EventCard 
          key={card.name}
          briefDescription={card.briefDescription} 
          name={card.name} 
          eventDate={card.eventDate} 
        />
      )}
    </div>
  )
}