import React from 'react'

export interface CommentProps {
  id: string
  commentText: string
  modifiedDate: Date
  createdBy: {
    id: string
    displayName: string
  }
  editable?: boolean
}

export const Comment = (props: CommentProps) => {
  return (
    <div className='p-2 mt-2 mb-2 border-1 bg-white shadow-sm'>
      <div className=''>
        <div className='font-bold text-sm'>{props.createdBy.displayName} 
          <span className='text-gray-500'> {new Date(props.modifiedDate).toLocaleDateString()}</span>
        </div>
      </div>
      <div className='text-sm'>{props.commentText}</div>
    </div>
  )
}