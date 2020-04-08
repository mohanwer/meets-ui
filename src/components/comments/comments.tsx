import React from 'react'
import { Comment, CommentProps } from './comment';

interface CommentsProps {
  comments: CommentProps[]
}

export const Comments = (props: CommentsProps) => {
  const comments = props.comments.map(comment =>
    <Comment
      {...comment}
      key={comment.id}
      editable={false}
    />
  )
  return (
    <>
      {comments}
    </>
  )
}