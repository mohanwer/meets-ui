import React from 'react'
import { EventCard } from './EventCard'
import { EventSearchResponse } from '../../dataServices/apollo/interfaces';

export interface EventCardsProps {
  cardList: EventSearchResponse[]
}

/**
 * Grid layout for individual event cards.
 * @param props - EventCardsProps[] - (id (eventId), name, eventDate, displayName)[]
 */
export const EventCardGrid = (props: EventCardsProps) => (
  <>
    <div className='font-bold outer-spacing-bottom'>Events Taking Place:</div>
    <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:w-full">
      {props.cardList.map(card =>
        <EventCard
          key={card.id}
          {...card}
        />
      )}
    </div>
  </>
)