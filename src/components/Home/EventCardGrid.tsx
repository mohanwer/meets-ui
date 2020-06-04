import React from 'react'
import { EventCard } from './EventCard'
import { EventSearchResponse } from '../../services/apollo/interfaces';

export interface EventCardsProps {
  cardList: EventSearchResponse[]
}

export const EventCardGrid = (props: EventCardsProps) => {
  console.log(props)
  return (
    <>
      <div className='font-bold mt-1 mb-2'>Events Taking Place:</div>
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
}