import { Container, TextField, Box, Typography, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { usePosts } from '../Context/PostsContext'
import { useUsers } from '../Context/UserContext'
import { addPost } from '../Hooks/hooks'

const PostForm = ({addBool, setAddBool, postFilter}) => 
{
    const {getPostData} = usePosts()
    const {currentUser} = useUsers()

    const [title, setTitle] = useState("")
    const [subject, setSubject] = useState("")
    const [text, setText] = useState("")


    const onSubmit = async(e) =>
    {
        e.preventDefault()

        const post = 
        {
            poster_email: currentUser.email,
            title: title,
            subject: subject,
            text: text
        }

        const res = await addPost(post)
        .catch((e) =>
        {
            alert(e.message)
        })

        getPostData(postFilter)
        setAddBool(!addBool)
    }

    return (
        <Container sx={{display: "flex", flexDirection: "column", alignItems: "center" , marginTop: "15px"}}>
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

export default PostForm
