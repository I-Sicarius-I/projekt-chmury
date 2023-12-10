import React from 'react'
import Comment from './Comment'

const Comments = ({comments, filter, setPostComments}) => {
  return(
    comments?.map(comment => {return <Comment comment={comment} filter={filter} setPostComments={setPostComments} />})
  )
}

export default Comments
