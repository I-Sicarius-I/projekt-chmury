import { Container, Typography, Grid, Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { delComment } from '../Hooks/hooks'
import Reactions from '../Reactions/Reactions'
import CommentEditForm from './CommentEditForm'
import { useUsers } from '../Context/UserContext'
import { useComms } from '../Context/CommentContext'
import { useReactions } from '../Context/ReactionContext'

const Comment = ({comment, filter, setPostComments}) => {

  const [react, setReact] = useState([])
  const [editBool, setEditBool] = useState(false)
  const {currentUser} = useUsers()
  const {getPostComms, filterComments, getCommData} = useComms()
  const {getReactComms, addReactionComm} = useReactions()

  useEffect(() => 
  {
    setReact(getReactComms(comment.post_title, comment.user_email))
  }, [react, comment.post_title, comment.user_email, getReactComms])

  return (
    <Container sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "stretch", marginTop:'3%', marginBottom: '3%', backgroundColor: "#c7e6ff"}}>
        <Typography variant="h5">
            {comment.user_email}
        </Typography>
        <Typography>
            {comment.date_posted}
        </Typography>
        <Typography>
            {comment.text}
        </Typography>
        <Grid sx={{width: '15%', display: "flex", flexDirection: "column", justifyContent: "space-around", alignSelf: "center", marginTop: '10px'}}>
          <Reactions reactions={react}></Reactions>
        </Grid>
        {
          editBool ? (<CommentEditForm edit_comm={comment} addBool={editBool} setAddBool={setEditBool} post_title={comment.post_title} filter={filter}/>) : (<></>)
        }
        <Grid>
            {
              Object.keys(currentUser).length > 0 ?
              (
                <>
                  <Button onClick={async() => 
                    {
                      await addReactionComm(comment.post_title, currentUser.email, "Like", comment.user_email)
                    }}>
                    Like
                  </Button>
                  <Button onClick={async() => 
                  {
                    await addReactionComm(comment.post_title, currentUser.email, "Dislike", comment.user_email)
                  }}>
                    Dislike
                  </Button>
                </>
              ) : (<></>)
            }
            {
              currentUser.email === comment.user_email ? 
              (<>
                <Button onClick={() => {setEditBool(!editBool)}}>
                  Edit Comment
                </Button>
                <Button onClick=
                {
                  async(e) => 
                  {
                    e.preventDefault()

                    const res = await delComment(comment.user_email, comment.post_title)
                    .catch((e) => {alert(e.message)})

                    const filteredComms = await filterComments(filter)
                    .catch((e) => 
                    {
                      alert(e.message)
                    })
                    await getCommData()
                    setPostComments(getPostComms(comment.post_title, filteredComms))
                  }
                }>
                  Delete Comment
                </Button>
              </>) : (<></>)
          } 
        </Grid>
    </Container>
  )
}

export default Comment
