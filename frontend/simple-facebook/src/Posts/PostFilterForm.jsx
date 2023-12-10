import React, { useState } from 'react'
import { Container, Box, Button, Typography, TextField } from '@mui/material'
import { usePosts } from '../Context/PostsContext'

const PostFilterForm = ({filterBool, setFilterBool, setPostFilter}) => {
    
    const {getPostData} = usePosts()
    const [title, setTitle] = useState("")
    const [subject, setSubject] = useState("")
    const [date, setDate] = useState("")
    const [email, setEmail] = useState("")
    const [text, setText] = useState("")

    const onSubmit = async(e) => 
    {
        e.preventDefault()

        const filter = 
        {
            poster_email: email,
            title: title,
            subject: subject,
            date_posted: date,
            text: text
        }

        getPostData(filter)
        setPostFilter(filter)
        setFilterBool(!filterBool)
    }

  return (
        <Container sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px"}}>
            <form onSubmit={onSubmit}>
                <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                    <Typography variant="subtitle">
                        Title
                    </Typography>
                    <TextField
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                    <Typography variant="subtitle">
                        Subject
                    </Typography>
                    <TextField
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        type="text"
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                    <Typography variant="subtitle">
                        Date Posted
                    </Typography>
                    <TextField
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="text"
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", marginBottom: "15px"}}>
                    <Typography variant="subtitle">
                        Text
                    </Typography>
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
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

export default PostFilterForm
