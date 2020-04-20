import React, { useState } from 'react'
import { EditButton } from '../../../icons/EditButton';
import { PersonalComponent } from '../../../../auth/PersonalComponent';
import { DeleteButton } from '../../../icons/DeleteButton';

export interface CommentProps {
  id: string
  commentText: string
  modifiedDate: Date
  createdBy: {
    id: string
    displayName: string
  }
  editable?: boolean
  updateComment: (commentId: string, commentText:string) => Promise<any>
  deleteComment: (commentId: string) => Promise<any>
}

export const Comment = (props: CommentProps) => {
  const [isUpdateBoxVisible, setUpdateBoxVisibility] = useState(false)
  return (
    <div className='p-2 mt-2 mb-2 border-1 bg-white shadow'>
      <div className='flex'>
        <div className='font-bold text-sm'>{props.createdBy.displayName} 
          <span className='text-gray-500'> {new Date(props.modifiedDate).toLocaleDateString()}</span>
        </div>
        <PersonalComponent userId={props.createdBy.id}>
          <div className='ml-2 flex content-center flex-wrap'>
            <EditButton onClick={() => setUpdateBoxVisibility(true)} />
            <div className='ml-2'>
              <DeleteButton onClick={async() => {
                  setUpdateBoxVisibility(false)
                  await props.deleteComment(props.id)
                }} 
              />
            </div>
          </div>
        </PersonalComponent>
      </div>
      {(isUpdateBoxVisible ? 
        <UpdateComment 
          commentText={props.commentText} 
          onSubmit={(commentText) => props.updateComment(props.id, commentText)} 
          cancel={() => setUpdateBoxVisibility(false)}
        /> : 
        <div className='text-sm'>{props.commentText}</div>)
      }
    </div>
  )
}

export const UpdateComment = 
(
  {commentText, onSubmit, cancel}: 
  {
    commentText: string
    onSubmit: (updatedCommentText: string)=> Promise<void> | void
    cancel: ()=>void
  }
) => {
  const [localCommentText, updateLocalCommentText] = useState(commentText)
  return (
    <>
      <div className='shadow'>
        <textarea
          className='w-full p-2 text-sm'
          onChange={e => updateLocalCommentText(e.target.value)}
          value={localCommentText}
        />
      </div>
      <button
        className='btn-gray'
        onClick={async() => {
          await onSubmit(localCommentText)
          cancel()
        }}
      >
        Save
      </button>
      <button
        className='btn-gray ml-2'
        onClick={() => cancel()}
      >
        Cancel
      </button>
    </>
  )
}