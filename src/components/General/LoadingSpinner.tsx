import React from 'react'
import { ScaleLoader} from 'react-spinners'

export const LoadingSpinner = () => (
  <div className='w-full '>
    <div className='flex justify-center'>
      <ScaleLoader
        height={35}
        loading
        color={"rgb(42, 67, 101)"}
      />
    </div>
  </div>
)