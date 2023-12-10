import { Box, Button, Container, Typography, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useComms } from '../Context/CommentContext'

const CommentFilterForm = ({filter, setPostComms, setFilterComments, post_title, filterBool, setFilterBool}) => {
  
    const [email, setEmail] = useState("")  
    const {getPostComms, filterComments} = useComms()

    const onSubmit = async(e) =>
    {
        e.preventDefault()

        const data = 
        {
            post_title: post_title,
            commenter_email: email
        }
        
        const comms = await filterComments(data)
        .catch((e) => {
            alert(e.message)
        })

        console.log(comms)
        setFilterComments(data)
        setPostComms(getPostComms(post_title, comms))

        setFilterBool(!filterBool)
    }
  
    return (
        <Container sx={{display: "flex", flexDirection: "column", marginTop: "10px"}}>
            <form onSubmit={onSubmit}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Typography variant="subtitle">
                        Commenter Email
                    </Typography>
                    <TextField
                        value={email}
                        onChange={(e) => (setEmail(e.target.value))}
                        type="email"
                    />
                </Box>
                <Button type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    )
}

export default CommentFilterForm
