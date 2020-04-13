import React,  {useEffect, useState} from "react"
import { eventSearch, ElasticSearchResult } from '../../services/eventSearch'
import { EventCardGrid } from "./EventCardGrid"


export const Home = () => { 
  const initialEvents: ElasticSearchResult[] =  []
  const [eventsNearby, setEventsNearby] = useState(initialEvents)

  useEffect(() => {
    const fetchEvents = async() => {
      const response = await eventSearch({})
      setEventsNearby(response)
    }
    fetchEvents()
  }, [])

  return(
    <div>
      <div className="px-8 pt-2 flex flex-col justify-center">
        <div className="text-center pb-2">
          <h2>
            Welcome to meets!
          </h2>
        </div>
        <div className="self-center">
          <img
            className="rounded-lg"
            src="https://www.pngkey.com/png/detail/412-4125006_multicultural-office-meeting-cartoon.png"
            alt="Multicultural Office Meeting Cartoon@pngkey.com"
          />
        </div>
        <div className='mt-2'>
          {eventsNearby.length > 0 && (
            <EventCardGrid
              cardList={eventsNearby}
            />
          )}
        </div>
      </div>
    </div>
  )
}