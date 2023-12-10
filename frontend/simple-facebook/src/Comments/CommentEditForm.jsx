import React from 'react'
import {Container, Box, Typography, TextField, Button} from '@mui/material'
import { useState } from 'react'
import { editComment } from '../Hooks/hooks'
import { useComms } from '../Context/CommentContext'

const CommentEditForm = ({edit_comm, post_title, addBool, setAddBool}) => {

  const [text, setText] = useState(edit_comm.text)
  const {getCommData} = useComms()

  const onSubmit = async(e) =>
  {
    e.preventDefault()

    const res = await editComment(edit_comm.user_email, post_title, text)
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

export default CommentEditForm
