import React from "react"
import { SearchBox } from './SearchBox';
import searchpng from '../../assets/search.png'
import calendarpng from '../../assets/calendar.png'


export const Home = () => { 

  return(
    <div className=''>
      <div className="px-8 pt-2 flex flex-col justify-center">
        <div className="text-center pb-2">
        </div>
        <div className='bg-pink-200 rounded shadow mb-2 p-2 text-gray-700 text-center'>
          This is a development site so the features are still being worked on.
        </div>
        <div className="self-center bg-white rounded w-full shadow p-2 mb-2">
          <div className='text-center text-lg font-bold'>
            Welcome to AssembleAnywhere!

          </div>
          <div className='text-center text-gray-700'>
            Schedule or Attend an event
          </div>
        </div>

        <div className="self-center bg-blue-900 rounded w-full shadow p-2 mb-2">
          <div className='pt-4 font-bold text-lg text-blue-300 text-center'>
            How it works:
          </div>
          <div className='flex justify-center pt-4'>
            <div className='flex items-center mr-24'>
              <div className='mr-5'>
                <img src={searchpng} alt='searchlogo'/>
              </div>
              <span className='text-blue-300 align-middle'>Search for an event</span>
            </div>
            <div className='flex items-center'>
              <div className='mr-2'>
                <img src={calendarpng} alt='searchlogo'/>
              </div>
              <span className='text-blue-300 align-middle'>Create your own event</span>
            </div>
          </div>
          <div className='pt-4 font-bold text-blue-300 text-center antialiased'>
            Login to unlock all features of the site
          </div>
        </div>

        <SearchBox />
      </div>
    </div>
  )
}