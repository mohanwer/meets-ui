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
    <div className='p-2 mb-2 border-1 bg-white'>
      <div className='font-bold'>{props.createdBy.displayName}</div>
      <div className='text-gray-700'>{props.modifiedDate}</div>
      <div>{props.commentText}</div>
    </div>
  )
}