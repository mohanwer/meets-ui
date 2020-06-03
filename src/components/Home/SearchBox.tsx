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
        <div className='md:w-1/6'>
          <label className='form-label'>
            Description
          </label>
        </div>
        <div className='md:w-1/6'>
          <input
            type='text'
            className='form-text-input border'
            onChange={(e) => {
              const paramsToUpdate = {...searchParams}
              paramsToUpdate.eventName = e.target.value
              setSearchParams(paramsToUpdate)
            }}
          />
        </div>
        <div className='md:w-1/6'>
          <label className='form-label md:float-right'>
            Zip
          </label>
        </div>

        <div className='md:w-1/6'>
          <input
            type='text'
            className='form-text-input border'
            onChange={(e) => {
              const paramsToUpdate = {...searchParams}
              paramsToUpdate.postal = e.target.value
              setSearchParams(paramsToUpdate)
            }}
            value={searchParams.postal}
          />
        </div>

        <div className='md:w-1/6'>
          <label className='form-label md:float-right'>
            Distance
          </label>
        </div>
        <div className='md:w-1/6'>
          <select 
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