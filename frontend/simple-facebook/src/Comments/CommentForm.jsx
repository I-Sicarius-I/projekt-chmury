import React from 'react'
import {Container, Box, Typography, TextField, Button} from '@mui/material'
import { useState } from 'react'
import { addComment } from '../Hooks/hooks'
import { useComms } from '../Context/CommentContext'
import { useUsers } from '../Context/UserContext'

const CommentForm = ({post_title, setPostComms, filter, addBool, setAddBool}) => {

  const [text, setText] = useState("")

  const {getCommData} = useComms()
  const {currentUser} = useUsers()


  const onSubmit = async(e) =>
  {
    e.preventDefault()

    const comment = 
    {
        comm_email: currentUser.email,
        post_title: post_title,
        text: text
    }

    await addComment(comment)
    .catch((e) =>
    {
        alert(e.message)
    })

    getCommData()
    setAddBool(!addBool)
  }

  return (
    <Container sx={{display: "flex", flexDirection: "column", marginTop: "10px"}}>
        <form onSubmit={onSubmit}>           
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Typography variant="subtitle">
                    Text
                </Typography>
                <TextField
                    value={text}
                    onChange={(e) => (setText(e.target.value))}
                    type="text"
                />
            </Box>
            <Button type="submit">
                Submit
            </Button>
        </form>
    </Container>
  )
}

export default CommentForm
