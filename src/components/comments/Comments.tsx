import React from 'react'
import { Comment, CommentProps } from './Comment';

interface CommentsProps {
  comments: CommentProps[]
  eventId: string
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