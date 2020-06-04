import React, {useState} from 'react'
import { SearchParams } from './Home'

export const SearchBox = ({onSubmit}: {onSubmit(searchParams: SearchParams): void}) => {
  const [searchParams, setSearchParams] = useState({
    eventName: '',
    postal: '',
    location: {
      distance: 50
    }
  })

  const submit = () => {
    const paramsToSend = {}
    if (searchParams.eventName !== '')
      Object.assign(paramsToSend, {eventName: searchParams.eventName})
    if (searchParams.postal !== ''){
      Object.assign(paramsToSend, {postal: searchParams.postal})
      Object.assign(paramsToSend, {location:{distance:`${searchParams.location.distance}miles`}})
    }
    onSubmit(paramsToSend)
  }
  
  return(
    <div className='w-full p-6 rounded shadow bg-white'>
      <div className='md:flex md:flex-grow'>
        <div className='md:w-1/3'>
          <label className='form-label-top'>
            Description
          </label>
          <div className='relative'>
            <input
              type='text'
              className='form-input-bottom'
              onChange={(e) => {
                const paramsToUpdate = {...searchParams}
                paramsToUpdate.eventName = e.target.value
                setSearchParams(paramsToUpdate)
              }}
            />
          </div>
        </div>
        <div className='md:w-1/3'>
          <label className='form-label-top'>
            Zip
          </label>
          <div className='relative'>
            <input
              type='text'
              className='form-input-bottom'
              onChange={(e) => {
                const paramsToUpdate = {...searchParams}
                paramsToUpdate.postal = e.target.value
                setSearchParams(paramsToUpdate)
              }}
              value={searchParams.postal}
            />
          </div>
        </div>
        <div className='md:w-1/3'>
          <label className="form-label-top">
            Distance
          </label>
          <div className='relative'>
            <select
              className="form-drop-down"
              value={searchParams.location.distance}
              onChange={(e) => {
                const paramsToUpdate = {...searchParams}
                if (e.target.value)
                  paramsToUpdate.location.distance = parseInt(e.target.value)
                setSearchParams(paramsToUpdate)
              }}
            >
              <option value={50}>50 miles</option>
              <option value={100}>100 miles</option>
              <option value={250}>250 miles</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <button
        className='btn-gray'
        onClick={() => submit()}
      >
        Search
      </button>
      
    </div>
  )
}